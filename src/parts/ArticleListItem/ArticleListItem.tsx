import React from 'react';

import minDateString from '../../util';

export interface ArticleListItemProps {
    articleName: string;
    articleDescription: string;
    articleDate: Date;
    articleUrl: string;

    authorName: string;
    authorUrl: string;
};

//export interface ArticleListItemState {};

export default class ArticleListItem extends React.Component<ArticleListItemProps, {}> {
    render() {
        return (
            <div className="al-item">
                <a className="al-link" href="{this.props.articleUrl}">
                    <h3 class="al-title">{this.props.articleName}</h3>
                </a>
                <a className="al-author" href="{this.props.authorUrl}">{this.props.authorName}</a>
                <p className="al-description">{this.props.articleDescription}</p>
                <p className="al-date">{minDateString(this.props.articleDate)}</p>
            </div>
        );
    }
}