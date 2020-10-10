const { composeApi, ApiSettings } = require("@burstjs/core");

const NODE = "http://0.0.0.0:6876"; //docker run -p 6876:6876 shefass/burstmockmining

const apiSettings = new ApiSettings(NODE, "burst");
const api = composeApi(apiSettings);

module.exports = {
    api, NODE
}