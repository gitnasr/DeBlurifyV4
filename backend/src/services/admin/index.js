
const Admin = require("./admin");
const Config = require(".");
const Safe = require("../../middlewares/Safe");
const AppConfig = Safe(async (req, res) => {
    const app = await Admin.GetConfig();
    return res.json(app)
})
const UpdateConfig = Safe(async (req, res) => {
    const {payload} = req.body;
    const app = await Admin.ConfigUpdate(payload);
    return res.json(app)
})
module.exports = {
    AppConfig,UpdateConfig
}
