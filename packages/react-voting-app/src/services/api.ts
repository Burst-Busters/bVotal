import axios from 'axios';
import { hashId } from '@bvotal/common';
import { generateMasterKeys, PassPhraseGenerator, encryptAES, decryptAES } from '@burstjs/crypto';
const eaBaseUrl = `http://localhost:3001/api`;

const eaApi = axios.create({
    baseURL: eaBaseUrl,
});

const StorageKeys = {
    Passphrase: 'p'
}

const api = {
    getMasterKeys: (passphrase: string) => {
        return generateMasterKeys(passphrase);
    },
    generatePassphrase: async (hashId: string) => {
        const typedArray = new Uint8Array(64);
        const random = window.crypto.getRandomValues(typedArray).join();
        const seed = hashId + random;
        const generator = new PassPhraseGenerator();
        const words = await generator.generatePassPhrase(Array.from(seed))
        return words.join(" ")
    },
    storePassphrase: (passphrase:string, pin:string): void => {
        const encrypted =  encryptAES(passphrase, pin);
        window.localStorage.setItem(StorageKeys.Passphrase, encrypted)
    },
    getPassphrase: (passphrase:string, pin:string): string => {
        const encrypted = window.localStorage.getItem(StorageKeys.Passphrase);
        if(!encrypted){
            console.warn('Secured Passphrase not found')
            return ''
        }
        return decryptAES(encrypted, pin)
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
