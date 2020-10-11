import {HttpImpl, HttpResponse} from "@burstjs/http"
import {getAccountIdFromPublicKey} from "@burstjs/crypto"
import {
    ApiSettings,
    composeApi,
    isAttachmentVersion,
    Transaction,
    TransactionArbitrarySubtype,
    TransactionType
} from "@burstjs/core"
import {ActivationMessage, ActivationState, VotingOption} from "../typings";

const http = new HttpImpl('http://localhost:3001/api')
const BurstApi = composeApi(new ApiSettings('http://localhost:6786'))

const Seconds = 1000

const VotingOptionsKey = 'vopts'
const VotingAddressKey = 'vaddr'

let interval: NodeJS.Timeout

function getMessageText(transaction: Transaction) {
    return isAttachmentVersion(transaction, 'EncryptedMessage')
        ? null
        : transaction.attachment.message;
}

function storeVotingOptions(vopts: VotingOption[]): void {
    localStorage.setItem(VotingOptionsKey, JSON.stringify(vopts))
}

function storeVotingAddress(vaddrs: string): void {
    localStorage.setItem(VotingAddressKey, vaddrs)
}

async function checkForActivationMessage(publicKey: string): Promise<void> {
    const accountId = getAccountIdFromPublicKey(publicKey)
    const {transactions} = await BurstApi.account.getAccountTransactions({
        accountId,
        type: TransactionType.Arbitrary,
        subtype: TransactionArbitrarySubtype.Message
    })
    if (!transactions.length) {
        let message = '';
        for (let i = 0; i < transactions.length; i++) {
            try {
                message = getMessageText(transactions[i]);
                if (!message) continue
                const {vopts, vaddrs} = JSON.parse(message) as ActivationMessage;
                if (!vopts && !vaddrs) throw new Error('Incompatible')
                storeVotingOptions(vopts)
                storeVotingAddress(vaddrs)
            } catch (e) {
                console.debug('Incompatible message', message)
            }
        }
    }
}

export const Eligibility = {
    register: async (hashId: string, publicKey: string): Promise<HttpResponse> => {
        return http.post('/register', {
            hash: hashId,
            pub: publicKey
        })
    },
    getVotingOptions: (): VotingOption[] | null => {
        const vopts = localStorage.getItem(VotingOptionsKey);
        return vopts ? JSON.parse(vopts) : null
    },
    getVotingAddress: (): string | null => {
        return localStorage.getItem(VotingAddressKey);
    },
    getActivationState: () => {
        if (!Eligibility.getVotingAddress()) return ActivationState.Pending
        return ActivationState.Activated
    },
    waitForActivationMessage: async (publicKey: string) => {
        // TODO: improve polling later
        if (interval) {
            clearInterval(interval)
        }
        return new Promise((resolve) => {
            interval = setInterval(() => {
                checkForActivationMessage(publicKey);
                if(Eligibility.getActivationState() === ActivationState.Activated){
                    // TODO: send custom event
                }
            }, 30 * Seconds)
        })
    }
}

