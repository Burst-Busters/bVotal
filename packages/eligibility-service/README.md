# Eligibility Service

The eligibility service for bVotal!

`yarn dev` to run in watch mode using _nodemon_

or simply

`yarn start` to start the service


> To change the port run as `PORT=4000 yarn dev` (or use .env file) 


## Configure

The service is configurable using ENV vars.
Just copy `.env.example` to `.env` and change in case you need
The default config is for development mode

## Run as docker

This service comes with a Dockerfile

To build the container run something like this:

`docker build -t bvotal-eligibility-service .`

and then you run like this:

`docker run -p 3001:3000 -d bvotal-eligibility-service`
