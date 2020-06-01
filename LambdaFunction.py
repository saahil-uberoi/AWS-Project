import boto3, json
s3_client = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
import json

def lambda_handler(event, context):
    print(event)

    bucket = event['Records'][0]['s3']['bucket']['name']
    json_file = event['Records'][0]['s3']['object']['key']
    object1 = s3_client.get_object(Bucket=bucket, Key= json_file)
    read_f = object1['Body'].read()
    dict_f = json.loads(read_f)
    table = dynamodb.Table('user-1')
    print(dict_f)
    table.put_item(Item=dict_f)
    return 'Sucess!'
