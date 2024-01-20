const { Router } = require("express");
const Admin = require(".");

const router = Router();

router.get("/config", Admin.AppConfig)
router.post("/config", Admin.UpdateConfig)

module.exports = router;
