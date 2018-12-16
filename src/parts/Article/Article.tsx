import * as React from 'react';

import * as util from '../../util';

import { defaultTheme as theme } from '../../style/themes';
import './Article.css';

export interface IArticleProps {
    title: string;
    authorId: string;
    authorName: string;
    authorUrl: string;
    date: Date;
    weekday: string;
    body: string;
};

const articleStyle = theme.itemBoxStyle;
const titleStyle = theme.articleTitleStyle;

export default class Article extends React.Component<IArticleProps> {

    public render() {
        const { title, authorId, authorName, authorUrl, date, body } = this.props;
        let dateString: string;
        let weekday: string;
        try {
            dateString = util.minDateString(date);
            weekday = util.getWeekdayString(date);
        } catch(err) {
            // if dates are not yet populated, return empty frame
            return <article className="article" style={articleStyle} />;
        }
        return (
            <article className="article" style={articleStyle}>
                <h2 className="article__title" style={titleStyle}>{title}</h2>
                <div className="article__name-date-line">
                    <span className="article__author-date-box">
                        <a className="article__author" href={authorUrl}>{authorName} (<b>{authorId}</b>)</a>
                        <span className="article__date">{dateString}</span>
                        <span className="article__weekday">{weekday}</span>
                    </span>
                </div>
                <div className="article__body" 
                    dangerouslySetInnerHTML={{ __html: body }} />
            </article>
        );
    }
}
