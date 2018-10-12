import * as React from 'react';

import './Article.css';

import { defaultTheme as theme } from '../../style/themes';

interface IArticleProps {
    title: string,
    authorName: string,
    authorUrl: string,
    date: string,
    weekday: string,
    body: string
};

const articleStyle = theme.itemBoxStyle;
const titleStyle = theme.articleTitleStyle;

export default class Article extends React.Component<IArticleProps> {

    public render() {
        const { title, authorName, authorUrl, date, weekday, body } = this.props;
        return (
            <article className="article" style={articleStyle}>
                <h2 className="article__title" style={titleStyle}>{title}</h2>
                <div className="article__name-date-line">
                    <span className="article__author-date-box">
                        <a className="article__author" href={authorUrl}>{authorName}</a> 
                        <span className="article__date">{date}</span>
                        <span className="article__weekday">{weekday}</span>
                    </span>
                </div>
                <div className="article__body">
                    {body}
                </div>
            </article>
        );
    }
}
