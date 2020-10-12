# bVotal
Anonymous, secret, transparent, cheap and scalable voting system based on Burstcoin Blockchain

===

## FrontEnd Development
* uses https://create-react-app.dev/
* `$ yarn dev:frontend` from the root folder, or `yarn start` from `/packages/frontend/` folder

## Backend local

> Requirement: Docker installed

* `$ docker run -p 6876:6876 shefass/burstmockmining`

In package `eligibility-service`:

Copy the .env.example to a .env file and change accordingly

Run only once (or everytime you want to wipe the data)
* `$ yarn dev:bootstrap`

Start service
* `$ yarn start`

While running locally, you might want to emulate mining on the blockchain.
Use the command 
* `$ yarn dev:forge`

## Technical Details

### Create Secure Account Flow
* User inputs Date of Birth and National Identity Document
* Secure HashId is Generated with those info, using SHA-3 Algorithm
* Eligibility Authority (EA) checks if HashID matches the Eligible HashID list they own and authorizes (or not) user to place its vote

### Register PIN and Activate Blockchain Account
* To the HashId is added a Random Value
* With those values a Passphrase is generated (locally)
* The generated passphrase is used to create the User Keys (1 private Keys and 1 public)
* User then creates a 5 digit PIN, that is used to encript the passphrase and store it locally

### Encripted Vote
* A request to the Blockchain Node is performed, so user can Activate his Blockchain account
* When a new block is forged (about 4mins in production environment), user is allowed to place its vote
* The voting transaction is encripted, and a small fee is paid for it. The value to pay the fee is provided to the user by EA
* 

### Results Reveal
* When ellection event is finished, the EA discloses it's privateKey
* The EA privateKey can be used by any user to decript the Blockchain Registered votes
* The votes, decrypted, are anonymous, and contain the value of the vote, but no identity of the voter
* This allows virtually any user to audit the ellection results, therefore making the process transparent and trustworthy

## Credits:
<a href="https://www.freepik.com/vectors/paper">Paper vector created by freepik - www.freepik.com</a>