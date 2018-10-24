
import { AxiosResponse } from 'axios';

/*
 * articles
 */

export interface IArticleListData {
    articleId: string;
    articleName: string,
    articleDescription: string;
    articleDate: Date;

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
 * users
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

/*export interface IAxiosResponse extends AxiosResponse {}
{
    data: Object,
    status: number,
    statusText: string,
    headers: Object,
    config: Object
};*/