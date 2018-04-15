const axios = require("axios");
const router = require("express").Router();
const articleController = require("../../controllers/articleController");
const APIKEY = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  APIKEY + "&q=";


// Matches with "/api/articles"
router.route("/")
  .get(articleController.findAll)
  .post(articleController.create);

// Matches with "/api/aricles/:id"
router
  .route("/:id")
  .get(articleController.findById)
  .put(articleController.update)
  .delete(articleController.remove);

  router.get("/articles", (req, res) => {
    console.log(req);
    axios
      .get(BASEURL, { params: req.query })
      .then(
        ({ data: { results } })
         => res.json(results))
      
      .catch(err => res.status(422).json(err));
  });

module.exports = router;

