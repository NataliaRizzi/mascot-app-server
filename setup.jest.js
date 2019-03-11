const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongoServer = new MongoMemoryServer({
  autoStart: false
});

const path = require("path");
const fs = require("fs");

const globalConfigPath = path.join(__dirname, "globalConfig.json");

module.exports = async () => {
  if (!mongoServer.isRunning) {
    await mongoServer.start();
  }

  const mongoConfig = {
    mongoDBName: "jest",
    mongoUri: await mongoServer.getConnectionString()
  };

  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

  global.__MONGOSERVER__ = mongoServer;
};
