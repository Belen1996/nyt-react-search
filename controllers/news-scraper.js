var express = require("express");

var router = express.Router();

var news_scraper_service = require("../services/news-scraper-service.js");

const Article = require("../model/article.js");

router.get("/", function(req, res) {
    news_scraper_service.scrapeArticlesFromSource(function(articles) {
        var hbsObject = {
            articles: articles
        };
        res.render("index", hbsObject);
    });
});

router.get("/api/articles", function(req, res) {
    news_scraper_service.scrapeArticlesFromSource(function(articles) {
        var articleObject = {
            articles: articles
        };
        res.send(articleObject);
    });
});

router.post("/api/saved-articles", function(req, res) {
    let data = req.body;
    news_scraper_service.saveArticle(data.articleId, function(cb_res) {
        if(cb_res) {
            res.statusCode = 200;
            res.send({});
        } else {
            res.statusCode = 500;
            res.send({ message: "Could not save article"});
        }
    });
});

router.get("/api/saved-articles", function(req, res) {
    news_scraper_service.getSavedArticles(function(savedArticles) {
        var savedArticlesObject = {
            savedArticles: savedArticles
        };
        res.send(savedArticlesObject);
    });
});

router.delete("/api/saved-articles", function(req, res) {
    let data = req.body;
    news_scraper_service.removeSavedArticle(data.articleId, function(cb_res) {
        if(cb_res) {
            res.statusCode = 200;
            res.send({});
        } else {
            res.statusCode = 500;
            res.send({ message: "Could not delete article"});
        }
    })
});

module.exports = router;
