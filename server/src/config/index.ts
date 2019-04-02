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
        return dbConfig[this.environment]['user'];
    }

    get dbPassword(): string {
        return dbConfig[this.environment]['password'];
    }

    get dbHost(): string {
        return dbConfig[this.environment]['host'];
    }

    get dbPort(): string {
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

export function getConfig(): Config {
    if (process.env.NODE_ENV == 'production') {
        return new ProdConfig();
    } else {
        return new DevelopmentConfig();
    }
}

export default (function(): Config {
    return getConfig();
})();
