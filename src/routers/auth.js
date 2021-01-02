const router = require("express").Router();
const controller = require("../controllers/auth");
const { auth } = require("../middleware/auth");

router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/checkUser", auth, controller.checkAuth);

module.exports = router;
