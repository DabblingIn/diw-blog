import { AxiosResponse } from 'axios';

import { 
    IArticleListData,
    IUsersDataMap,
    IArticlesDataMap
} from './ApiCaller.d';

/*
 * mock
 */

export function mockResponse(data: any): AxiosResponse {
    return {
        data,
        status: 100,
        statusText: "OK",
        headers: {},
        config: {}
    };
}

// articles
const AUTHOR1_ID = "lasdkjfh2o478h";
const AUTHOR1_USERNAME = "tsmith";
const AUTHOR1_NAME = "Tom Smith";
const AUTHOR1_URL = "http://google.com?q=tsmith";

const AUTHOR2_ID = "fhkjem56ybjbcbfghk";
const AUTHOR2_USERNAME = "abux";
const AUTHOR2_NAME = "Alfred Buxley";
const AUTHOR2_URL = "http://google.com?q=abux";

const AUTHOR3_ID = "cnla4uat8se4ntsh";
const AUTHOR3_USERNAME = "martym";
const AUTHOR3_NAME = "Marty McFly";
const AUTHOR3_URL = "http://google.com?q=martym";


const ARTICLE_ABC_LISTDATA = {
    articleDate: new Date("1997-01-02 22:11"),
    articleDescription: "This is article ABC",
    articleTitle: "Article ABC",
    articleId: "abc",
    articleSub: "web",

    authorId: AUTHOR1_ID,
    authorUsername: AUTHOR1_USERNAME,
    authorName: AUTHOR1_NAME
};

const ARTICLE_DEF_LISTDATA = {
    articleDate: new Date("1997-03-12 14:19"),
    articleDescription: "This is article DEF",
    articleTitle: "Article DEF",
    articleId: "def",
    articleSub: "web",

    authorId: AUTHOR2_ID,
    authorUsername: AUTHOR2_USERNAME,
    authorName: AUTHOR2_NAME
};

const ARTICLE_XYZ_LISTDATA = {
    articleDate: new Date("1997-01-05 21:12"),
    articleDescription: "This is article XYZ",
    articleTitle: "Article XYZ",
    articleId: "xyz",
    articleSub: "ml",

    authorId: AUTHOR3_ID,
    authorUsername: AUTHOR3_USERNAME,
    authorName: AUTHOR3_NAME
};

const ARTICLE_ABC_DATA = Object.assign({}, ARTICLE_ABC_LISTDATA,  { articleBody: "<h2>This is Article ABC</h2><p>Enjoy.</p>" });
const ARTICLE_DEF_DATA = Object.assign({}, ARTICLE_DEF_LISTDATA,  { articleBody: "<h2>This is Article DEF</h2><p>Like it?</p>" });
const ARTICLE_XYZ_DATA = Object.assign({}, ARTICLE_XYZ_LISTDATA,  { articleBody: "<h2>This is Article XYZ</h2><p>Pretty neat!</p>" });

export const MOCK_ARTICLES_LISTDATA: IArticleListData[] = [
    ARTICLE_ABC_LISTDATA,
    ARTICLE_DEF_LISTDATA,
    ARTICLE_XYZ_LISTDATA
];

// users
export const MOCK_USER_DATA: IUsersDataMap = {
    "lasdkjfh2o478h": {
        id: AUTHOR1_ID,
        username: AUTHOR1_USERNAME,
        name: AUTHOR1_NAME,
        url: AUTHOR1_URL
    },
    "fhkjem56ybjbcbfghk": {
        id: AUTHOR2_ID,
        username: AUTHOR2_USERNAME,
        name: AUTHOR2_NAME,
        url: AUTHOR2_URL
    },
    "cnla4uat8se4ntsh": {
        id: AUTHOR3_ID,
        username: AUTHOR3_USERNAME,
        name: AUTHOR3_NAME,
        url: AUTHOR3_URL
    },
    
};


export const MOCK_ARTICLES_DATA: IArticlesDataMap = {
    "abc": ARTICLE_ABC_DATA,
    "def": ARTICLE_DEF_DATA,
    "xyz": ARTICLE_XYZ_DATA
};