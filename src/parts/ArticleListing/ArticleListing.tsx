import * as React from 'react';

import ArticleListItem from '../ArticleListItem/ArticleListItem';
import { IArticleListItemProps } from '../ArticleListItem/ArticleListItem';


interface IArticleListingProps {
    articlesData: IArticleListItemProps[];
};

export default class ArticleListing extends React.Component<IArticleListingProps, {}> {
    public render() {
        return (
            <section id="article-listing">
                {
                    this.props.articlesData.map((articleProps: IArticleListItemProps) => {
                        return (<ArticleListItem key={articleProps.articleUrl} {...articleProps}/>);
                    })
                }
            </section>
        );
    }
}