"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDIContainer = void 0;
const typedi_1 = require("typedi");
const database_service_1 = require("../database/database.service");
const pokemon_repository_1 = require("../repositories/pokemon.repository");
const pokemon_service_1 = require("../../application/services/pokemon.service");
const get_pokemon_list_use_case_1 = require("../../application/use-cases/get-pokemon-list.use-case");
const pokemon_controller_1 = require("../../presentation/controllers/pokemon.controller");
const config_1 = require("../config/config");
const initializeDIContainer = async () => {
    // Initialize and connect DatabaseService
    const databaseService = typedi_1.Container.get(database_service_1.DatabaseService);
    await databaseService.connect();
    const db = databaseService.getDb();
    // Register all dependencies
    const pokemonRepository = new pokemon_repository_1.PokemonRepository(db, config_1.config.externalApis.pokemonApi);
    typedi_1.Container.set(pokemon_repository_1.PokemonRepository, pokemonRepository);
    const pokemonService = new pokemon_service_1.PokemonService(pokemonRepository);
    typedi_1.Container.set(pokemon_service_1.PokemonService, pokemonService);
    const getPokemonListUseCase = new get_pokemon_list_use_case_1.GetPokemonListUseCase(pokemonService);
    typedi_1.Container.set(get_pokemon_list_use_case_1.GetPokemonListUseCase, getPokemonListUseCase);
    const pokemonController = new pokemon_controller_1.PokemonController(getPokemonListUseCase);
    typedi_1.Container.set(pokemon_controller_1.PokemonController, pokemonController);
};
exports.initializeDIContainer = initializeDIContainer;
