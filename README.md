# Pokémon Coding Challenge 

A Pokémon battle simulator where users can simulate battles between two teams of Pokémon.

This project is setup as a yarn workspace with a client and a server:

### www-server

Serves up two endpoints:

GET `/api/pokemon`
Responds with the Pokémon dataset

POST `/api/battle`
Pits two teams of Pokémon against each other.

### www-client

Provides a barebones React app where the user can select Pokémons for two teams. The teams are posted to `/api/battle` on form submit.

## Running the project

### Install

```bash
yarn
```

### Development

```bash
yarn dev
```

Starts a server at `http://localhost:3001` and a client on `http://localhost:5173`

## Future improvements

* The client app could use some love. 
* Pokémon battle logic assumes each Pokémon has 100 HP. This should probably be more dynamic.
* Add more unit tests. Currently we only test the calculateDamage method from `battle.ts`. 
* Add a common workspace for shared code, such as typings.
* Add build and start scripts for the workspace for deployment 
