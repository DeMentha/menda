const dbConfig = require('../../config/db.json');
const config = require('../../config/server.json');

class Config {
    environment: string;

    get port(): string {
        return process.env.PORT || Number(3000).toString();
    }

    get dbName(): string {
        return dbConfig[this.environment]['database'];
    }

    get dbUsername(): string {
        return process.env.PGUSER || dbConfig[this.environment]['user'];
    }

    get dbPassword(): string {
        return process.env.PGPASSWORD || dbConfig[this.environment]['password'];
    }

    get dbHost(): string {
        return dbConfig[this.environment]['host'];
    }

    get dbPort(): number {
        return dbConfig[this.environment]['port'];
    }

    get clientHost(): string {
        return config[this.environment]['client_host'];
    }
}

export class DevelopmentConfig extends Config {
    environment = 'development';
}

export class ProdConfig extends Config {
    environment = 'production';
}

export class TestConfig extends Config {
    environment = 'test';
}

export function getConfig(): Config {
    switch (process.env.NODE_ENV) {
        case 'production':
            return new ProdConfig();
        case 'test':
            return new TestConfig();
        default:
            return new DevelopmentConfig();
    }
}

export default (function(): Config {
    return getConfig();
})();
