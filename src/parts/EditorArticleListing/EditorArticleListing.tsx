
import * as React from 'react';

import ArticleListing from '../ArticleListing/ArticleListing';
import ApiCaller from '../ApiCaller/ApiCaller';
import { IGetArticlesListingResponse, IGetUserDataResponse, IArticleListData, IUsersDataMap } from '../ApiCaller/ApiCaller.d';
import * as util from '../../util';
import { getSubKey } from '../../subdomains';

export interface IEditorArticleListingProps {
    authorId: string;
};

export interface IEditorArticleListingState {
    articlesListData: IArticleListData[];
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
                const articlesListData: IArticleListData[] = res.data;
                this.setState({
                    articlesListData
                });

                const authorIds: string[] = Array.from(new Set(
                    articlesListData.map((articleListData: IArticleListData) => articleListData.authorId)
                ));
                Promise
                    .all(authorIds.map( (authorId) => ApiCaller.getUserData(authorId) ))
                    .then((authorsDataResponses: IGetUserDataResponse[]) => {
                        const authorsDataMap = util.arrayToIdMap(authorsDataResponses.map((authorDataResponse) => authorDataResponse.data)) as IUsersDataMap;
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
                <h1>Editor: Articles</h1>
                <div>
                    <ArticleListing articlesListData={this.state.articlesListData} authorsDataMap={this.state.authorsDataMap} />
                </div>
            </div>
        );
    }
}
