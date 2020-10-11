const {hashId} = require("@bvotal/common");

function createHashes({count}) {

    let eligibles = []
    while(eligibles.length < count){
        const i = eligibles.length
        const id = i.toString(10)
        const dob = new Date(1990 + i%30, 1 + i %11, i%30).toDateString()
        console.log({id,dob})
        eligibles.push({hash:hashId({id, dob})})
    }
    console.log('\n===========================================================\n')
    console.log(JSON.stringify(eligibles, null, '\t'))
}

module.exports = {
    createHashes
}
