const router = require("express").Router();
const articleRoutes = require("./article");

// Book routes
router.use("api/articles", articleRoutes);

router.get("/recipes", (req, res) => {
    axios
      .get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931", { params: req.query })
      .then(({ data: { results } }) => res.json(results))
      .catch(err => res.status(422).json(err));
  });
  

module.exports = router;
