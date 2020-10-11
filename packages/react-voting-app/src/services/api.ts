import axios from 'axios';
import { hashId } from '@bvotal/common';
import { generateMasterKeys, PassPhraseGenerator } from '@burstjs/crypto';
const eaBaseUrl = `http://localhost:3000/api`;

const eaApi = axios.create({
    baseURL: eaBaseUrl,
});

const api = {
    getMasterKeys: (passphraseArray: string[]) => {
        const passphrase = passphraseArray.join(' ');
        return generateMasterKeys(passphrase);
    },
    getRandom: () => {
        const typedArray = new Uint32Array();
        return window.crypto.getRandomValues(typedArray).join();
    },
    getPassphrase: async (hashId: string) => {
        const random = api.getRandom();
        const seed = hashId + random;
        const generator = new PassPhraseGenerator();
        return await generator.generatePassPhrase(Array.from(seed))
    },
    getHashId: (document: string, dateString: string) => {
        return hashId({id: document, dob: dateString});
    },
    register: (hashId: string, publicKey: string): Promise<ActivationMessage> => {
        return eaApi.post('/register', {
            hashId,
            pub: publicKey
        })
    },
}

export type VotingOption = { key: string, title: string; desc: string };
export type VotingAddress = string;
export type ActivationMessage = {
    vopts: VotingOption[],
    vaddrs: VotingAddress
}
export default api;