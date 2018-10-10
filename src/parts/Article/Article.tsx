
import * as React from 'react';

interface ArticleState {

};

interface ArticleProps {
    
};

export default class Article extends React.Component<ArticleProps, ArticleState> {


    render() {
        return (
            <article>
                <h2 className="article-title">{{title}}</h2>
                <div className="name-date-line">
                    <span className="author-date-box">
                        <a className="article-author" href="{{authorUrl}}">{{authorName}}</a> 
                        <span className="article-date">{{date}}</span>
                        <span className="article-weekday"></span>
                    </span>
                </div>
                <div class="article-body">
                    {{body}}
                </div>
            </article>
        );
    }
}