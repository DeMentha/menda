import * as express from 'express';

declare module 'express' {
    interface Request {
        startTime: number;
        user: any;
        csrfToken: any;
        accessToken: any;
        store: any;
    }
}
