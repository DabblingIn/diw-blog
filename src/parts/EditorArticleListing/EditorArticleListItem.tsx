import * as React from 'react';

import * as util from '../../util';
import { deleteArticleById } from '../ApiCaller/ApiCaller';
import { IGetArticleListData } from '../ApiCaller/ApiCaller.d';
import { isMegaSub } from '../../subdomains';

import { defaultTheme as theme } from '../../style/themes';
import './EditorArticleListItem.css';


export interface IEditorArticleListItemProps extends IGetArticleListData {}

export interface IEditorArticleListItemState {
    showDeletePopup: boolean;
}

export default class EditorArticleListItem extends React.Component<IEditorArticleListItemProps, IEditorArticleListItemState> {
    public constructor(props: IEditorArticleListItemProps) {
        super(props);

        this.state = {
            showDeletePopup: false
        }

        this.clickDelete = this.clickDelete.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.toggleDeletePopup = this.toggleDeletePopup.bind(this);
    }

    public render() {
        const aSub = this.props.articleSub;
        const subHref = isMegaSub(aSub) ? 'http://dabblingin.com' : 'http://' + aSub + '.dabblingin.com';
        return (
            <div className="editor-article-list-item" style={theme.itemBoxStyle}>
                <a className="editor-article-list-item__link" href={editorArticleLink(this.props.articleId)}>
                    <h3 className="editor-article-list-item__title" style={theme.articleTitleStyle}>{this.props.articleTitle}</h3>
                </a>
                <a className="editor-article-list-item__author" href={util.userLink(this.props.authorId)}>{this.props.authorName}</a>
                <a className="editor-article-list-item__sub" href={subHref}>
                    {aSub}
                </a>
                <p className="editor-article-list-item__description">{this.props.articleDescription}</p>
                <div>
                    <div className="editor-article-list-item__date"><span style={{color:'#555'}}>Updated </span>{util.minDateString(this.props.articleUpdatedAt)}</div>
                    &nbsp;&nbsp;
                    <div className="editor-article-list-item__date"><span style={{color:'#555'}}>Created </span>{util.minDateString(this.props.articleCreatedAt)}</div>
                </div>

                <button className="editor-article-list-item__delete-button" onClick={this.clickDelete}>Delete</button>
                <div className="editor-article-list-item_delete-popup-container"
                    style={this.state.showDeletePopup ? undefined : {display: "none"}}>
                    <EditorArticleListItemDeletePopup
                        articleTitle={this.props.articleTitle}
                        articleUrlId={this.props.articleUrlId}
                        deleteArticle={this.deleteArticle}
                        togglePopup={this.toggleDeletePopup}
                    />
                </div>
            </div>
        );
    }

    protected deleteArticle() {
        deleteArticleById(this.props.articleId)
            .then(({ data: res }) => {
                const { success, err } = res;
                if (success) {
                    // Successful delete
                    window.location.reload();
                } else {
                    // Failed delete
                    alert(err);
                }
            })
            .catch((err) => {
                alert("Network Issue.  Try again later.");
            });
    }

    protected toggleDeletePopup(show: boolean) {
        this.setState({
            showDeletePopup: show
        })
    }

    private clickDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        // Asks for confirmation
        this.toggleDeletePopup(true);
    }
}

/* List Item Delete Popup */

interface IEditorArticleListItemDeletePopupProps {
    articleTitle: string;
    articleUrlId: string;
    deleteArticle: ()=>void;
    togglePopup: (show: boolean)=>void;
}

class EditorArticleListItemDeletePopup extends React.Component<IEditorArticleListItemDeletePopupProps,{}> {
    public constructor(props: any) {
        super(props);

        this.clickNo = this.clickNo.bind(this);
        this.clickYes = this.clickYes.bind(this);
    }

    public render() {
        const { articleTitle, articleUrlId } = this.props;
        return (
            <div className="editor-article-list-item_delete-popup" style={theme.itemBoxStyle}>
                <h2>Are you sure you want to delete "{articleTitle}"
                    (<a href={util.articleLink(articleUrlId)}>{articleUrlId}</a>)?</h2>
                <div>
                    <button
                        onClick={this.clickYes}
                        className="editor-article-list-item_delete-popup__button"
                        style={{ backgroundColor: "#c11", color: "white" }}>
                        Yes
                    </button>
                    <button
                        onClick={this.clickNo}
                        className="editor-article-list-item_delete-popup__button">
                        No
                    </button>
                </div>
            </div>
        )
    }

    private clickNo(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        // hides popup
        this.props.togglePopup(false);
    }

    private clickYes(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        // executes delete
        this.props.deleteArticle();

        // hides popup
        this.props.togglePopup(false);
    }
}


function editorArticleLink(articleId: string) {
    return '/editor/edit/' + articleId;
}
