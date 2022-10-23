output "lambda_bucket_name" {
  description = "Name of the S3 bucket used to store Lambda function code."

  value = aws_s3_bucket.lambda_bucket.id
}