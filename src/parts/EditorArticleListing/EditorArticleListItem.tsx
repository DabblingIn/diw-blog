import * as React from 'react';

import * as util from '../../util';
import { IGetArticleListData } from '../ApiCaller/ApiCaller.d';
import { isMegaSub } from '../../subdomains';

import { defaultTheme as theme } from '../../style/themes';
import './EditorArticleListItem.css';


export interface IEditorArticleListItemProps extends IGetArticleListData {}

export default class EditorArticleListItem extends React.Component<IEditorArticleListItemProps, {}> {
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
                <p className="editor-article-list-item__date">{util.minDateString(this.props.articleUpdatedAt)}</p>
            </div>
        );
    }
}


function editorArticleLink(articleId: string) {
    return '/editor/edit/' + articleId;
}