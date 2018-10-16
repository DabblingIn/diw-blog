import * as React from 'react';

import ArticleListItem from '../ArticleListItem/ArticleListItem';
import { IArticleListItemProps } from '../ArticleListItem/ArticleListItem';

import ApiCaller from '../ApiCaller/ApiCaller';
import { IArticleListData, IUserData, IGetUserDataResponse } from '../ApiCaller/ApiCaller.d';

import util from '../../util';

import './ArticleListing.css';

interface IArticleListingProps {
    articlesListData: IArticleListData[];
};

interface IArticleListingState {
    articlesListData: IArticleListData[];
    authors: { [id: string]: IUserData };
};

export default class ArticleListing extends React.Component<IArticleListingProps, IArticleListingState> {

    constructor(props: IArticleListingProps) {
        super(props);

        this.state = {
            authors: {},
            articlesListData: this.props.articlesListData
        };
    }

    public componentDidMount() {
        this.state.articlesListData.forEach((articleListData:  IArticleListData ) => {
            if (!(articleListData.authorId in this.state.authors)) {
                ApiCaller.getUserData(articleListData.authorId, (response: IGetUserDataResponse) => {
                    const newAuthors = this.state.authors;
                    newAuthors[articleListData.authorId] = response.data;
                    this.setState({
                        authors: newAuthors
                    });
                });
            }
        });
    }

    public render() {
        return (
            <section className="article-listing">
                {
                    // TODO: change to merged articleListData + userData
                    this.state.articlesListData.map((articleListData:  IArticleListData ) => {
                        const articleListItemProps: IArticleListItemProps = { 
                            authorName: this.state.authors[articleListData.authorId].name,
                            ...articleListData
                        };
                        return (<ArticleListItem key={util.articleLink(articleListItemProps.articleId)} {...articleListItemProps}/>);
                    })
                }
            </section>
        );
    }
}