
import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';

import * as ApiCaller from '../parts/ApiCaller/ApiCaller';
import { IGetArticleListData, IGetArticlesListingResponse, IGetUserDataResponse, IUsersDataMap } from '../parts/ApiCaller/ApiCaller.d';

import ArticleListing from '../parts/ArticleListing/ArticleListing';

import { getSubKey, getSubdomainConfig } from '../subdomains';
import * as util from '../util';

import { defaultTheme as theme } from '../style/themes';
import './DefaultPage.css';

interface IDefaultPageState {
    articlesListData: IGetArticleListData[];
    authorsDataMap: IUsersDataMap;
};

interface IDefaultPageProps {};


const subdomainConfig = getSubdomainConfig();

const defaultPageStyle = {
  marginTop: theme.navbarHeight + theme.topBottomMargin,
  marginBottom: theme.topBottomMargin
};


export default class DefaultPage extends React.PureComponent<IDefaultPageProps, IDefaultPageState> {
    constructor(props: IDefaultPageProps) {
        super(props);

        this.state = {
            articlesListData: [],
            authorsDataMap: {}
        };
    }

    public componentDidMount() {
        const subKey = getSubKey();
        ApiCaller
            .getArticlesListing({ sub: subKey })    // gets articles based on subdomain
            .then((res: IGetArticlesListingResponse) => {
                const articlesListData: IGetArticleListData[] = res.data.data;
                // TODO: const articlesListDataErr: string = res.data.err;  // Use this backend err message if not null
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
        document.title = subdomainConfig.tabName;

        return (
            <div className="default-page" style={defaultPageStyle}>
                <DefaultNavbar />

                <div>
                    <ArticleListing articlesListData={this.state.articlesListData} authorsDataMap={this.state.authorsDataMap} />
                </div>
            </div>
        );
    }
}