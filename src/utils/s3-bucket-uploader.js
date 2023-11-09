const AWS = require('aws-sdk');
const config = require('../config/config');

AWS.config.update({
  accessKeyId: config.aws_key,
  secretAccessKey: config.aws_secret,
  region: config.aws_region,
});

const s3 = new AWS.S3();

exports.uploadImageToS3 = async (buffer, contentType, filename) => {
  const params = {
    Bucket: 'recipebook-test-bucket',
    Key: filename,
    Body: buffer,
    ContentType: contentType,
  };

  return s3.upload(params).promise();
};