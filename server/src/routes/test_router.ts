import * as express from 'express';
import TestController from '../controllers/test_controller';

function router(): express.Router {
    const router: express.Router = express.Router();

    router.get('/', TestController.test);

    return router;
}

export default router;
