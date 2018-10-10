
import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';

import { ArticleListItemProps } from '../parts/ArticleListItem/ArticleListItem';

import ArticleListing from '../parts/ArticleListing/ArticleListing';

// TODO: Ajax for articlesData

export interface DefaultPageState {
    articlesData: Array<ArticleListItemProps>
};

export interface DefaultPageProps {
    siteName: string;
};


const MOCK_ARTICLES_DATA: Array<ArticleListItemProps> = [
    {
        articleName: "Article ABC",
        articleDescription: "This is article ABC",
        articleDate: new Date(),
        articleUrl: "/p/abc.html",

        authorName: "Tom Smith",
        authorUrl: "tomsmith.com"
    },
    {
        articleName: "Article DEF",
        articleDescription: "This is article DEF",
        articleDate: new Date(),
        articleUrl: "/p/abc.html",

        authorName: "Alfred Buxley",
        authorUrl: "alfredbuxley.com"
    },
    {
        articleName: "Article XYZ",
        articleDescription: "This is article XYZ",
        articleDate: new Date(),
        articleUrl: "/p/abc.html",

        authorName: "Marty Mfcly",
        authorUrl: "martymcfly.com"
    }
    
];

export default class DefaultPage extends React.Component<DefaultPageProps, DefaultPageState> {
    constructor(props: DefaultPageProps) {
        super(props);

        this.state = {
            articlesData: MOCK_ARTICLES_DATA
        };
    }

    render() {
        return (
            <div>
                <DefaultNavbar siteName={this.props.siteName} />

                <div id="main-body" className="container">
                    <ArticleListing articlesData={this.state.articlesData} />
                </div>
            </div>
        );
    }
}