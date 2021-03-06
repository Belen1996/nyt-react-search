import React, { Component } from 'react';

const isRunningInHeroku = (process.env.NODE && (process.env.NODE.indexOf("heroku") !== -1));
const url = isRunningInHeroku ? "https://nyt-news-scraper-react-bmf.herokuapp.com/api/saved-articles" : "http://localhost:8080/api/saved-articles";

class ArticleCard extends Component{
    constructor(props){
        super(props);
        this.state={
            articleId: props.articleId,
            headline: props.headline,
            description: props.description,
            originalArticle: props.originalArticle
        };

        this.articleChangedCb = props.articleChangedCb;
    }

    saveArticle(){
        fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        articleId: this.state.articleId
                        })
                   }).then(() => this.articleChangedCb());
    }

    render(){
        return(
        <div key={this.state.articleId} id={"article-" + this.state.articleId}>
                <div data-id={this.state.articleId} className="card">
                    <div className="card-header">
                        <h3>
                            <a className="article-link" target="_blank" rel="noopener noreferrer" href={this.state.originalArticle}>{this.state.headline}</a>
                            <a className="btn btn-success save" onClick={() => this.saveArticle()}>Save Article</a>
                        </h3>
                    </div>
                    <div className="card-body">{this.state.description}</div>
                </div>
            </div>
        );
    }
}

export default ArticleCard;