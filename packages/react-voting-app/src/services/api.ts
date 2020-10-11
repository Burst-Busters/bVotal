import axios from 'axios';
import { hashId } from '@bvotal/common';

const eaBaseUrl = `http://localhost:3000/api`;

const eaApi = axios.create({
    baseURL: eaBaseUrl,
});

const api = {
    getHashId: (document: string, dateString: string) => {
        return hashId({id: document, dob: dateString});
    },
    register: (hashId: string, publicKey: string) => {
        return eaApi.post('/register', {
            hashId,
            pub: publicKey
        })
    },
}

export default api;