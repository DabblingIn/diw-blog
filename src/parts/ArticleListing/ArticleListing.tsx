import * as React from 'react';

import ArticleListItem from '../ArticleListItem/ArticleListItem';
import { IArticleListItemProps } from '../ArticleListItem/ArticleListItem';

import './ArticleListing.css';

interface IArticleListingProps {
    articlesData: IArticleListItemProps[];
};

export default class ArticleListing extends React.Component<IArticleListingProps, {}> {
    public render() {
        return (
            <section className="article-listing">
                {
                    this.props.articlesData.map((articleProps: IArticleListItemProps) => {
                        return (<ArticleListItem key={articleProps.articleUrl} {...articleProps}/>);
                    })
                }
            </section>
        );
    }
}