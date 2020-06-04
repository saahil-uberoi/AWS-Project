import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    db = boto3.resource('dynamodb')
    tableName = "user-1"
    table = db.Table(tableName)
    query_params = event['queryStringParameters']
    tags = query_params.values()
    links = []
    for tag in tags:
        response = table.scan(
        FilterExpression=Attr('tags').contains(tag))
        url = [item['url'] for item in response['Items']]
        links.extend(url)
    links = list(set(links))
    return {
            "isBase64Encoded": False,
            "statusCode": 200,
            "headers": {},
            "body": json.dumps({"links": links})}
