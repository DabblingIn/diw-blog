import axios, { AxiosPromise } from 'axios';

import {
    IGetArticleDataResponse,
    IPostArticleDataQuery,
    IPostArticleDataResponse,
    IUpdateArticleDataQuery,
    IPutArticleDataResponse,
    IDeleteArticleByIdResponse,
    IGetArticlesListingResponse,
    ISuccessErrJsonResponse,

    IEditorLoginQuery,
    IEditorLoginDataResponse,
    IGetEditorSessionDataResponse,

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
    newArticle: apiPath('/article/new'),
    articleData: apiPath('/article/data'),
    userData: apiPath('/user/data'),
    editorLogin: apiPath('/editor/login'),
    editorLogout: apiPath('/editor/logout'),
    editorSessionData: apiPath('/editor/session'),
}


function apiPath(subPath: string): string {
    return API_BASE + subPath;
}

// WITH CREDENTIALS
//axios.defaults.withCredentials = true;    // TODO: Keep?

const WITH_CRED = { withCredentials: true }; // set withCredentials to true (shorthand)
function wCred(config?: object) {
    // combines given axios config with withCredentials: true
    return Object.assign({}, WITH_CRED, config);
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
        let urlPath = API_PATH.articlesListing;
        let urlQuery = {};
        const nonMegaSub = args.sub && !isMegaSub(args.sub);
        if (args.authorId || args.authorUsername) {
            if (nonMegaSub) {
                urlQuery = { sub: args.sub };
            }

            if (args.authorId) {
                urlPath += "/author/id/" + args.authorId;
            } else {
                urlPath += "/author/username/" + args.authorUsername;
            }
        } else if (nonMegaSub) {
            urlPath += "/sub/" + args.sub;
        }
        return axios.get(urlPath, wCred({ params: urlQuery }));
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
        // ARTICLE_DATA_PATH/id/:articleId
        const url = API_PATH.articleData + '/id/' + articleId;
        return axios.get(url, wCred());
    }
}

export function updateArticleData(articleId: string, updatedArticleData: IUpdateArticleDataQuery): Promise<IPutArticleDataResponse> {
    // api
    const url = API_PATH.articleData + '/id/' + articleId;
    return axios.put(
        url,
        updatedArticleData,
        wCred());
}

export function postNewArticle(newArticleData: IPostArticleDataQuery): Promise<IPostArticleDataResponse> {
    // api
    return axios.post(
            API_PATH.newArticle,
            newArticleData,
            wCred());
}

export function deleteArticleById(articleId: string): Promise<IDeleteArticleByIdResponse> {
    // api
    return axios.delete(API_PATH.articleData + '/id/' + articleId);
}

export function getArticleDataByUrlId(articleUrlId: string): Promise<IGetArticleDataResponse> {
    if (apiConfig.MOCK) {
        // mock
        const response: IGetArticleDataResponse = mockResponse(MOCK_ARTICLES_DATA_URLIDMAP[articleUrlId]);
        const promise = Promise.resolve(response) as AxiosPromise;
        return promise;
    } else {
        // api
        // ARTICLE_DATA_PATH/urlId/some-url-id
        return axios.get(API_PATH.articleData + "/urlId/" + articleUrlId);
    }
}

// Editor: SESSION / LOGIN

export function postEditorLogin(loginConfig: IEditorLoginQuery): Promise<IEditorLoginDataResponse> {
    if (apiConfig.MOCK) {
        const response: IEditorLoginDataResponse = mockResponse({
             success: true,
             err: null,
             data: { userId: "258c1fe9-3d24-46d4-a874-597a6e5bb284" } // user0
         });
        const promise = Promise.resolve(response) as AxiosPromise;
        return promise;
    } else {
        return axios.post(API_PATH.editorLogin, { username: loginConfig.username, password: loginConfig.password }, wCred());
    }
}

export function postEditorLogout(): Promise<ISuccessErrJsonResponse> {
    return axios.post(API_PATH.editorLogout, {}, wCred());
}


export function getEditorSessionData(): Promise<IGetEditorSessionDataResponse> {
    return axios.get(API_PATH.editorSessionData, wCred());
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
        const url = API_PATH.userData + '/' + userId;
        return axios.get(url, wCred());
    }
}