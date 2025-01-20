import { Service, Inject } from 'typedi';
import { IPokemonRepository } from '../../domain/repositories/pokemon.repository.interface';
import { Pokemon } from '../../domain/entities/pokemon.entity';

@Service()
export class PokemonService {
    constructor(
        @Inject('PokemonRepository') private pokemonRepository: IPokemonRepository
    ) {}

    async getPokemonList(offset: number, limit: number): Promise<Pokemon[]> {
        const pokemonFromDb = await this.pokemonRepository.getFromDatabase(offset, limit);
        if (pokemonFromDb.length === limit) {
            return pokemonFromDb;
        }
    
        const missingCount = limit - pokemonFromDb.length;
        const pokemonFromApi = await this.pokemonRepository.fetchFromApi(offset + pokemonFromDb.length, missingCount);
    
        if (pokemonFromApi.length > 0) {
            await this.pokemonRepository.saveToDatabase(pokemonFromApi);
        }
    
        return [...pokemonFromDb, ...pokemonFromApi];
    }
}
