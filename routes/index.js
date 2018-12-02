const express = require("express");
const router = express.Router();

const request = require("request");

/* GET home page. */
router.get("/", function(req, res, next) {
  const url =
    "http://api.giphy.com/v1/gifs/random?api_key=aAcKJrwOggkKWc6KmFCSFlmQ0amFjUkf";
  request.get(url, (err, response, body) => {
    if (err) {
      console.log(err);
    } else {
      body = JSON.parse(body);
      const imgUrl = body.data.image_original_url;
      console.log(body);
      res.render("index", { title: "My Giphy App", imgUrl });
    }
  });
});

router.get("/search", (req, res, next) => {
  res.render("search");
});

router.post("/search", (req, res, next) => {
  const query = req.body["giphy-query"];
  const url = `http://api.giphy.com/v1/gifs/search?api_key=aAcKJrwOggkKWc6KmFCSFlmQ0amFjUkf&q=${query}`;
  request.get(url, (err, response, body) => {
    if (err) {
      console.log(err);
    } else {
      body = JSON.parse(body);
      const randomResult =
        body.data[Math.floor(Math.random() * body.data.length)];
      const searchResultUrl = randomResult.images.fixed_height.url;
      res.render("search", { searchResultUrl });
    }
  });
});

module.exports = router;
