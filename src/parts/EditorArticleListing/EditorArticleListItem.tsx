import * as React from 'react';

import * as util from '../../util';
import { deleteArticleById } from '../ApiCaller/ApiCaller';
import { IGetArticleListData } from '../ApiCaller/ApiCaller.d';
import { isMegaSub } from '../../subdomains';

import { defaultTheme as theme } from '../../style/themes';
import './EditorArticleListItem.css';


export interface IEditorArticleListItemProps extends IGetArticleListData {}

export default class EditorArticleListItem extends React.Component<IEditorArticleListItemProps, {}> {
    public constructor(props: IEditorArticleListItemProps) {
        super(props);

        this.clickDelete = this.clickDelete.bind(this);
    }

    public clickDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        // Without asking
        deleteArticleById(this.props.articleId)
            .then(({ data: res }) => {
                const { success, err } = res;
                if (success) {
                    // Successful delete
                    location.reload();
                } else {
                    // Failed delete
                    alert("Backend Message: " + err);
                }
            })
            .catch((err) => {
                alert("Frontend Err: " + err);
            });
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
                <p className="editor-article-list-item__date"><span style={{color:'#555'}}>Updated </span>{util.minDateString(this.props.articleUpdatedAt)}</p>

                {/*Delete Button*/}
                <button onClick={this.clickDelete}>Delete</button>
            </div>
        );
    }
}


function editorArticleLink(articleId: string) {
    return '/editor/edit/' + articleId;
}