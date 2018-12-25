import * as React from 'react';

import ArticleListItem from './ArticleListItem';
import { IArticleListItemProps } from './ArticleListItem';

//import ApiCaller from '../ApiCaller/ApiCaller';
import { IGetArticleListData, IUsersDataMap } from '../ApiCaller/ApiCaller.d';

import * as util from '../../util';

import './ArticleListing.css';

export interface IArticleListingProps {
    articlesListData: IGetArticleListData[];
    authorsDataMap: IUsersDataMap;
};

export default class ArticleListing extends React.PureComponent<IArticleListingProps, {}> {
    public render() {
        return (
            <section className="article-listing">
                {
                    this.props.articlesListData.map((articleListData:  IGetArticleListData ) => {
                        let authorName = "XXX";
                        if (this.props.authorsDataMap[articleListData.authorId]) {
                            authorName = this.props.authorsDataMap[articleListData.authorId].userDisplayName;
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