import * as React from 'react';

import utils from '../../util';

export interface IArticleListItemProps {
    articleName: string;
    articleDescription: string;
    articleDate: Date;
    articleUrl: string;

    authorName: string;
    authorUrl: string;
};

export default class ArticleListItem extends React.Component<IArticleListItemProps, {}> {
    public render() {
        return (
            <div className="al-item">
                <a className="al-link" href="{this.props.articleUrl}">
                    <h3 className="al-title">{this.props.articleName}</h3>
                </a>
                <a className="al-author" href="{this.props.authorUrl}">{this.props.authorName}</a>
                <p className="al-description">{this.props.articleDescription}</p>
                <p className="al-date">{utils.minDateString(this.props.articleDate)}</p>
            </div>
        );
    }
}