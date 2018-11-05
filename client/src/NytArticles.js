import React, { Component } from 'react';
import ArticleCard from './ArticleCard.js';

const isRunningInHeroku = (process.env.NODE && (process.env.NODE.indexOf("heroku") !== -1));
const url = isRunningInHeroku ? "https://nyt-news-scraper-react-bmf.herokuapp.com/api/articles" : "http://localhost:8080/api/articles";

function renderCard(article, articleChangedCb){
    let articleId = article._articleId;
    let headline = article._headline;
    let description = article._description;
    let original_article = article._original_article;

    return(<ArticleCard key={articleId} articleId={articleId} headline={headline} description={description} originalArticle={original_article} articleChangedCb={articleChangedCb}/>);
}

class NytArticles extends Component {
    constructor(props){
        super(props);

        this.state={
            articles: []
        };

        this.refreshArticles = this.refreshArticles.bind(this);
    }

    refreshArticles() {
        this.getArticles();
    }

    componentDidMount(){
        this.getArticles();
    }

    getArticles(){
        fetch(url).then(r => r.json()).then(a => this.setState({articles: a.articles}));
    }

    render(){
        return(<div className="container">
        <h1>Latest news!</h1>
    
    
        <div id="articles" className="container-fluid article-container">
            {this.state.articles.length === 0 ? <span>No news available</span> : this.state.articles.map(a => renderCard(a, this.refreshArticles))}
        </div>
    </div>);
    }
}

export default NytArticles;