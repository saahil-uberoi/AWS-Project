import cv2
from urllib.parse import unquote_plus
import numpy as np
import json
import boto3

def load_data(dataItem, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb')

    table = dynamodb.Table('WeblensStore')
    print(dataItem)
    table.put_item(Item={'url': dataItem['url'],'objects': dataItem['objects']})

def detect_objects(image):
    LABELS = open("coco.names").read().strip().split("\n")
    (H, W) = image.shape[:2]
    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416),
        swapRB=True, crop=False)
    net = cv2.dnn.readNetFromDarknet('/tmp/{}'.format("yolov3.cfg"), '/tmp/{}'.format("yolov3.weights"))
    ln = [net.getLayerNames()[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    net.setInput(blob)
    layerOutputs = net.forward(ln)
    objects = []
    for output in layerOutputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]
            if confidence > .5:
                label = LABELS[classID]
                objects.append(label)
    return objects


def lambda_handler(event,context):
    print(event)
    s3 = boto3.client('s3')
    s3.download_file('weblens', "yolov3.weights", '/tmp/{}'.format("yolov3.weights"))
    s3.download_file('weblens', "yolov3.cfg", '/tmp/{}'.format("yolov3.cfg"))
    for record in event['Records']:
        #record = event['Records'][0]
        bucket = record['s3']['bucket']['name']
        key = unquote_plus(record['s3']['object']['key'])
        tmpkey = key.replace('/', '')
        download_path = '/tmp/{}'.format(tmpkey)
        s3.download_file(bucket, key, download_path)
        img = cv2.imread(download_path,cv2.IMREAD_COLOR)
        objects = detect_objects(img)
        url = "https://{}.s3.amazonaws.com/{}".format(bucket,key)
        dataItem = { "url": url, "objects": objects }
        load_data(dataItem)
    return "completed"

