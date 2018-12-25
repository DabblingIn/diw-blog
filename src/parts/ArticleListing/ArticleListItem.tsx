import * as React from 'react';

import * as util from '../../util';
import { IGetArticleListData } from '../ApiCaller/ApiCaller.d';

import { defaultTheme as theme } from '../../style/themes';
import './ArticleListItem.css';

const articleListItemStyle = theme.itemBoxStyle;
const titleStyle = theme.articleTitleStyle;

export interface IArticleListItemProps extends IGetArticleListData {}

export default class ArticleListItem extends React.Component<IArticleListItemProps, {}> {
    public render() {
        return (
            <div className="article-list-item" style={articleListItemStyle}>
                <a className="article-list-item__link" href={util.articleLink(this.props.articleUrlId)}>
                    <h3 className="article-list-item__title" style={titleStyle}>{this.props.articleTitle}</h3>
                </a>
                <a className="article-list-item__author" href={util.userLink(this.props.authorId)}>{this.props.authorName}</a>
                <p className="article-list-item__description">{this.props.articleDescription}</p>
                <p className="article-list-item__date">{util.minDateString(this.props.articleUpdatedAt)}</p>
            </div>
        );
    }
}
