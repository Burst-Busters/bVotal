import { hashId } from '@bvotal/common';
import { generateMasterKeys, PassPhraseGenerator, encryptAES, decryptAES, Keys } from '@burstjs/crypto';

const StorageKeys = {
    Passphrase: 'p'
}

export const Security = {
    generateKeys: (passphrase: string) : Keys => {
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
}

