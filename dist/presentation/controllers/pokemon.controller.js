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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonController = void 0;
const express_1 = require("express");
const typedi_1 = require("typedi");
const get_pokemon_list_use_case_1 = require("../../application/use-cases/get-pokemon-list.use-case");
let PokemonController = class PokemonController {
    constructor(getPokemonListUseCase) {
        this.getPokemonListUseCase = getPokemonListUseCase;
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.getPokemonList.bind(this)); // Map GET /api/pokemon to getPokemonList
    }
    async getPokemonList(req, res, next) {
        try {
            // Parse offset and limit from query parameters, with default values
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || 20;
            // Ensure offset and limit are valid
            if (offset < 0 || limit <= 0) {
                return res.status(400).json({ message: 'Offset and limit must be positive numbers.' });
            }
            // Fetch the paginated Pokémon list using the use case
            const pokemonList = await this.getPokemonListUseCase.execute(offset, limit);
            // Return the fetched Pokémon data
            res.status(200).json(pokemonList);
        }
        catch (error) {
            next(error); // Pass the error to the error handling middleware
        }
    }
};
exports.PokemonController = PokemonController;
exports.PokemonController = PokemonController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [get_pokemon_list_use_case_1.GetPokemonListUseCase])
], PokemonController);
