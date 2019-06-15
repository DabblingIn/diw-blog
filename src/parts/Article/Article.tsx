import * as React from 'react';

import * as util from '../../util';
import { IGetArticleData } from '../ApiCaller/ApiCaller.d';

import { defaultTheme as theme } from '../../style/themes';
import './Article.css';

export interface IArticleProps extends IGetArticleData {};

const articleStyle = theme.itemBoxStyle;
const titleStyle = theme.articleTitleStyle;


export default function Article(props: IArticleProps) {
    React.useEffect(() => {
        // Twitter
        util.loadTwitterWidgets();
    })

    const articleCreatedAt = new Date(props.articleCreatedAt);
    return (
        <article className="article" style={articleStyle}>
            <h2 className="article__title" style={titleStyle}>{props.articleTitle}</h2>
            <div className="article__name-date-line">
                <span className="article__author-date-box">
                    <a className="article__author" href={props.authorSite}>{props.authorName} (<b>{props.authorUsername}</b>)</a>
                    <span className="article__created_date">{util.minDateString(articleCreatedAt)}</span>
                    <span className="article__weekday">{util.getWeekdayString(articleCreatedAt)}</span>
                </span>
            </div>
            <div className="article__content" 
                dangerouslySetInnerHTML={{ __html: props.articleContent }} />
        </article>
    );
}