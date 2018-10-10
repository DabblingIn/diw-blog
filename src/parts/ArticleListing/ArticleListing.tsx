import React from 'react';

import ArticleListItem from '../ArticleListItem/ArticleListItem';
import { ArticleListItemProps } from '../ArticleListItem/ArticleListItem';


export default interface ArticleListingProps {
    articlesData: Array<ArticleListItemProps>;
};

//interface ArticleListingState {};

export default class ArticleListing extends React.Component<ArticleListingProps, {}> {
    render() {
        return (
            <section id="article-listing">
                {
                    this.props.articlesData.map(function(articleProps: ArticleListItemProps) {
                        return (<ArticleListItem {...articleProps}/>);
                    })
                }
            </section>
        );
    }
}