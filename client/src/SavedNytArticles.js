import React, { Component } from 'react';
import SavedArticleCard from './SavedArticleCard.js';

const isRunningInHeroku = (process.env.NODE && (process.env.NODE.indexOf("heroku") !== -1));
const url = "http://localhost:8080/api/saved-articles";

function renderCard(article, articleChangedCb){
    let articleId = article._articleId;
    let headline = article._headline;
    let description = article._description;
    let original_article = article._original_article;

    return(<SavedArticleCard key={articleId} articleId={articleId} headline={headline} description={description} originalArticle={original_article} articleChangedCb={articleChangedCb}/>);
}

class SavedNytArticles extends Component {
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
        fetch(url).then(r => r.json()).then(a => this.setState({articles: a.savedArticles}));
    }

    render(){
        return(<div className="container">
        <h1>Saved news</h1>
    
    
        <div id="articles" className="container-fluid article-container">
            {this.state.articles.length === 0 ? <span>No saved news</span> : this.state.articles.map(a => renderCard(a, this.refreshArticles))}
        </div>
    </div>);
    }
}

export default SavedNytArticles;