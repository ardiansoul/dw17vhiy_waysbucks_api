if (!process.env.NODE_ENV === "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
// const Seed = require("./seeders/index");

// const db = require("./models");
// db.sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("sequelize db sync");
//     return Seed();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const productRouter = require("./src/routers/product");
const topingRouter = require("./src/routers/toping");
const userRouter = require("./src/routers/user");
const transRouter = require("./src/routers/transaction");
const authRouter = require("./src/routers/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api/v1", productRouter);
app.use("/api/v1", topingRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", transRouter);
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send("express running");
});

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
