const multer = require('multer');
const { Readable } =  require('stream')
const storage = multer.memoryStorage();
const crypto = require("crypto");
const axios = require("axios");
const path = require("path");
const filter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === 'image') {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"));
    }
};
const toGoogleStorage = async (file,isBuffer=false) => {
    try {


    const {Storage} = require('@google-cloud/storage');

    const storage = new Storage({
        keyFilename: path.join(__dirname, "../../../gcloud.json")

    })
    const bucket = storage.bucket("deblurify")
        const fileName = `${crypto.randomBytes(8).toString("hex").toUpperCase()}.jpg`
    const item =  await bucket.file(fileName)
        let response
        const writeStream = item.createWriteStream();

        if (isBuffer){
        response = Readable.from(file);
        response.pipe(writeStream);
    }else{
        response = await axios.get(file, { responseType: 'stream' });
        response.data.pipe(writeStream);

    }

    return new Promise((resolve, reject) => {
        writeStream.on('finish', async () => {
            await item.makePublic();

            resolve(`https://storage.googleapis.com/deblurify/${fileName}`);
        });
        writeStream.on('error', (err) => {
            console.error(`Error uploading file: ${err}`);
            reject(err);
        });
    });
    }catch (e) {
        console.log(e)
    }
}
exports.imageUploader = multer({
    storage,
    fileFilter: filter
}).single('image');

exports.toGoogleStorage = toGoogleStorage;
