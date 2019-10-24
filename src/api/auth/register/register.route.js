import express from "express"
import Register_controller from "./register.controller";

const router = express.Router();

router.post("/user", Register_controller.create);
router.get("/users", Register_controller.find);
router.get("/user/:id",Register_controller.findOne);


module.exports = router;
