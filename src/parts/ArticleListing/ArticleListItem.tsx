import * as React from 'react';

import ItemBox from '../ItemBox/ItemBox';

import * as util from '../../util';
import { CURRENT_SUBKEY, getSubOriginLink, isMegaSub } from '../../subdomains';
import { IGetArticleListData } from '../ApiCaller/ApiCaller.d';

import { defaultTheme as theme } from '../../style/themes';
import './ArticleListItem.css';

const titleStyle = theme.articleTitleStyle;

const megaSub = isMegaSub();

export interface IArticleListItemProps extends IGetArticleListData {
    key?: string;
}

export default function ArticleListItem(props: IArticleListItemProps) {
    const articleUrl = megaSub ? util.articleLink(props.articleUrlId, props.articleSub) : util.articleLink(props.articleUrlId);
    return (
        <ItemBox classNames="article-list-item">
            <a className="article-list-item__link" href={articleUrl}>
                <h3 className="article-list-item__title" style={titleStyle}>{props.articleTitle}</h3>
            </a>
            <a className="article-list-item__author" href={util.userPageLink(props.authorUsername)}>{props.authorName}</a>
            <ArticleSub articleSub={props.articleSub} />
            <p className="article-list-item__description">{props.articleDescription}</p>
            <p className="article-list-item__date"><span style={{color:'#555'}}>Updated </span>{util.minDateString(props.articleUpdatedAt)}</p>
        </ItemBox>
    );
}

interface IArticleSubProps {
    articleSub: string;
}

function ArticleSub(props: IArticleSubProps) {
    if (CURRENT_SUBKEY === props.articleSub) {
        return null;
    } else {
        const subHref = getSubOriginLink(props.articleSub);
        return (
            <a className="article-list-item__sub" href={subHref}>
                {props.articleSub}
            </a>
        )
    }
}