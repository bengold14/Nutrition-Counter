const morgan = require("morgan");
const parser = require("body-parser");
const express = require("express");
const path = require("path");
const axios = require("axios");
const database = require("../database/dbMethods.js");
const app = express();
const PORT = process.env.port || 3000;
const KEY = process.env.key || require("../keys.js").USDAkey; //sign up for key @ https://ndb.nal.usda.gov/ndb/doc/index#

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(morgan());
app.use(parser.json());

app.get("/search", (req, res) => {
  axios
    .get(
      `https://api.nal.usda.gov/ndb/search/?format=json&q=${
        req.query.searchTerm
      }&sort=n&max=25&offset=0&api_key=${KEY}`
    )
    .then(({ data }) => {
      res.send(data);
    })
    .catch(err => {
      console.log("error getting food nutrition data back from usda", err);
    });
});

app.get("/food", (req, res) => {
  axios
    .get(
      `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${JSON.parse(
        req.query.ndbno
      )}&type=b&format=json&api_key=${KEY}`
    )
    .then(({ data }) => {
      let food = data.foods[0].food;
      res.send(food);
    })
    .catch(err => {
      console.log("error getting food nutrition data back from usda", err);
    });
});

app.get("/nutrition", (req, res) => {
  database.getTotalNutrition({ name: "ben" }, (err, data) => {
    if (err) {
      res.sendStatus("500");
    } else {
      res.send(data);
    }
  });
});

app.post("/nutrition", (req, res) => {
  axios
    .get(
      `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${JSON.parse(
        req.body.ndbno
      )}&type=b&format=json&api_key=${KEY}`
    )
    .then(({ data }) => {
      let food = data.foods[0].food;
      console.log(food);
      database.updateNutrition({ name: "ben", food: food }, (err, success) => {
        if (err) {
          res.sendStatus("500");
        } else {
          res.sendStatus("200");
        }
      });
    })
    .catch(err => {
      console.log("error getting food nutrition data back from usda", err);
    });
});

app.listen(PORT, err => {
  if (err) throw err;
  else console.log(`listening on port ${PORT}`);
});
