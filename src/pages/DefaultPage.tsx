
import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';

import ApiCaller from '../parts/ApiCaller/ApiCaller';
import { IArticleListData, IGetArticlesListingResponse, IGetUserDataResponse, IUsersDataMap } from '../parts/ApiCaller/ApiCaller.d';

import ArticleListing from '../parts/ArticleListing/ArticleListing';

import util from '../util';

import { defaultTheme as theme } from '../style/themes';
import './DefaultPage.css';

interface IDefaultPageState {
    articlesListData: IArticleListData[];
    authorsDataMap: IUsersDataMap;
};

interface IDefaultPageProps {};


const MARGIN_TOPBOTTOM: number = 20;

const defaultPageStyle = {
  marginTop: theme.navbarHeight + MARGIN_TOPBOTTOM,
  marginBottom: MARGIN_TOPBOTTOM
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
        ApiCaller
            .getArticlesListing()
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
            <div className="default-page" style={defaultPageStyle}>
                <DefaultNavbar />

                <div>
                    <ArticleListing articlesListData={this.state.articlesListData} authorsDataMap={this.state.authorsDataMap} />
                </div>
            </div>
        );
    }
}