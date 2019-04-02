import * as express from 'express';
import * as bodyParser from 'body-parser';
import testRouter from './routes/test_router';
import config from './config';
import debug from './util/debug';

import {
    debugMiddleware,
    corsMiddleware,
    authMiddleware
} from './util/middleware';
import { db } from './lib/db';

const app = express();
app.set('port', config.port);
app.set('trust proxy', true);
app.disable('x-powered-by');

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Handle POST request body data
app.use(bodyParser.json());
app.use(debugMiddleware);
app.use(corsMiddleware);
app.use(authMiddleware);

// API routes
app.use('/test', testRouter()); // Handle api requests

app.listen(app.get('port'), async () => {
    debug.log(`Node app is running on port: ${app.get('port')}`);
    try {
        await db.connect();
        debug.log('Connection to database successfully established.');
    } catch(err) {
        debug.error('Unable to connect to the database:', err);
    }

    // const result = await db.execute('select * from users');
    // debug.log(result);
});
