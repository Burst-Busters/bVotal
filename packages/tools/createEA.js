const {api, NODE} = require('./confiq');
const { HttpImpl } = require("@burstjs/http");

const Http = new HttpImpl();

const {
  PassPhraseGenerator,
  generateMasterKeys,
  getAccountIdFromPublicKey
} = require("@burstjs/crypto");

const {
    convertNQTStringToNumber
  } = require("@burstjs/util");

class EA {
  constructor(votingName) {
    const pasw = new PassPhraseGenerator();
    this.twelfthwords = pasw.generate().reduce((t, e) => t.concat(" " + e));
    const keys = generateMasterKeys(this.twelfthwords);
    this.publicKey = keys.publicKey;
    this.votingName = votingName;
    this.accountID = getAccountIdFromPublicKey(keys.publicKey);
    this.forgeBlock();
  }

  forgeBlock = async() => {
    try{
      const params = new URLSearchParams();
      params.append('secretPhrase', this.twelfthwords);
      params.append('nonce', '0');
      const response = await Http.post(NODE + "/burst?requestType=submitNonce", params);
      console.log(response)  
    }
    catch(e){
      console.error(`Whooops, something went wrong: ${e.message}`)
    }
  }

  getBalanceBurst = async() => {
    try{
      await sleep(500); //Node need time to forge block, if block not forged account not exists
      const nqt = await api.account.getAccountBalance(this.accountID);
      return convertNQTStringToNumber(nqt.balanceNQT);
    }catch (e) {
          // e is of type HttpError (as part of @burstjs/http)
          console.error(`Whooops, something went wrong: ${e.message}`);
      }
  }

  getWords = () => {
   return this.twelfthwords;
  }
  getVotingName = () => {
    return this.votingName;
  }
  getAccountID = () => {
    return this.accountID;
  }
  getPublicKey = () => {
    return this.publicKey;
  }
}

function sleep(time) {
  return new Promise((resolve) => {
      setTimeout(resolve, time || 1000);
  });
}

/* e.g.
const voting = new EA("Vote for TRUMP");
voting.getBalanceBurst().then((balanse)=> console.log(balanse));
*/