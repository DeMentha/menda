import { Pool } from 'pg';
import config from '../config';

class Database {
    private static instance: Database = new Database();

    pool: any = null;

    constructor() {
        if (Database.instance) {
            throw new Error("Error: Instantiation failed: Use Database.getInstance() instead of new");
        }
        Database.instance = this;
    }

    connect() {
        this.pool = new Pool({
            user: config.dbUsername,
            host: config.dbHost,
            database: config.dbName,
            password: config.dbPassword,
            port: config.dbPort,
        });
    }

    async execute(query: any): Promise<Array<any>> {
        const result = await this.pool.query(query);
        return result.rows;
    }

    static getInstance(): Database {
        return Database.instance;
    }
}

export const db: Database = Database.getInstance();
