import axios, { AxiosPromise } from 'axios';

import {
    IGetArticleDataResponse,
    IGetArticlesListingResponse,
    ISuccessErrJsonResponse,
    IGetUserDataResponse
} from './ApiCaller.d';

import {
    mockResponse,
    MOCK_ARTICLES_DATA_IDMAP,
    MOCK_ARTICLES_DATA_URLIDMAP,
    MOCK_ARTICLES_LISTDATA,
    MOCK_USER_DATA
} from './ApiMockData';

import { isMegaSub } from '../../subdomains';
import { isLocalhost } from '../../util';
import apiConfig from './apiConfig';


let API_BASE: string;
if (isLocalhost()) {
    API_BASE = apiConfig.base.dev;
} else {
    API_BASE = apiConfig.base.prod;
}

const API_PATH = {
    articlesListing: apiPath('/article/listing'),
    articleData: apiPath('/article/data'),
    userData: apiPath('/user/data'),
    editorLogin: apiPath('/editor/login'),
    editorLogout: apiPath('/editor/logout')
}


function apiPath(subPath: string): string {
    return API_BASE + subPath;
}


// ARTICLES

interface IGetArticlesListingArgs {
    sub?: string;
    authorUsername?: string;
    authorId?: string;
}

export function getArticlesListing(args: IGetArticlesListingArgs): Promise<IGetArticlesListingResponse> {
    if (apiConfig.MOCK) {
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
    } else {
        // api
        // TODO: Replace with axios.get() method after backend established
        return axios.get(API_PATH.articlesListing);
    }
}

export function getArticleDataById(articleId: string): Promise<IGetArticleDataResponse> {
    if (apiConfig.MOCK) {
        // mock
        const response: IGetArticleDataResponse = mockResponse(MOCK_ARTICLES_DATA_IDMAP[articleId]);
        const promise = Promise.resolve(response) as AxiosPromise;
        return promise;
    } else {
        // api
        // TODO: Replace with axios.get() method after backend established
        // ARTICLE_DATA_PATH/:articleId
        const url = API_PATH.articleData + '/' + articleId;
        return axios.get(url);
    }
}

export function getArticleDataByUrlId(articleUrlId: string) {
    if (apiConfig.MOCK) {
        // mock
        const response: IGetArticleDataResponse = mockResponse(MOCK_ARTICLES_DATA_URLIDMAP[articleUrlId]);
        const promise = Promise.resolve(response) as AxiosPromise;
        return promise;
    } else {
        // api
        // ARTICLE_DATA_PATH?urlId=some-url-id
        return axios.get(API_PATH.articleData, { params: { urlId: articleUrlId } });
    }
}

// LOGIN
interface IEditorLoginConfig {
    username: string;
    password: string;
}
export function postEditorLogin(loginConfig: IEditorLoginConfig): Promise<ISuccessErrJsonResponse> {
    if (apiConfig.MOCK) {
        const response: ISuccessErrJsonResponse = mockResponse({ success: true, err: null });
        const promise = Promise.resolve(response) as AxiosPromise;
        return promise;
    } else {
        return axios.post(API_PATH.editorLogin, { username: loginConfig.username, password: loginConfig.password });
    }
}

export function postEditorLogout(username: string): Promise<ISuccessErrJsonResponse> {
    return axios.post(API_PATH.editorLogout, { username });
}

// USERS

export function getUserData(userId: string): Promise<IGetUserDataResponse> {
    if (apiConfig.MOCK) {
        // mock
        const response: IGetUserDataResponse = mockResponse(MOCK_USER_DATA[userId]);
        const promise = Promise.resolve(response) as AxiosPromise;
        return promise;
    } else {
        // api
        // TODO: Replace with axios.get() method after backend established
        // USER_DATA_PATH/:userId
        const url = API_PATH.userData + '/' + userId;
        return axios.get(url);
    }
}