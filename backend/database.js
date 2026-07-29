const db = require("./models");

async function connectDB() {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established");
  } catch (e) {
    console.log(`Unable to connect to DB: ${e}`);
    process.exit(1);
  }
}

module.exports = { connectDB, sequelize: db.sequelize };
