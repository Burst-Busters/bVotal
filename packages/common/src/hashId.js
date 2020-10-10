const { SHA3 } = require('sha3');

function hashId({ id, dob }){
    const hash = new SHA3(); // defaults to 512
    hash.update(JSON.stringify({id, dob}));
    return hash.digest('base64');
}

module.exports = {
    hashId
}
