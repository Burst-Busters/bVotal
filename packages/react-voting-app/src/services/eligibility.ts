import {HttpImpl, HttpResponse} from "@burstjs/http"
import {getAccountIdFromPublicKey} from "@burstjs/crypto"
import {composeApi, ApiSettings, TransactionType, TransactionArbitrarySubtype, Transaction} from "@burstjs/core"
import {ActivationState} from "../typings";

const http = new HttpImpl('http://localhost:3001/api')
const BurstApi = composeApi(new ApiSettings( 'http://localhost:6786'))

const Seconds = 1000
const ActivationCheck = 'a'
let interval = null

async function checkForActivationMessage(publicKey){
 const accountId = getAccountIdFromPublicKey(publicKey)
    const {transactions} = await BurstApi.account.getAccountTransactions({
        accountId,
        type: TransactionType.Arbitrary,
        subtype: TransactionArbitrarySubtype.Message
    })
    // ideally sort by timestamp
    transactions.filter( ({sender,attachment}: Transaction) => {
        // TODO: get the voting address
        sender === "VotingAddress"
    })
}

export const Eligibility = {
    register: async (hashId: string, publicKey: string): Promise<HttpResponse> => {
        return http.post('/register', {
            hash: hashId,
            pub: publicKey
        })
    },
    getActivationState: () => {
        const timestamp = window.localStorage.getItem(ActivationCheck)
        if(!timestamp) return ActivationState.Pending
        // Probably we won't need it, because we check for campaign end
    },
    waitForActivationMessage: async (publicKey: string) => {

        if(this.getActivationState() === ActivationState.Pending){
            window.localStorage.setItem(ActivationCheck, Date.now().toString())
        }
        // TODO: improve polling later
        if(interval){
            clearInterval(interval)
        }
        return new Promise.resolve((resolve) => {
            interval = setInterval(() => {
                checkForActivationMessage(publicKey)

            }, 30 * Seconds)
        })
    }
}

