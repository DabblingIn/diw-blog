
import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';

import { IArticleListItemProps } from '../parts/ArticleListItem/ArticleListItem';

import ArticleListing from '../parts/ArticleListing/ArticleListing';

// TODO: Ajax for articlesData

interface IDefaultPageState {
    articlesData: IArticleListItemProps[]
};

interface IDefaultPageProps {
    siteName: string;
};


const MOCK_ARTICLES_DATA: IArticleListItemProps[] = [
    {
        articleDate: new Date(),
        articleDescription: "This is article ABC",
        articleName: "Article ABC",
        articleUrl: "/p/abc.html",

        authorName: "Tom Smith",
        authorUrl: "tomsmith.com"
    },
    {
        articleDate: new Date(),
        articleDescription: "This is article DEF",
        articleName: "Article DEF",
        articleUrl: "/p/def.html",

        authorName: "Alfred Buxley",
        authorUrl: "alfredbuxley.com"
    },
    {
        articleDate: new Date(),
        articleDescription: "This is article XYZ",
        articleName: "Article XYZ",
        articleUrl: "/p/xyz.html",

        authorName: "Marty McFly",
        authorUrl: "martymcfly.com"
    }
    
];

export default class DefaultPage extends React.Component<IDefaultPageProps, IDefaultPageState> {
    constructor(props: IDefaultPageProps) {
        super(props);

        this.state = {
            articlesData: MOCK_ARTICLES_DATA
        };
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