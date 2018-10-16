
import { AxiosResponse } from 'axios';

/*
 * articles
 */

export interface IArticleListData {
    articleName: string,
    articleDescription: string;
    articleDate: Date;
    articleId: string;

    authorId: string;
}

export interface IArticleData extends IArticleListData {
    articleName: string,
    articleDescription: string;
    articleDate: Date;
    articleId: string;
}

export interface IGetArticlesListingResponse extends AxiosResponse {
    data: IArticleListData[];
}

/*
 * users
 */

export interface IUserData {
    id: string,
    name: string
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