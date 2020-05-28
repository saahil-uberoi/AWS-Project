import boto3
import json
import base64
s3_bucket = boto3.resource("s3").Bucket("weblens")
def lambda_handler(event, context):
    filename = event['filename']
    file_content = base64.b64decode(event['body'])
    s3_bucket.put_object(Key=filename,Body=file_content,ACL="public-read")
    return {'statusCode': 200, 'body': json.dumps({'message': 'successful lambda function call'}), 'headers': {'Access-Control-Allow-Origin': '*'}}