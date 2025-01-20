import { Router, Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { GetPokemonListUseCase } from '../../application/use-cases/get-pokemon-list.use-case';

@Service()
export class PokemonController {
    router: Router;

    constructor(private getPokemonListUseCase: GetPokemonListUseCase) {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', this.getPokemonList.bind(this)); // Map GET /api/pokemon to getPokemonList
    }

    async getPokemonList(req: Request, res: Response, next: NextFunction) {
        try {
            // Parse offset and limit from query parameters, with default values
            const offset = parseInt(req.query.offset as string) || 0;
            const limit = parseInt(req.query.limit as string) || 20;

            // Ensure offset and limit are valid
            if (offset < 0 || limit <= 0) {
                return res.status(400).json({ message: 'Offset and limit must be positive numbers.' });
            }

            // Fetch the paginated Pokémon list using the use case
            const pokemonList = await this.getPokemonListUseCase.execute(offset, limit);

            // Return the fetched Pokémon data
            res.status(200).json(pokemonList);
        } catch (error) {
            next(error); // Pass the error to the error handling middleware
        }
    }
}
