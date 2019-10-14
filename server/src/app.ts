import * as express from 'express';
import * as bodyParser from 'body-parser';
import testRouter from './routes/test_router';
import usersRouter from './routes/users_router';
import config from './config';

import {
    debugMiddleware,
    corsMiddleware,
    authMiddleware
} from './util/middleware';

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
app.use('/users', usersRouter());

export default app;
