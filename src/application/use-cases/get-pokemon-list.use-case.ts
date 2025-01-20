
import { Service } from 'typedi';
import { PokemonService } from '../services/pokemon.service';

@Service()
export class GetPokemonListUseCase {
    constructor(private pokemonService: PokemonService) {}

    async execute(offset: number, limit: number) {
        return await this.pokemonService.getPokemonList(offset, limit);
    }
}
