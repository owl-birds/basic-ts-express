import { Request, Response, Router } from "express";

// controllers
import { create_user_handler } from "../controller/user.controller";
import {
    create_user_session_handler,
    delete_user_session_handler,
    get_user_session_handler,
} from "../controller/session.controller";

// zod schema validate : resource ,, MIDDLEWARE
import validate from "../middleware/validate_resources";
import { create_user_schema } from "../schema/user.schema";
import { session_login_user_schema } from "../schema/session.schema";
import { require_user } from "../middleware/require_user";
import { create_product_controller, get_products, test_product } from "../controller/product.controller";
import { create_product_schema } from "../schema/product.schema";

const router = Router({ mergeParams: true });
// mergeParams: true ::: mergin the param to the parent url
// params ex : /:id ::: request.params["id"]

// USER
// GET
router.get("/", (request: Request, response: Response) => {
    // response.sendStatus(200);
    return response.status(200).send("HELLOOOOOOOOOOOO!, TEST ROUTER");
});
router.get("/api/user/session", require_user, get_user_session_handler);

// POST
router.post("/api/user", validate(create_user_schema), create_user_handler);
router.post(
    "/api/user/session",
    validate(session_login_user_schema),
    create_user_session_handler,
);

// DELETE
router.delete("/api/user/session", require_user, delete_user_session_handler);

// PRODUCT
// GET
router.get("/api/:user_id/products", require_user, get_products);

// POST
router.post("/api/:user_id/product", 
            require_user, 
            validate(create_product_schema), 
            create_product_controller
);

export default router;
