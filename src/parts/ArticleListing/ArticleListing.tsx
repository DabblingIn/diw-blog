import * as React from 'react';

import ArticleListItem from './ArticleListItem';
import { IArticleListItemProps } from './ArticleListItem';

import { IGetArticleListData } from '../ApiCaller/ApiCaller.d';

import * as util from '../../util';

import './ArticleListing.css';

export interface IArticleListingProps {
    articlesListData: IGetArticleListData[];
};

export default class ArticleListing extends React.PureComponent<IArticleListingProps, {}> {
    public render() {
        return (
            <section className="article-listing">
                {
                    this.props.articlesListData.map((articleListData:  IGetArticleListData ) => {
                        const articleListItemProps: IArticleListItemProps = articleListData;
                        return (<ArticleListItem key={util.articleLink(articleListData.articleId)} {...articleListItemProps}/>);
                    })
                }
            </section>
        );
    }
}