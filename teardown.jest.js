const mongoose = require("mongoose");

module.exports = async function() {
  await global.__MONGOSERVER__.stop();
};
