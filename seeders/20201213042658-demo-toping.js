const { Toping } = require("../models");

module.exports = function () {
  return Toping.bulkCreate([
    {
      name: "Bubble Tea Gelatin",
      price: 5000,
      photo:
        "https://res.cloudinary.com/dd7szxfnl/image/upload/v1607928097/Rectangle_9_xzgfop.png",
    },
    {
      name: "Manggo",
      price: 3000,
      photo:
        "https://res.cloudinary.com/dd7szxfnl/image/upload/v1607928118/Rectangle_9-4_vgc7xl.png",
    },
    {
      name: "Green Coconut",
      price: 2000,
      photo:
        "https://res.cloudinary.com/dd7szxfnl/image/upload/v1607928118/Rectangle_9-5_dmtnin.png",
    },
    {
      name: "Boba Manggo",
      price: 4000,
      photo:
        "https://res.cloudinary.com/dd7szxfnl/image/upload/v1607928119/Rectangle_9-6_poddwx.png",
    },
  ]);
};
