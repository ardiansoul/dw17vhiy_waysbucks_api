const SeedUser = require("./20201213040730-demo-user");
const SeedProduct = require("./20201213042646-demo-product");
const SeedToping = require("./20201213042658-demo-toping");

module.exports = function () {
  return Promise.all([
    // Returning and thus passing a Promise here
    // Independent seeds first
    SeedUser(),
    SeedProduct(),
    SeedToping(),
  ])
    .then(() => {
      // More seeds that require IDs from the seeds above
    })
    .then(() => {
      console.log("********** Successfully seeded db **********");
    });
};
