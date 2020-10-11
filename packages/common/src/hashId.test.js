const {hashId} = require("./hashId");

describe('hashId', () => {
    it('should generate hash as expected', () => {
        const hashedId1 = hashId({id: 1234, dob: "23-11-1976"})
        const hashedId2 = hashId({id: 1234, dob: "21-11-1976"})
        expect(typeof hashedId1).toBe('string')
        expect(hashedId1).not.toBe(hashedId2)
    })
})
