const express = require("express");
const path = require('path');

const router = express.Router();

const news_scraper_service = require("../services/news-scraper-service.js");

const Article = require("../model/article.js");

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

router.get("/api/articles", function(req, res) {
    news_scraper_service.scrapeArticlesFromSource(function(articles) {
        const articleObject = {
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
        const savedArticlesObject = {
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
