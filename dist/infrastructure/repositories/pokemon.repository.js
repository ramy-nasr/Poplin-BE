"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonRepository = void 0;
const typedi_1 = require("typedi");
const sqlite_1 = require("sqlite");
const axios_1 = __importDefault(require("axios"));
const pokemon_entity_1 = require("../../domain/entities/pokemon.entity");
const config_1 = require("../config/config");
let PokemonRepository = class PokemonRepository {
    constructor(db, // Injected SQLite database instance
    apiUrl = config_1.config.externalApis.pokemonApi // Default API URL from config
    ) {
        this.db = db;
        this.apiUrl = apiUrl;
    }
    async fetchFromApi(offset, limit) {
        try {
            const response = await axios_1.default.get(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
            return response.data.results.map((pokemon, index) => ({
                id: offset + index + 1,
                name: pokemon.name,
                imageUrl: `${config_1.config.externalApis.pokemonSpriteBaseUrl}${offset + index + 1}.png`,
            }));
        }
        catch (error) {
            throw new Error('Failed to fetch Pokémon data from the external API.');
        }
    }
    async getFromDatabase(offset, limit) {
        try {
            const rows = await this.db.all('SELECT * FROM pokemon ORDER BY id LIMIT ? OFFSET ?', limit, offset);
            return rows.map((row) => new pokemon_entity_1.Pokemon(row.id, row.name, row.imageUrl));
        }
        catch (error) {
            throw new Error('Failed to fetch Pokémon data from the database.');
        }
    }
    async saveToDatabase(pokemonList) {
        try {
            const insertPromises = pokemonList.map((pokemon) => this.db.run('INSERT OR IGNORE INTO pokemon (id, name, imageUrl) VALUES (?, ?, ?)', pokemon.id, pokemon.name, pokemon.imageUrl));
            await Promise.all(insertPromises);
        }
        catch (error) {
            throw new Error('Failed to save Pokémon data to the database.');
        }
    }
};
exports.PokemonRepository = PokemonRepository;
exports.PokemonRepository = PokemonRepository = __decorate([
    (0, typedi_1.Service)('PokemonRepository'),
    __metadata("design:paramtypes", [sqlite_1.Database, String])
], PokemonRepository);
