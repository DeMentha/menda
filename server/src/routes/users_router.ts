import { Router } from "express";
import UsersController from "../controllers/users_controller";

function router(): Router {
    const router: Router = Router();

    router.get('/', UsersController.index);

    return router;
}

export default router;
