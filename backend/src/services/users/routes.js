const { Router } = require("express");
const Users = require("./index");
const {verifyToken} = require("../../middlewares/authentication");

const router = Router();

router.post("/unknown", Users.AnonymousLogin);
router.post("/token", Users.TokenLogin)
router.get("/",verifyToken, Users.getUser)

module.exports = router;
