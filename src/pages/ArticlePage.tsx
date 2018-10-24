import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';
import Article, { IArticleProps } from '../parts/Article/Article';

import ApiCaller from '../parts/ApiCaller/ApiCaller';
import { IGetArticleDataResponse, IArticleData, IGetUserDataResponse, IUserData } from '../parts/ApiCaller/ApiCaller.d';

import { RouteComponentProps } from 'react-router';

import { defaultTheme as theme } from '../style/themes';
//import './ArticlePage.css';

interface IArticlePageMatchParams {
    articleId: string;
};

interface IArticlePageProps extends RouteComponentProps<IArticlePageMatchParams>{};

interface IArticlePageState extends IArticleProps {};


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
        const { articleId } = this.props.match.params;
        ApiCaller
            .getArticleData(articleId)
            .then((articleDataResponse: IGetArticleDataResponse) => {
                const articleData: IArticleData = articleDataResponse.data;
                ApiCaller
                    .getUserData(articleData.authorId)
                    .then((authorDataResponse: IGetUserDataResponse) => {
                        const authorData: IUserData = authorDataResponse.data;

                        // TODO: setState for all info
                        this.setState({
                            title: articleData.articleName,
                            authorId: authorData.id,
                            authorName: authorData.name,
                            authorUrl: authorData.url,
                            date: articleData.articleDate,
                            body: articleData.articleBody
                        });
                    });
            });
    }

    public render() {
        return (
            <div className="article-page" style={articlePageStyle}>
                <DefaultNavbar />

                <Article {...this.state} />
            </div>
        );
    }
}