const {hashText} = require("./hashText");
const stringify = require('fast-json-stable-stringify');
function hashId({ id, dob }){
    return hashText(stringify({id, dob}));
}

module.exports = {
    hashId
}
