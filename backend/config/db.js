const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://rijus289:root@cluster0.zazso.mongodb.net/NOWFOOD?"
    )
    .then(() => console.log("DB connected"));
};
module.exports = connectDB;
