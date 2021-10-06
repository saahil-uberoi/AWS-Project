An AWS based solution that exploits services such as S3, Lambda, API Gateway and DynamoDB

Built a system for automated object-detection tagging and query handling which allows end-users to upload their 
images into a S3 bucket. 
Upon uploading of an image to a designated S3 bucket, a lambda function is automatically triggered that uses the 
Yolo object detection feature and finds the list of objects in the image and stores the list of detected objects along 
with the URL of the image (S3 URL) in a database.
Further, the end-user should be able to submit queries to an API endpoint using API Gateway to search tagged 
images.
