
import * as React from 'react';

interface IArticleProps {
    title: string,
    authorName: string,
    date: string,
    weekday: string,
    body: string
};

export default class Article extends React.Component<IArticleProps> {

    public render() {
        const { title, authorName, date, weekday, body } = this.props;
        return (
            <article>
                <h2 className="article-title">{title}</h2>
                <div className="name-date-line">
                    <span className="author-date-box">
                        <a className="article-author" href="{{authorUrl}}">{authorName}</a> 
                        <span className="article-date">{date}</span>
                        <span className="article-weekday">{weekday}</span>
                    </span>
                </div>
                <div className="article-body">
                    {body}
                </div>
            </article>
        );
    }
}