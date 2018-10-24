import { AxiosPromise } from 'axios';

import { 
    IGetArticlesListingResponse,
    IGetUserDataResponse,
    IGetArticleDataResponse
} from './ApiCaller.d';

import {
    mockResponse,
    MOCK_ARTICLES_DATA,
    MOCK_ARTICLES_LISTDATA,
    MOCK_USER_DATA
} from './ApiMockData';

const ApiCaller = {
    // articles
    getArticlesListing,
    getArticleData,

    // users
    getUserData
};

export default ApiCaller;


// articles

//callback: (response: IGetArticlesListingResponse) => void
function getArticlesListing(): Promise<IGetArticlesListingResponse> {
    // mock
    const response: IGetArticlesListingResponse = mockResponse(MOCK_ARTICLES_LISTDATA);
    const promise = Promise.resolve(response) as AxiosPromise;// as AxiosPromise<IGetArticlesListingResponse>;
    return promise;

    // TODO: Replace with axios.get() method after backend established
}

function getArticleData(articleId: string): Promise<IGetArticleDataResponse> {
    // mock
    const response: IGetArticleDataResponse = mockResponse(MOCK_ARTICLES_DATA[articleId]);
    const promise = Promise.resolve(response) as AxiosPromise;
    return promise;

    // TODO: Replace with axios.get() method after backend established
}

// users

//callback: (response: IGetUserDataResponse) => void
function getUserData(userId: string): Promise<IGetUserDataResponse> {
    // mock
    const response: IGetUserDataResponse = mockResponse(MOCK_USER_DATA[userId]);
    const promise = Promise.resolve(response) as AxiosPromise;
    return promise;

    // TODO: Replace with axios.get() method after backend established
}