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

import { isMegaSub } from '../../subdomains';

const ApiCaller = {
    // ARTICLES
    getArticlesListing,
    getArticleData,

    // USERS
    getUserData
};

export default ApiCaller;


// ARTICLES

//callback: (response: IGetArticlesListingResponse) => void
function getArticlesListing(articleSub?: string): Promise<IGetArticlesListingResponse> {
    // mock
    let listing = MOCK_ARTICLES_LISTDATA;
    if (articleSub !== undefined && !isMegaSub(articleSub))  {
        listing = listing.filter(articleLD => (articleLD.articleSub === articleSub));
    }
    const response: IGetArticlesListingResponse = mockResponse(listing);
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

// USERS

//callback: (response: IGetUserDataResponse) => void
function getUserData(userId: string): Promise<IGetUserDataResponse> {
    // mock
    const response: IGetUserDataResponse = mockResponse(MOCK_USER_DATA[userId]);
    const promise = Promise.resolve(response) as AxiosPromise;
    return promise;

    // TODO: Replace with axios.get() method after backend established
}