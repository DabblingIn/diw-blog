import * as React from 'react';

import * as util from '../../util';
import { IArticleListData } from '../ApiCaller/ApiCaller.d';

import { defaultTheme as theme } from '../../style/themes';
import './ArticleListItem.css';

const articleListItemStyle = theme.itemBoxStyle;
const titleStyle = theme.articleTitleStyle;

export interface IArticleListItemProps extends IArticleListData {
    authorName: string
}

export default class ArticleListItem extends React.Component<IArticleListItemProps, {}> {
    public render() {
        return (
            <div className="article-list-item" style={articleListItemStyle}>
                <a className="article-list-item__link" href={util.articleLink(this.props.articleId)}>
                    <h3 className="article-list-item__title" style={titleStyle}>{this.props.articleName}</h3>
                </a>
                <a className="article-list-item__author" href={util.userLink(this.props.authorId)}>{this.props.authorName}</a>
                <p className="article-list-item__description">{this.props.articleDescription}</p>
                <p className="article-list-item__date">{util.minDateString(this.props.articleDate)}</p>
            </div>
        );
    }
}
