const { Router } = require("express");
const Upload = require("./index");
const {verifyToken} = require("../../middlewares/authentication");
const {imageUploader} = require("./upload");

const router = Router();

router.post("/",verifyToken,imageUploader, Upload.NewImage);
router.get("/",verifyToken, Upload.GetImages);
router.post("/rate",verifyToken, Upload.RateImage)

router.delete("/i/:id",verifyToken, Upload.DeleteImage);

module.exports = router;
