const router = require("express").Router();
const parser = require("../middleware/imageUpload");
const controller = require("../controllers/product");
const { auth } = require("../middleware/auth");
const { roleCheck } = require("../middleware/roleCheck");

router.get("/products", controller.index);
router.get("/product/:id", controller.index);
router.post(
  "/products",
  auth,
  roleCheck,
  parser.single("photo"),
  controller.store
);
router.put(
  "/product/:id",
  auth,
  roleCheck,
  parser.single("photo"),
  controller.update
);
router.delete(
  "/product/:id",
  auth,
  roleCheck,
  parser.single("photo"),
  controller.destroy
);

module.exports = router;
