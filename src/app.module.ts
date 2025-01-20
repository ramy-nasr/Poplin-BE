import { Container } from 'typedi';
import { PokemonController } from './presentation/controllers/pokemon.controller';
import bodyParser from 'body-parser';
import { ROUTES } from './infrastructure/config/routes';

export class AppModule {
    constructor(private app: any) {}

    init() {
        this.app.use(bodyParser.json());

        // Use `Container.get` to resolve the dependency
        const pokemonController = Container.get(PokemonController);
        this.app.use(ROUTES.POKEMON, pokemonController.router);
    }
}
