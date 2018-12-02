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

interface IGetArticlesListingArgs {
    sub?: string;
    authorUsername?: string;
    authorId?: string;
}

function getArticlesListing(args: IGetArticlesListingArgs): Promise<IGetArticlesListingResponse> {
    // mock
    let listing = MOCK_ARTICLES_LISTDATA;
    if (args.sub !== undefined && !isMegaSub(args.sub))  {
        listing = listing.filter(articleLD => (articleLD.articleSub === args.sub));
    }

    if (args.authorId !== undefined) {
        listing = listing.filter(articleLD => (articleLD.authorId === args.authorId));
    }

    if (args.authorUsername !== undefined) {
        listing = listing.filter(articleLD => (articleLD.authorUsername === args.authorUsername));
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

function getUserData(userId: string): Promise<IGetUserDataResponse> {
    // mock
    const response: IGetUserDataResponse = mockResponse(MOCK_USER_DATA[userId]);
    const promise = Promise.resolve(response) as AxiosPromise;
    return promise;

    // TODO: Replace with axios.get() method after backend established
}