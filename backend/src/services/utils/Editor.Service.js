const axios = require("axios");
const sharp = require("sharp");
const AddWatermark = async (imageUrl) => {
    const watermarkUrl = "https://storage.googleapis.com/deblurify/assets/Untitled%20design.svg";
    const watermarkSizePercentage = 10;
    try {
        const imageResponse = await axios.get(imageUrl, {responseType: 'arraybuffer'});
        const imageBuffer = Buffer.from(imageResponse.data);

        // Download the watermark image
        const watermarkResponse = await axios.get(watermarkUrl, {responseType: 'arraybuffer'});
        const watermarkBuffer = Buffer.from(watermarkResponse.data);

        // Get the original image dimensions
        const imageMetadata = await sharp(imageBuffer).metadata();
        const originalWidth = imageMetadata.width;
        const originalHeight = imageMetadata.height;

        // Get the watermark image dimensions
        const watermarkMetadata = await sharp(watermarkBuffer).metadata();
        const watermarkWidth = watermarkMetadata.width;
        const watermarkHeight = watermarkMetadata.height;

        if (watermarkWidth > originalWidth || watermarkHeight > originalHeight) {
            console.error('Error: Watermark image is larger than the original image.');
            return;
        }

        // Resize the watermark image with anti-aliasing
        const newWatermarkWidth = Math.round((originalWidth * watermarkSizePercentage) / 100);
        const newWatermarkHeight = Math.round((originalHeight * watermarkSizePercentage) / 100);

        const WM = await sharp(watermarkBuffer)
            .resize(newWatermarkWidth, newWatermarkHeight, {
                fit: 'inside',
            })
            .toBuffer();

        // Add the watermark to the image
        return await sharp(imageBuffer)
    .composite([
        {
            input: WM,
            top: originalHeight - newWatermarkHeight,
            left: originalWidth - newWatermarkWidth,
        },
    ])
    .toBuffer()
    } catch (error) {
        console.error('Error:', error);
    }
}

const makeAThumbnail = async (imageUrl) => {
    try {
        const imageResponse = await axios.get(imageUrl, {responseType: 'arraybuffer'});
        const imageBuffer = Buffer.from(imageResponse.data);
        return await sharp(imageBuffer).resize(500, 500, {fit: "inside"}).toBuffer();
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {AddWatermark,makeAThumbnail};
