"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const typedi_1 = require("typedi");
const pokemon_controller_1 = require("./presentation/controllers/pokemon.controller");
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./infrastructure/config/routes");
class AppModule {
    constructor(app) {
        this.app = app;
    }
    init() {
        this.app.use(body_parser_1.default.json());
        // Use `Container.get` to resolve the dependency
        const pokemonController = typedi_1.Container.get(pokemon_controller_1.PokemonController);
        this.app.use(routes_1.ROUTES.POKEMON, pokemonController.router);
    }
}
exports.AppModule = AppModule;
