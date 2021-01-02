const router = require("express").Router();
const parser = require("../middleware/imageUpload");
const controller = require("../controllers/toping");
const { auth } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");

router.get("/topings", controller.index);
router.get("/toping/:id", controller.index);
router.post(
  "/topings",
  auth,
  roleCheck,
  parser.single("photo"),
  controller.store
);
router.put(
  "/toping/:id",
  auth,
  roleCheck,
  parser.single("photo"),
  controller.update
);
router.delete(
  "/toping/:id",
  auth,
  roleCheck,
  parser.single("photo"),
  controller.destroy
);

module.exports = router;
