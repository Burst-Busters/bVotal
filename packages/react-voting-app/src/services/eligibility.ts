import {HttpImpl, HttpResponse} from "@burstjs/http"
import {getAccountIdFromPublicKey} from "@burstjs/crypto"
import {
    ApiSettings,
    composeApi,
    isAttachmentVersion,
    Transaction,
    TransactionPaymentSubtype,
    TransactionType
} from "@burstjs/core"
import {ActivationMessage, ActivationState, VotingOption} from "../typings";

const http = new HttpImpl('http://localhost:3001/api')
const BurstApi = composeApi(new ApiSettings('http://localhost:6876'))

const Seconds = 1000

const VotingOptionsKey = 'vopts'
const VotingAddressKey = 'vaddr'

let interval: NodeJS.Timeout

function getMessageText(transaction: Transaction) {
    return isAttachmentVersion(transaction, 'Message')
        ? transaction.attachment.message
        : null
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
        type: TransactionType.Payment,
        subtype: TransactionPaymentSubtype.Ordinary
    })
    if (transactions.length) {
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
    getVotingOptions: (): VotingOption[] => {
        const vopts = localStorage.getItem(VotingOptionsKey);
        return vopts ? JSON.parse(vopts) : []
    },
    getVotingAddress: (): string | null => {
        return localStorage.getItem(VotingAddressKey);
    },
    getActivationState: () => {
        if (!Eligibility.getVotingAddress()) return ActivationState.Pending
        return ActivationState.Activated
    },
    hasVoted: async (publicKey: string) => {
        try {
            const accountId = getAccountIdFromPublicKey(publicKey);
            await BurstApi.account.getAccount(accountId);
            // TODO: check for real voting message
            return true
        } catch (e) {
            return false
        }
    },
    waitForActivationMessage: async (publicKey: string): Promise<{ stop: () => void }> => {
        // TODO: improve polling later
        if (interval) {
            clearInterval(interval)
        }

        async function poll() {
            try {
                await checkForActivationMessage(publicKey);
                if (Eligibility.getActivationState() === ActivationState.Activated) {
                    console.log("Account activated...Yay")
                    window.dispatchEvent(new CustomEvent('@bvotal/activated'))
                }
            } catch (e) {
                // ignore exception
            }
        }

        await poll()
        // TODO: configurlable pollin interval
        interval = setInterval(async () => {
            await poll()
        }, 10 * Seconds)

        return {
            stop: () => {
                console.log("Stopped polling")
                clearInterval(interval)
            }
        };
    }
}

