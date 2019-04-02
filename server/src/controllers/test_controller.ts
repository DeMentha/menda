import * as express from 'express';

class TestController {
    static test(_: express.Request, res: express.Response) {
        return res.json({success: true});
    }
}

export default TestController;
