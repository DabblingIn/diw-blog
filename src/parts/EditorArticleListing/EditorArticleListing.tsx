
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
    showNewArticlePopup: boolean;
};


export default class EditorArticleListing extends React.Component<IEditorArticleListingProps, IEditorArticleListingState> {
    constructor(props: IEditorArticleListingProps) {
        super(props);

        this.state = {
            articlesListData: [],
            username: "",
            showNewArticlePopup: false
        };

        this.clickNewArticle = this.clickNewArticle.bind(this);
        this.toggleNewArticlePopup = this.toggleNewArticlePopup.bind(this);
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
                        <h1 className="editor-article-listing__header">Editor</h1>
                        <h2 className="editor-article-listing__user-header">{this.state.username}</h2>
                    </div>
                    <div className="editor-article-listing__topbox">
                        <button
                            className="editor-article-listing__new-article-button"
                            onClick={this.clickNewArticle}
                        >
                            New Article
                        </button>
                    </div>
                </div>
                <div className="editor-article-listing__new-article-popup-container"
                     style={this.state.showNewArticlePopup ? undefined : { display: "none" }}>
                    <NewArticlePopup/>
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

    protected clickNewArticle(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();

        this.toggleNewArticlePopup(true);
    }

    protected toggleNewArticlePopup(showPopup: boolean): void {
        this.setState({
            showNewArticlePopup: showPopup
        });
        console.log('showPopup:', showPopup);
    }
}


// 'New Article' Popup
interface INewArticlePopupProps {}

function NewArticlePopup(props: INewArticlePopupProps) {
    return (
        <div className="editor-article-listing__new-article-popup item-box">
            <h2 className="editor-article-listing__new-article-popup__title">
                Which Editor Would You Like?
            </h2>
            <Link to="/editor/new/md">
                <button className="editor-article-listing__new-article-popup__button">
                    Markdown
                </button>
            </Link>
            <Link to="/editor/new/html">
                <button className="editor-article-listing__new-article-popup__button">
                    HTML
                </button>
            </Link>
        </div>
    )
}