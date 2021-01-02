const router = require("express").Router();
const controller = require("../controllers/transaction");
const { auth } = require("../middleware/auth");
const parser = require("../middleware/imageUpload");

router.get("/transactions", controller.index);
router.get("/transaction/:id", controller.index);
router.get("/user/transaction", auth, controller.getUserTransaction);
router.post(
  "/transactions",
  auth,
  parser.single("attachment"),
  controller.store
);
router.put(
  "/transaction/:id",
  auth,
  parser.single("attachment"),
  controller.update
);
router.delete(
  "/transaction/:id",
  auth,
  parser.single("attachment"),
  controller.destroy
);

module.exports = router;
