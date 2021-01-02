const { Product } = require("../models");

module.exports = function () {
  return Product.bulkCreate([
    {
      name: "Ice Coffee Palm Sugar",
      price: 27000,
      photo:
        "https://res.cloudinary.com/dd7szxfnl/image/upload/v1607928098/Rectangle_4_se6fvg.png",
    },
    {
      name: "Ice Coffee Green Tea",
      price: 31000,
      photo:
        "https://res.cloudinary.com/dd7szxfnl/image/upload/v1607928098/Rectangle_4_1_dwwj14.png",
    },
    {
      name: "Hanami Latte",
      price: 30000,
      photo:
        "https://res.cloudinary.com/dd7szxfnl/image/upload/v1607928097/Rectangle_4_2_m0qo6z.png",
    },
    {
      name: "Clepon Coffee",
      price: 20000,
      photo:
        "https://res.cloudinary.com/dd7szxfnl/image/upload/v1607928097/Rectangle_4_3_b1azgd.png",
    },
  ]);
};
