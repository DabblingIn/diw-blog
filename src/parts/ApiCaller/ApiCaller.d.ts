
import { AxiosResponse } from 'axios';

// ApiCaller definitions
export interface IArticleData {
    articleName: string,
    articleDescription: string;
    articleDate: Date;
    articleUrl: string;

    authorName: string;
    authorUrl: string;
}

/*export interface IAxiosResponse extends AxiosResponse {}
{
    data: Object,
    status: number,
    statusText: string,
    headers: Object,
    config: Object
};*/

export interface IGetAllArticlesDataResponse extends AxiosResponse {
    data: IArticleData[];
}