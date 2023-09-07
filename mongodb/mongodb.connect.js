const mongoose = require("mongoose");

const uri = process.env.MONGODB_CONNECTION_URI;

async function connect() {
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error("mongoose connection error" + err);
  }
}

module.exports = { connect };
