
import { AxiosResponse } from 'axios';

/*
 * ARTICLES
 */

export interface IArticleListData {
    articleId: string;
    articleTitle: string,
    articleDescription: string;
    articleDate: Date;
    articleSub: string;

    authorId: string;
    authorUsername: string;
    authorName: string;
}

export interface IGetArticlesListingResponse extends AxiosResponse {
    data: IArticleListData[];
}


export interface IArticleData extends IArticleListData {
    articleBody: string;    // html
}

export interface IArticlesDataMap {
    [articleId: string]: IArticleData;
}

export interface IGetArticleDataResponse extends AxiosResponse {
    data: IArticleData;
}

/*
 * USERS
 */

export interface IUserData {
    id: string,
    username: string,
    name: string,
    url: string
}

export interface IUsersDataMap { 
    [userId: string]: IUserData; 
}

export interface IGetUserDataResponse extends AxiosResponse {
    data: IUserData;
}