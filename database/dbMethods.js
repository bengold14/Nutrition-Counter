let UserModel = require("./db.js");

let addNutrition = function(user, document, callback) {
  //store old data in memory and add new data to it
  let totalNutrition = {};
  let previousItems = [];
  if (document) {
    totalNutrition = JSON.parse(document.totalNutrition);
    previousItems = JSON.parse(document.previousItems);
  }
  previousItems.push(user.food.desc.name);
  user.food.nutrients.forEach(nutrient => {
    if (totalNutrition[nutrient.name]) {
      if (totalNutrition[nutrient.name].unit === nutrient.unit) {
        totalNutrition[nutrient.name].value = JSON.stringify(
          Number(nutrient.value) + Number(totalNutrition[nutrient.name].value)
        );
      }
    } else {
      totalNutrition[nutrient.name] = nutrient;
    }
  });
  //remove old collection from db
  UserModel.deleteOne({
    user: user.name
  })
    .then(() => {})
    .catch(err => {
      console.log("error removing old user", err);
    });
  //add new collection to db
  UserModel({
    user: user.name,
    totalNutrition: JSON.stringify(totalNutrition),
    previousItems: JSON.stringify(previousItems)
  })
    .save()
    .then(() => {
      callback(null, "success");
    })
    .catch(err => {
      if (err) console.log("error saving user ", err);
      callback(err, null);
    });
};

let getTotalNutrition = function(user, callback) {
  UserModel.find({
    user: user.name
  })
    .then(doc => {
      callback(null, doc[0]);
    })
    .catch(err => {
      callback(err, null);
    });
};

let updateNutrition = function(user, callback) {
  getTotalNutrition(user, (err, document) => {
    if (err) console.log("error getting document", err);
    else {
      addNutrition(user, document, callback);
    }
  });
};

module.exports = { updateNutrition, getTotalNutrition };
