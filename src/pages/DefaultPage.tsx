
import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';

import ApiCaller from '../parts/ApiCaller/ApiCaller';
import { IArticleListData, IGetAllArticlesDataResponse } from '../parts/ApiCaller/ApiCaller.d';

import ArticleListing from '../parts/ArticleListing/ArticleListing';
import { defaultTheme as theme } from '../style/themes';

import './DefaultPage.css';


interface IDefaultPageState {
    articlesListData: IArticleListData[]
};

interface IDefaultPageProps {
    siteName: string;
};


const MARGIN_TOPBOTTOM: number = 20;

const defaultPageStyle = {
  marginTop: theme.navbarHeight + MARGIN_TOPBOTTOM,
  marginBottom: MARGIN_TOPBOTTOM
};


export default class DefaultPage extends React.Component<IDefaultPageProps, IDefaultPageState> {
    constructor(props: IDefaultPageProps) {
        super(props);

        this.state = {
            articlesListData: []
        };
    }

    public componentDidMount() {
        ApiCaller.getArticlesListing((res: IGetAllArticlesDataResponse) => {
            const articlesListData: IArticleListData[] = res.data;
            this.setState({
                articlesListData
            });
        });
    }

    public render() {
        return (
            <div className="default-page" style={defaultPageStyle}>
                <DefaultNavbar siteName={this.props.siteName} />

                <div>
                    <ArticleListing articlesListData={this.state.articlesListData} />
                </div>
            </div>
        );
    }
}