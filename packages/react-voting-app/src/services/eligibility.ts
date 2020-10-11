import {HttpImpl, HttpResponse} from "@burstjs/http"

const http = new HttpImpl('http://localhost:3001/api')

export const Eligibility = {
    register: async (hashId: string, publicKey: string): Promise<HttpResponse> => {
        return http.post('/register', {
            hash: hashId,
            pub: publicKey
        })
    },
}

