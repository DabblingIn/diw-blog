import * as React from 'react';

import * as util from '../../util';
import { getSubKey } from '../../subdomains';
import { IGetArticleListData } from '../ApiCaller/ApiCaller.d';

import { defaultTheme as theme } from '../../style/themes';
import './ArticleListItem.css';

const titleStyle = theme.articleTitleStyle;

const currentSub = getSubKey();

export interface IArticleListItemProps extends IGetArticleListData {}

export default function ArticleListItem(props: IArticleListItemProps) {
    return (
        <div className="article-list-item item-box">
            <a className="article-list-item__link" href={util.articleLink(props.articleUrlId)}>
                <h3 className="article-list-item__title" style={titleStyle}>{props.articleTitle}</h3>
            </a>
            <a className="article-list-item__author" href={util.userLink(props.authorId)}>{props.authorName}</a>
            <ArticleSub articleSub={props.articleSub} />
            <p className="article-list-item__description">{props.articleDescription}</p>
            <p className="article-list-item__date"><span style={{color:'#555'}}>Updated </span>{util.minDateString(props.articleUpdatedAt)}</p>
        </div>
    );
}

interface IArticleSubProps {
    articleSub: string;
}

function ArticleSub(props: IArticleSubProps) {
    if (currentSub === props.articleSub) {
        return null;
    } else {
        const subHref = 'http://' + props.articleSub + '.dabblingin.com';
        return (
            <a className="article-list-item__sub" href={subHref}>
                {props.articleSub}
            </a>
        )
    }
}