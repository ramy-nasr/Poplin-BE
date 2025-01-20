import { Container } from 'typedi';
import { DatabaseService } from '../database/database.service';
import { PokemonRepository } from '../repositories/pokemon.repository';
import { PokemonService } from '../../application/services/pokemon.service';
import { GetPokemonListUseCase } from '../../application/use-cases/get-pokemon-list.use-case';
import { PokemonController } from '../../presentation/controllers/pokemon.controller';
import { config } from '../config/config';

export const initializeDIContainer = async (): Promise<void> => {
    // Initialize and connect DatabaseService
    const databaseService = Container.get(DatabaseService);
    await databaseService.connect();
    const db = databaseService.getDb();

    // Register all dependencies
    const pokemonRepository = new PokemonRepository(db, config.externalApis.pokemonApi);
    Container.set(PokemonRepository, pokemonRepository);

    const pokemonService = new PokemonService(pokemonRepository);
    Container.set(PokemonService, pokemonService);

    const getPokemonListUseCase = new GetPokemonListUseCase(pokemonService);
    Container.set(GetPokemonListUseCase, getPokemonListUseCase);

    const pokemonController = new PokemonController(getPokemonListUseCase);
    Container.set(PokemonController, pokemonController);
};
