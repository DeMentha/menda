import debug from './debug';
import * as express from 'express';

// Response

export class HTTPResponse {
    message: string;
    data: object;
    code: number;

    constructor(code?: number, message?: string, data?: object) {
        this.message = message;
        this.data = data;
        this.code = code;
    }
}

export class SuccessHTTPResponse extends HTTPResponse {
    constructor() {
        super(200, undefined, { success: true });
    }
}

// Errors

export class HTTPError extends HTTPResponse {
    constructor(code: number, message: string) {
        super(code, message);
    }
}

export class AuthenticationHTTPError extends HTTPError {
    constructor() {
        super(401, 'Authentication error');
    }
}

export class AuthorizationHTTPError extends HTTPError {
    constructor() {
        super(401, 'Unauthorized error');
    }
}

export class InvalidParametersHTTPError extends HTTPError {
    constructor() {
        super(400, 'Invalid parameters');
    }
}

export class InternalHTTPError extends HTTPError {
    constructor() {
        super(500, 'Internal error');
    }
}

// Response helpers

export function send(req: express.Request, res: express.Response, response: HTTPResponse) {
    const result = res.status(response.code).json({
        message: response.message,
        data: response.data,
    });
    const duration = Date.now() - req.startTime;
    debug.custom('http', `${req.method} ${req.url}, success, time: ${duration}ms`);
    return result;
}
