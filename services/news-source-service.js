const Article = require("../model/article.js");
const axios = require("axios");
const cheerio = require("cheerio");

// const isRunningInHeroku = (process.env.NODE && (process.env.NODE.indexOf("heroku") !== -1));

function getArticles(cb) {
    axios.get("https://www.nytimes.com/")
        .then(function(response) {
            cb(extractArticles(response.data));
        }).catch(function(error) {
            console.log("Error accessing The New York Times: " + error);
            cb([]);
        });
    }
    
    function extractArticles(html) {
        let result = [];
        let $ = cheerio.load(html);
        try{
            $('section[data-block-tracking-id="Top Stories"]').each( function (i, elem) {
                $(this).find('article').each( function (a, elem2) {
                    let article_link_element = $(this).find('a');
                    //console.log($(article_link_element).html());
                    let original_article = "https://www.nytimes.com" + $(article_link_element).attr("href");
                    let headline_node = $(article_link_element).find('h2');
                    let headline = $(headline_node).text().trim();
                    let description = $(article_link_element).find('p').text().trim();
                    result.push(new Article(null, headline, description, original_article));
                });
            });
        } catch(e) {
        }
        return result;
    }

var news_source = {
    getArticles: getArticles
}

module.exports = news_source;