
import * as React from 'react';

import EditorArticleListItem, { IEditorArticleListItemProps } from './EditorArticleListItem';
import * as ApiCaller from '../ApiCaller/ApiCaller';
import { IGetArticlesListingResponse, IGetUserDataResponse, IGetArticleListData, IUsersDataMap } from '../ApiCaller/ApiCaller.d';
import * as util from '../../util';
import { getSubKey } from '../../subdomains';

export interface IEditorArticleListingProps {
    authorId: string;
};

export interface IEditorArticleListingState {
    articlesListData: IGetArticleListData[];
    authorsDataMap: IUsersDataMap;
};


// TODO: Add code here or in EditorPage for detecting the current signed in user and gathering only their articles

export default class EditorArticleListing extends React.Component<IEditorArticleListingProps, IEditorArticleListingState> {
    constructor(props: IEditorArticleListingProps) {
        super(props);

        this.state = {
            articlesListData: [],
            authorsDataMap: {}
        };
    }

    public componentDidMount() {
        const subKey = getSubKey();
        ApiCaller
            .getArticlesListing({ sub: subKey, authorId: this.props.authorId })    // gets articles based on subdomain
            .then((res: IGetArticlesListingResponse) => {
                const articlesListData: IGetArticleListData[] = res.data.data;
                // TODO: const articlesListErr: string = res.data.err;
                this.setState({
                    articlesListData
                });

                const authorIds: string[] = Array.from(new Set(
                    articlesListData.map((articleListData: IGetArticleListData) => articleListData.authorId)
                ));
                Promise
                    .all(authorIds.map( (authorId) => ApiCaller.getUserData(authorId) ))
                    .then((authorsDataResponses: IGetUserDataResponse[]) => {
                        const authorsDataMap = util.arrayToMap(authorsDataResponses.map(authorDataResponse => authorDataResponse.data), 'userId') as IUsersDataMap;
                        this.setState({
                            authorsDataMap
                        });
                    });

            })
            //.catch();
    }

    public render() {
        return (
            <div>
                <h1 style={{ fontFamily: "Oswald, sans-serif", margin: 5}}>Editor: Articles</h1>
                <section className="editor-article-listing">
                {
                    this.state.articlesListData.map((articleListData:  IGetArticleListData ) => {
                        let authorName = "XXX";
                        if (this.state.authorsDataMap[articleListData.authorId]) {
                            authorName = this.state.authorsDataMap[articleListData.authorId].userDisplayName;
                        }
                        const articleListItemProps: IEditorArticleListItemProps = { 
                            authorName,
                            ...articleListData
                        };
                        return (<EditorArticleListItem key={util.articleLink(articleListItemProps.articleId)} {...articleListItemProps}/>);
                    })
                }
                </section>
            </div>
        );
    }
}