import * as express from 'express';
import debug from './debug';
import config from '../config';

export function debugMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    debug.custom('http', `${req.ip} -> ${req.method} ${req.url}`);
    next();
}

export async function authMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    next();
}

export function corsMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', config.clientHost);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}


// Helpers

export function getAuthorizationHeader(req: express.Request) {
    let value;
    if (req.get('authorization')) {
        const tokens = req.get('authorization').split(' ');
        if (tokens.length == 2) {
            value = tokens[1];
        }
    }

    return value;
}
