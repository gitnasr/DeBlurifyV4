const axios = require("axios");
const ErrorReportsModel = require("../utils/Errors.model");
const DescribeMyImage = async (buffer) => {


    try {
        const Sig = await axios.post("https://pallyy.com/api/images/getUploadURL")

        const {url,sasString,blobName} = Sig.data

        const UploadURL = `${url}captions/${blobName}?${sasString}`

        const Upload = await axios.put(UploadURL,buffer,{
            headers:{
                "Content-Type":"application/octet-stream",
                "x-ms-blob-type":"BlockBlob",
                "x-ms-blob-content-type":"image/jpeg"
            }
        })

        const AnalyzeURL = `https://pallyy.com/api/images/analysis`

        const Analyze = await axios.post(AnalyzeURL,{blobName})

        const DescribeURL = `https://pallyy.com/api/images/description`
        const tags = Analyze.data.tagsResult.values
        const Describe = await axios.post(DescribeURL,{analysis:Analyze.data})
        return {q:Describe.data[0], tags}

    }catch (e) {
        await ErrorReportsModel.create({
            error:e.message,
            timestamp:Date.now(),
            service:"DescribeMyImage",
            route:"describe",
            method:"post",
        })
        return null
    }

}


module.exports = {
    DescribeMyImage
}
