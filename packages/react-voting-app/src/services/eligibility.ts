import axios from 'axios';
import {ActivationMessage} from "../typings";

const http = axios.create({
    baseURL: 'http://localhost:3001/api', // TODO: make this configurable
});

export const Eligibility = {
    register: (hashId: string, publicKey: string): Promise<ActivationMessage> => {
        return http.post('/register', {
            hashId,
            pub: publicKey
        })
    },
}

