import { Service } from 'typedi';
import { Database } from 'sqlite';
import axios from 'axios';
import { IPokemonRepository } from '../../domain/repositories/pokemon.repository.interface';
import { Pokemon } from '../../domain/entities/pokemon.entity';
import { PokemonApiResponse } from '../../domain/types/pokemon-api.types';
import { config } from '../config/config';

@Service('PokemonRepository')
export class PokemonRepository implements IPokemonRepository {
    constructor(
        private db: Database, // Injected SQLite database instance
        private apiUrl: string = config.externalApis.pokemonApi // Default API URL from config
    ) {}

    async fetchFromApi(offset: number, limit: number): Promise<Pokemon[]> {
        try {
            const response = await axios.get<PokemonApiResponse>(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
            return response.data.results.map((pokemon, index) => ({
                id: offset + index + 1,
                name: pokemon.name,
                imageUrl: `${config.externalApis.pokemonSpriteBaseUrl}${offset + index + 1}.png`,
            }));
        } catch (error) {
            throw new Error('Failed to fetch Pokémon data from the external API.');
        }
    }

    async getFromDatabase(offset: number, limit: number): Promise<Pokemon[]> {
        try {
            const rows = await this.db.all(
                'SELECT * FROM pokemon ORDER BY id LIMIT ? OFFSET ?',
                limit,
                offset
            );
            return rows.map((row) => new Pokemon(row.id, row.name, row.imageUrl));
        } catch (error) {
            throw new Error('Failed to fetch Pokémon data from the database.');
        }
    }

    async saveToDatabase(pokemonList: Pokemon[]): Promise<void> {
        try {
            const insertPromises = pokemonList.map((pokemon) =>
                this.db.run(
                    'INSERT OR IGNORE INTO pokemon (id, name, imageUrl) VALUES (?, ?, ?)',
                    pokemon.id,
                    pokemon.name,
                    pokemon.imageUrl
                )
            );
            await Promise.all(insertPromises);
        } catch (error) {
            throw new Error('Failed to save Pokémon data to the database.');
        }
    }
}
