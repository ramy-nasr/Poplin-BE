import { Pokemon } from "../entities/pokemon.entity";

export interface IPokemonRepository {
    fetchFromApi(offset: number, limit: number): Promise<Pokemon[]>;
    getFromDatabase(offset: number, limit: number): Promise<Pokemon[]>;
    saveToDatabase(pokemonList: Pokemon[]): Promise<void>;
}
