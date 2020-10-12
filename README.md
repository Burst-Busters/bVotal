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
