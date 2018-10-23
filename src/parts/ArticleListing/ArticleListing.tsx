import * as React from 'react';

import ArticleListItem from '../ArticleListItem/ArticleListItem';
import { IArticleListItemProps } from '../ArticleListItem/ArticleListItem';

//import ApiCaller from '../ApiCaller/ApiCaller';
import { IArticleListData, IUsersDataMap } from '../ApiCaller/ApiCaller.d';

import util from '../../util';

import './ArticleListing.css';

export interface IArticleListingProps {
    articlesListData: IArticleListData[];
    authorsDataMap: IUsersDataMap;
};

export default class ArticleListing extends React.PureComponent<IArticleListingProps, {}> {
    public render() {
        return (
            <section className="article-listing">
                {
                    this.props.articlesListData.map((articleListData:  IArticleListData ) => {
                        let authorName = "XXX";
                        if (this.props.authorsDataMap[articleListData.authorId]) {
                            authorName = this.props.authorsDataMap[articleListData.authorId].name;
                        }
                        const articleListItemProps: IArticleListItemProps = { 
                            authorName,
                            ...articleListData
                        };
                        return (<ArticleListItem key={util.articleLink(articleListItemProps.articleId)} {...articleListItemProps}/>);
                    })
                }
            </section>
        );
    }
}