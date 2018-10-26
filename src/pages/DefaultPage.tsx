
import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';

import ApiCaller from '../parts/ApiCaller/ApiCaller';
import { IArticleListData, IGetArticlesListingResponse, IGetUserDataResponse, IUsersDataMap } from '../parts/ApiCaller/ApiCaller.d';

import ArticleListing from '../parts/ArticleListing/ArticleListing';

import { getSubKey, getSubdomainConfig } from '../subdomains';
import util from '../util';

import { defaultTheme as theme } from '../style/themes';
import './DefaultPage.css';

interface IDefaultPageState {
    articlesListData: IArticleListData[];
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
            .getArticlesListing(subKey)    // gets articles based on subdomain
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