import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';
import Article, { IArticleProps } from '../parts/Article/Article';

import * as ApiCaller from '../parts/ApiCaller/ApiCaller';
import { IGetArticleDataResponse, IGetArticleData, IGetUserDataResponse, IGetUserDataReturn } from '../parts/ApiCaller/ApiCaller.d';

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
                const articleData: IGetArticleData = articleDataResponse.data;
                // TODO: Remove this extra user call and use the user data from the article call
                ApiCaller
                    .getUserData(articleData.authorId)
                    .then((authorDataResponse: IGetUserDataResponse) => {
                        const authorData: IGetUserDataReturn = authorDataResponse.data;

                        // TODO: setState for all info
                        this.setState({
                            title: articleData.articleTitle,
                            authorId: authorData.userId,
                            authorName: authorData.userDisplayName,
                            authorUrl: authorData.userWebsite,
                            date: articleData.articleCreatedAt,
                            body: articleData.articleContent
                        });
                    });
            });
    }

    public render() {
        document.title = subdomainConfig.tabName + " | " + this.state.title;

        return (
            <div className="article-page" style={articlePageStyle}>
                <DefaultNavbar />

                <Article {...this.state} />
            </div>
        );
    }
}