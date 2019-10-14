import { Request, Response } from 'express';

class UsersController {
    static index(_: Request, res: Response) {
        return res.json({success: true});
    }

    static show(_: Request, res: Response) {
        return res.json({success: true});
    }
}

export default UsersController;
