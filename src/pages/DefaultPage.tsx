
import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';

import ApiCaller from '../parts/ApiCaller/ApiCaller';
import { IArticleData, IGetAllArticlesDataResponse } from '../parts/ApiCaller/ApiCaller.d';

import ArticleListing from '../parts/ArticleListing/ArticleListing';

// TODO: Ajax for articlesData

interface IDefaultPageState {
    articlesData: IArticleData[]
};

interface IDefaultPageProps {
    siteName: string;
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
            <div>
                <DefaultNavbar siteName={this.props.siteName} />

                <div className="container">
                    <ArticleListing articlesData={this.state.articlesData} />
                </div>
            </div>
        );
    }
}