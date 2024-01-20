var FormData = require('form-data');
const {getFacePlusTokens} = require("../../config/API.Keys");
const axios = require("axios");
const { IsNSFW} = require("./nsfw");
const {DescribeMyImage} = require("./describe");
const {imageHash} = require("image-hash");
const ImageModel = require("./models/image");
const DescribeModel = require("./models/describe");
const NSFWModel = require("./models/nsfw");

const FacePlusPlus = async (image) => {
    let faceCount = -1

    let isHasMale = false

    let isHasFemale = false
    try {


    const random = Math.floor(Math.random() * getFacePlusTokens().length);

    let {key, secret} = getFacePlusTokens()[random];

    const formData = new FormData();
    formData.append("api_key", key);
    formData.append("api_secret", secret);
    formData.append("image_url", image);
    formData.append("return_attributes", "gender,age");
    const config = {
        method: "post", url: "https://api-us.faceplusplus.com/facepp/v3/detect", data: formData, headers: {
            ...formData.getHeaders(),
        },
    };
    const {data} = await axios(config);
    let faceCount = data.face_num
    const faces = data.faces
    const result = []
    let isHasMale = false
    let isHasFemale = false
    if (faceCount > 0) {
        for (let i = 0; i < faceCount; i++) {
            const face = faces[i];
            const {attributes} = face
            const {gender} = attributes
            const {age} = attributes
            if (gender === "Male"){
                isHasMale = true
            }else{
                isHasFemale = true
            }

           result.push({
               gender:gender.value,
               age:age.value
           })
        }
    }

    return {faceCount, result,isHasMale,isHasFemale}
    }catch (e) {
        return {faceCount, result:[],isHasMale,isHasFemale}
    }
}

const NSFWDetector = async (image) => {
    return await IsNSFW(image)
}

const DescribeImage = async (buffer) => {
    return await DescribeMyImage(buffer)
}
const HashImage = async (buffer) => {
    return new Promise((resolve, reject) => {
        imageHash({
            data: buffer
        }, 16, true, (error, data) => {
            if(error) reject(error);
            resolve(data);
        });
    })

}
const findByHash = async (hash,options={}) => {
    return ImageModel.findOne({hash,...options});
}
const createImage = async (ImagePayload,DescribePayload,NSFWPayload) => {
    const newImage = new ImageModel(ImagePayload);
    await newImage.save();

    const newDescribe = new DescribeModel({
        image: newImage._id,
       ...DescribePayload
    });

    await newDescribe.save();

    const newNSFW = new NSFWModel({
        image: newImage._id,
        ...NSFWPayload
    })
    await newNSFW.save()
    await newImage.updateOne({ Describe: newDescribe._id, NSFW: newNSFW._id });
    return newImage
}
const updateImage = async (id,options) => {
    return ImageModel.findByIdAndUpdate(id, options, {new: true});
}

const findByImageId = async (id,options={}) => {
    return ImageModel.findById(id,).where(options)
}
const findByUserId = async (id,options={}) => {
    return ImageModel.find({user:id,...options}).sort({createdAt: -1}).populate({
        path: 'Describe',
        select: 'text',

    }).populate({
        path: 'NSFW',
        select: 'unsafe',
    })
}
module.exports = {
    NSFWDetector, FacePlusPlus,DescribeImage,HashImage,findByHash,createImage,updateImage,
    findByImageId,findByUserId
}
