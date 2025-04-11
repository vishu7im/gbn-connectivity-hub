
const AWS = require('aws-sdk');

// Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY || 'AKIA47CRVI3ER3QTH7HZ',
  secretAccessKey: process.env.AWS_SECRET_KEY || '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',
  region: process.env.AWS_REGION || 'us-east-1'
});

const s3 = new AWS.S3();
const bucketName = process.env.AWS_S3_BUCKET || 'almanilokheri';

// Upload file to S3
const uploadToS3 = async (file, folder) => {
  try {
    const fileName = `${folder}/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };
    
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error('File upload failed');
  }
};

// Delete file from S3
const deleteFromS3 = async (fileUrl) => {
  try {
    // Extract the key from the URL
    const key = fileUrl.split(`${bucketName}/`)[1];
    
    const params = {
      Bucket: bucketName,
      Key: key
    };
    
    await s3.deleteObject(params).promise();
    return true;
  } catch (error) {
    console.error('S3 Delete Error:', error);
    throw new Error('File deletion failed');
  }
};

module.exports = { uploadToS3, deleteFromS3 };
