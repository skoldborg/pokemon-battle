# Pokémon Coding Challenge 

A Pokémon battle simulator where users can simulate battles between two teams of Pokémon.

This project is setup as a yarn workspace with a client and a server:

## www-server

Serves up two endpoints:

GET `/api/pokemon`
Responds with the Pokémon dataset

POST `/api/battle`
Pits two teams of Pokémon against each other.

## www-client

Provides a barebones React app where the user can select Pokémons for two teams. The teams are posted to `/api/battle` on form submit.

## Install

```bash
yarn
```

## Development

```bash
yarn dev
```


## Future improvements

* The client app could use some love. 
* Add more unit tests. Currently we only test the calculateDamage method from `battle.ts`. 
* Add a common workspace for shared code, such as typings.
* Add build and start scripts for the workspace for deployment 
