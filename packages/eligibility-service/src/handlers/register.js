const {hashId} = require("@bvotal/common");
const register = (req, res) => {
    console.log(hashId({id:'test', dob:'12-23-1980'}))
    res.end(`register: ${JSON.stringify(req.body)}`);
}

module.exports = {
    register
}
