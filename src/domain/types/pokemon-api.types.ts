export interface PokemonApiResult {
    name: string;
    url: string;
}

export interface PokemonApiResponse {
    results: PokemonApiResult[];
}