"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    port: 3000,
    externalApis: {
        pokemonApi: 'https://pokeapi.co/api/v2/pokemon',
        pokemonSpriteBaseUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
    },
    database: {
        sqliteFile: './data/pokemon.sqlite', // SQLite database file path
    },
};
