"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const typedi_1 = require("typedi");
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const config_1 = require("../config/config");
const logger_1 = __importDefault(require("../logging/logger"));
let DatabaseService = class DatabaseService {
    constructor() {
        this.db = {};
    }
    async connect() {
        try {
            const dbPath = config_1.config.database.sqliteFile;
            const fs = require('fs');
            const path = require('path');
            const dir = path.dirname(dbPath);
            // Ensure the directory exists
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            this.db = await (0, sqlite_1.open)({
                filename: config_1.config.database.sqliteFile,
                driver: sqlite3_1.default.Database,
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
            logger_1.default.error('Error initializing the database:', error);
        }
    }
    // Expose the db instance for DI
    getDb() {
        if (!this.db) {
            logger_1.default.error('Database connection has not been established. Call connect() first.');
        }
        return this.db;
    }
    async insertPokemon(pokemon) {
        try {
            const stmt = await this.db.prepare('INSERT OR IGNORE INTO pokemon (id, name, imageUrl) VALUES (?, ?, ?)');
            await stmt.run(pokemon.id, pokemon.name, pokemon.imageUrl);
            await stmt.finalize();
        }
        catch (error) {
            logger_1.default.error('Error insert into database:', error);
        }
    }
    async getAllPokemon() {
        try {
            return this.db.all('SELECT * FROM pokemon');
        }
        catch (error) {
            logger_1.default.error('Error in selecting data from database');
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], DatabaseService);
