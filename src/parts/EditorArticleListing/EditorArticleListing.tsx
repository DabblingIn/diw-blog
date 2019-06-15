
import * as React from 'react';
import { Link } from 'react-router-dom';

import EditorArticleListItem, { IEditorArticleListItemProps } from './EditorArticleListItem';
import * as ApiCaller from '../ApiCaller/ApiCaller';
import { IGetArticlesListingResponse, IGetArticleListData } from '../ApiCaller/ApiCaller.d';
import * as util from '../../util';
import { getSubKey } from '../../subdomains';

import './EditorArticleListing.css';

export interface IEditorArticleListingProps {
    authorId: string;
};

export interface IEditorArticleListingState {
    articlesListData: IGetArticleListData[];
    username: string;
};


export default class EditorArticleListing extends React.Component<IEditorArticleListingProps, IEditorArticleListingState> {
    constructor(props: IEditorArticleListingProps) {
        super(props);

        this.state = {
            articlesListData: [],
            username: ""
        };
    }

    public componentDidMount() {
        const subKey = getSubKey();
        ApiCaller
            .getArticlesListing({ sub: subKey, authorId: this.props.authorId })    // gets articles based on subdomain
            .then((res: IGetArticlesListingResponse) => {
                const articlesListData = util.sortArticleListingByCreated(res.data.data);
                // TODO: const articlesListErr: string = res.data.err;
                this.setState({
                    articlesListData
                });
            })
            //.catch();
        ApiCaller
            .getUserData(this.props.authorId)
            .then(({ data: resData }) => {
                const { err, data } = resData;
                const { username } = data;
                if (err) {
                    // TODO: user fetch err
                }
                this.setState({
                    username
                })
            })
            //.catch()
    }

    public render() {
        return (
            <div>
                <div>
                    <div className="editor-article-listing__topbox">
                        <h1 className="editor-article-listing__header">Editor: Articles</h1>
                        <h2 className="editor-article-listing__user-header">{this.state.username}</h2>
                    </div>
                    <div className="editor-article-listing__topbox">
                        <Link to="/editor/new">
                            <button className="editor-article-listing__new-article-button">New Article</button>
                        </Link>
                    </div>
                </div>
                <section className="editor-article-listing">
                {
                    this.state.articlesListData.reverse().map((articleListData:  IGetArticleListData ) => {
                        const articleListItemProps: IEditorArticleListItemProps = articleListData;
                        return (<EditorArticleListItem key={util.articleLink(articleListData.articleId)} {...articleListItemProps}/>);
                    })
                }
                </section>
            </div>
        );
    }
}