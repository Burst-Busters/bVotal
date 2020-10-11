const {hashText} = require("./hashText");

function hashId({ id, dob }){
    return hashText(JSON.stringify({id, dob}));
}

module.exports = {
    hashId
}
