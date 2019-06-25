const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/nutrition", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to the database");
  })
  .catch(err => {
    console.log("error connecting to the nutrition database ", err);
  });

const userSchema = new mongoose.Schema({
  user: String,
  totalNutrition: String,
  previousItems: String
});

module.exports = mongoose.model("User", userSchema);
