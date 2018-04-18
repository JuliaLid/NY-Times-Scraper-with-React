const db = require("../models");
const axios = require("axios");
const APIKEY = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  APIKEY + "&q=";

// Defining methods for the articleController
module.exports = {
  findAll: function(req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("line 23 Controller ", req.body);
    db.Article.create (req.body, function (err,data){
      if (err) {
        console.log(err);
      } else {
        console.log("I'm saved");
      }
    })
      // .create(req.body)
      // .then(dbModel => res.json(dbModel))
      // .then(dbModel => {
      //   console.log(dbModel)})
      // .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  searchAll: function (req, res) {
    console.log(req);
    axios
      .get(BASEURL, { params: req.query })
      .then(({ data: { results } })=> res.json(results))
      .catch(err => res.status(422).json(err));
  }
};
