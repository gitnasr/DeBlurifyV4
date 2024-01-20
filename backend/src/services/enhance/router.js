const {Router} = require("express");
const {verifyToken} = require("../../middlewares/authentication");
const Enhance = require("./index");
const router = Router();


router.post("/",verifyToken,Enhance.OptimizeImage)
router.post("/webhook",Enhance.Webhook)
router.get("/",verifyToken,Enhance.GetEnhance)
router.post("/rate",verifyToken,Enhance.RateEnhance)
module.exports = router;
