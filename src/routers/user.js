const router = require("express").Router();
const parser = require("../middleware/imageUpload");
const controller = require("../controllers/user");
const { auth } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");

router.get("/users", auth, roleCheck, controller.index);
router.get("/user", auth, controller.getUser);
router.delete("/user/:id", auth, roleCheck, controller.destroy);

module.exports = router;
