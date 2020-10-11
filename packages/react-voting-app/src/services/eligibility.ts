import {HttpImpl} from "@burstjs/http"
import {ActivationMessage} from "../typings";

const http = new HttpImpl('http://localhost:3001/api')

export const Eligibility = {
    register: async (hashId: string, publicKey: string): Promise<ActivationMessage> => {
        const {response} = await http.post('/register', {
            hash: hashId,
            pub: publicKey
        })
        return response
    },
}

