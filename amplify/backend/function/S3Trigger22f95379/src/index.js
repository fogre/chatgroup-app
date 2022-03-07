// dependencies
const AWS = require('aws-sdk')
const util = require('util')
const sharp = require('sharp')

const s3 = new AWS.S3()

exports.handler = async (event, context, callback) => {

  if (event.Records[0].eventName === 'ObjectRemoved:Delete') {
    return
  }

  // Read options from the event parameter.
  console.log("Reading options from event:\n", util.inspect(event, {depth: 5}))
  const BUCKET = event.Records[0].s3.bucket.name
  // Object key may have spaces or unicode non-ASCII characters.
  const KEY = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "))
  

  if (KEY.includes('avatar')) {
    console.log('Image already resized')
    return
  }

  // Infer the image type from the file suffix.
  const typeMatch = KEY.match(/\.([^.]*)$/)
  if (!typeMatch) {
    console.log("Could not determine the image type.")
    return
  }

  // Check that the image type is supported
  const imageType = typeMatch[1].toLowerCase()
  if (imageType != "jpg" && imageType != "png") {
    console.log(`Unsupported image type: ${imageType}`)
    return
  }

  // Download the image from the S3 source bucket.
  try {
    const params = {
      Bucket: BUCKET,
      Key: KEY
    }
    var origImage = await s3.getObject(params).promise()
  } catch (error) {
    console.log(error)
    return
  }

  // set avatar width. Resize will set the height automatically to maintain aspect ratio.
  const ratio = 64

  // Use the sharp module to resize the image and save in a buffer.
  try {
    const image = await sharp(origImage.Body)
    const metadata = await image.metadata()
    if (metadata.width <= ratio) {
      console.log('No resizing needed')
      return
    } 
    var buffer = await image
      .resize(ratio)
      .toFormat('png')
      .toBuffer()

  } catch (error) {
    console.log(error)
    return
  }

  // Upload the new image
  const destKey = KEY.replace(`.${typeMatch[1]}`, '-avatar.png')
  try {
    const destparams = {
      Bucket: BUCKET,
      Key: destKey,
      Body: buffer,
      ContentType: "image"
    };

    const putResult = await s3.putObject(destparams).promise()

  } catch (error) {
    console.log(error)
    return
  }

  console.log('Successfully resized ' + BUCKET + '/' + KEY +
    ' and uploaded to ' + BUCKET + '/' + destKey);
};