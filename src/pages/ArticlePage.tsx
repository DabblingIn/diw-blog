import * as React from 'react';

import DefaultNavbar from '../parts/DefaultNavbar/DefaultNavbar';

import { defaultTheme as theme } from '../style/themes';

import './ArticlePage.css';


interface IArticlePageState {
    
};

interface IArticlePageProps {
    siteName: string;
};


const MARGIN_TOPBOTTOM: number = 20;

const articlePageStyle = {
  marginTop: theme.navbarHeight + MARGIN_TOPBOTTOM,
  marginBottom: MARGIN_TOPBOTTOM
};


export default class ArticlePage extends React.Component<IArticlePageProps, IArticlePageState> {

    public render() {
        return (
            <div className="article-page" style={articlePageStyle}>
                <DefaultNavbar siteName={this.props.siteName} />

                <div>
                    {/*article data/body*/}
                </div>
            </div>
        );
    }
}