import { Service } from 'typedi';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { Pokemon } from '../../domain/entities/pokemon.entity';
import { config } from '../config/config';
import logger from '../logging/logger';



@Service()
export class DatabaseService {
    private db: Database<sqlite3.Database, sqlite3.Statement>;

    constructor() {
        this.db = {} as Database<sqlite3.Database, sqlite3.Statement>;
    }

    async connect(): Promise<void> {
        try {
            const dbPath = config.database.sqliteFile;
            const fs = require('fs');
            const path = require('path');
            const dir = path.dirname(dbPath);

            // Ensure the directory exists
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            this.db = await open({
                filename: config.database.sqliteFile,
                driver: sqlite3.Database,
            });

            await this.db.exec(`
                CREATE TABLE IF NOT EXISTS pokemon (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    imageUrl TEXT
                );
            `);

        }
        catch (error) {
            logger.error('Error initializing the database:', error);
        }
    }

    // Expose the db instance for DI
    public getDb(): Database<sqlite3.Database, sqlite3.Statement> {
        if (!this.db) {
            logger.error('Database connection has not been established. Call connect() first.');
        }
        return this.db;
    }

    async insertPokemon(pokemon: Pokemon) {
        try {
            const stmt = await this.db.prepare(
                'INSERT OR IGNORE INTO pokemon (id, name, imageUrl) VALUES (?, ?, ?)'
            );
            await stmt.run(pokemon.id, pokemon.name, pokemon.imageUrl);
            await stmt.finalize();
        } catch (error) {
            logger.error('Error insert into database:', error);
        }

    }

    async getAllPokemon() {
        try {
            return this.db.all('SELECT * FROM pokemon');
        } catch (error) {
            logger.error('Error in selecting data from database');
        }
    }
}
