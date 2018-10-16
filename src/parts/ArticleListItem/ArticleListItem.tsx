import * as React from 'react';

import utils from '../../util';
import { IArticleListData } from '../ApiCaller/ApiCaller.d';
import { defaultTheme as theme } from '../../style/themes';

import './ArticleListItem.css';

const articleListItemStyle = theme.itemBoxStyle;
const titleStyle = theme.articleTitleStyle;

export interface IArticleListItemProps extends IArticleListData {}

export default class ArticleListItem extends React.Component<IArticleListItemProps, {}> {
    public render() {
        return (
            <div className="article-list-item" style={articleListItemStyle}>
                <a className="article-list-item__link" href={this.props.articleUrl}>
                    <h3 className="article-list-item__title" style={titleStyle}>{this.props.articleName}</h3>
                </a>
                <a className="article-list-item__author" href={this.props.authorUrl}>{this.props.authorName}</a>
                <p className="article-list-item__description">{this.props.articleDescription}</p>
                <p className="article-list-item__date">{utils.minDateString(this.props.articleDate)}</p>
            </div>
        );
    }
}
