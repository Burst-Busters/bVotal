const { SHA3 } = require('sha3');

function hashText(text){
    const hash = new SHA3(); // defaults to 512
    hash.update(text);
    return hash.digest('base64');
}

module.exports = {
    hashText
}
