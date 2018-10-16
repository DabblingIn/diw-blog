import * as React from 'react';

import ArticleListItem from '../ArticleListItem/ArticleListItem';
import { IArticleListItemProps } from '../ArticleListItem/ArticleListItem';

import { IArticleListData } from '../ApiCaller/ApiCaller.d';

import './ArticleListing.css';

interface IArticleListingProps {
    articlesListData: IArticleListData[];
};

export default class ArticleListing extends React.Component<IArticleListingProps, {}> {
    public render() {
        return (
            <section className="article-listing">
                {
                    this.props.articlesListData.map((articleListItemProps:  IArticleListItemProps ) => {
                        return (<ArticleListItem key={articleListItemProps.articleUrl} {...articleListItemProps}/>);
                    })
                }
            </section>
        );
    }
}