const mongoose = require("mongoose");
const DatabaseIP = process.env.DatabaseIP;

mongoose
  .connect(`mongodb://${DatabaseIP}/nutrition`, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to the database", DatabaseIP);
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
