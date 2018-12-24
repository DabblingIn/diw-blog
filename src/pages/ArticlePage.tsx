import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';
import Article, { IArticleProps } from '../parts/Article/Article';

import * as ApiCaller from '../parts/ApiCaller/ApiCaller';
import { IGetArticleDataResponse, IGetArticleData } from '../parts/ApiCaller/ApiCaller.d';

import { getSubdomainConfig } from '../subdomains';

import { defaultTheme as theme } from '../style/themes';
//import './ArticlePage.css';

interface IArticlePageMatchParams {
    articleUrlId: string;
};

interface IArticlePageProps extends RouteComponentProps<IArticlePageMatchParams>{};

interface IArticlePageState extends IArticleProps {};

const subdomainConfig = getSubdomainConfig();


const articlePageStyle = {
  marginTop: theme.navbarHeight + theme.topBottomMargin,
  marginBottom: theme.topBottomMargin
};


export default class ArticlePage extends React.Component<IArticlePageProps, IArticlePageState> {
    constructor(props: IArticlePageProps) {
        super(props);

        this.state = {} as IArticlePageState;
    }

    public componentDidMount() {
        const { articleUrlId } = this.props.match.params;
        ApiCaller
            .getArticleDataByUrlId(articleUrlId)
            .then((articleDataResponse: IGetArticleDataResponse) => {
                const data: IGetArticleData = articleDataResponse.data.data;

                this.setState({ ...data });
                // TODO: const articleDataErr: string = res.data.err;  // Use this backend err message if not null
            });
    }

    public render() {
        document.title = subdomainConfig.tabName + " | " + this.state.articleTitle;

        return (
            <div className="article-page" style={articlePageStyle}>
                <DefaultNavbar />

                <Article {...this.state} />
            </div>
        );
    }
}