import * as express from 'express';

class TestController {
    async test(req: express.Request, res: express.Response) {
        return res.json({success: true});
    }
}

export default new TestController();