
import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';

import ApiCaller from '../parts/ApiCaller/ApiCaller';
import { IArticleData, IGetAllArticlesDataResponse } from '../parts/ApiCaller/ApiCaller.d';

import ArticleListing from '../parts/ArticleListing/ArticleListing';
import { defaultTheme as theme } from '../style/themes';

interface IDefaultPageState {
    articlesData: IArticleData[]
};

interface IDefaultPageProps {
    siteName: string;
};


const MARGIN_TOPBOTTOM: number = 20;
const MARGIN_RIGHTLEFT: number = 50;

const defaultPageStyle = {
  marginTop: theme.navbarHeight + MARGIN_TOPBOTTOM,
  marginBottom: MARGIN_TOPBOTTOM,
  marginRight: MARGIN_RIGHTLEFT,
  marginLeft: MARGIN_RIGHTLEFT
};


export default class DefaultPage extends React.Component<IDefaultPageProps, IDefaultPageState> {
    constructor(props: IDefaultPageProps) {
        super(props);

        this.state = {
            articlesData: []
        };
    }

    public componentDidMount() {
        ApiCaller.getAllArticlesData((res: IGetAllArticlesDataResponse) => {
            const articlesData: IArticleData[] = res.data;
            this.setState({
                articlesData
            });
        });
    }

    public render() {
        return (
            <div style={defaultPageStyle}>
                <DefaultNavbar siteName={this.props.siteName} />

                <div className="container">
                    <ArticleListing articlesData={this.state.articlesData} />
                </div>
            </div>
        );
    }
}