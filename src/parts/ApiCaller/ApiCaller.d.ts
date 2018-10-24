
import { AxiosResponse } from 'axios';

/*
 * ARTICLES
 */

export interface IArticleListData {
    articleId: string;
    articleName: string,
    articleDescription: string;
    articleDate: Date;
    articleSub: string;

    authorId: string;
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
    name: string,
    url: string
}

export interface IUsersDataMap { 
    [userId: string]: IUserData; 
}

export interface IGetUserDataResponse extends AxiosResponse {
    data: IUserData;
}