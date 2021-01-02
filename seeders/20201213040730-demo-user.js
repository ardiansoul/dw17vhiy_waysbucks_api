const { User } = require("../models");

module.exports = function () {
  return User.bulkCreate([
    {
      fullName: "kang admin",
      email: "admin@waysbucks.com",
      role: "admin",
      password: "$2b$10$kgS25ZJyV2GMSH72U4upCethQGg/rdRfBNLJAbZ4DVbaA6/ZfjxrC",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: "ardian",
      email: "ardian@gmail.com",
      role: "user",
      password: "$2b$10$kgS25ZJyV2GMSH72U4upCethQGg/rdRfBNLJAbZ4DVbaA6/ZfjxrC",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};
