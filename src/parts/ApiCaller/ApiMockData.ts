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

const ARTICLE_ABC_LISTDATA = {
    articleDate: new Date("1997-01-02 22:11"),
    articleDescription: "This is article ABC",
    articleTitle: "Article ABC",
    articleId: "abc",
    articleSub: "web",

    authorId: "lasdkjfh2o478h",
    authorUsername: "tsmith",
    authorName: "Tom Smith"
};

const ARTICLE_DEF_LISTDATA = {
    articleDate: new Date("1997-03-12 14:19"),
    articleDescription: "This is article DEF",
    articleTitle: "Article DEF",
    articleId: "def",
    articleSub: "web",

    authorId: "fhkjem56ybjbcbfghk",
    authorUsername: "abux",
    authorName: "Alfred Buxley"
};

const ARTICLE_XYZ_LISTDATA = {
    articleDate: new Date("1997-01-05 21:12"),
    articleDescription: "This is article XYZ",
    articleTitle: "Article XYZ",
    articleId: "xyz",
    articleSub: "ml",

    authorId: "cnla4uat8se4ntsh",
    authorUsername: "martym",
    authorName: "Marty McFly"
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
        id: "lasdkjfh2o478h",
        username: "tsmith",
        name: "Tom Smith",
        url: "http://google.com?q=tsmith"
    },
    "fhkjem56ybjbcbfghk": {
        id: "fhkjem56ybjbcbfghk",
        username: "abux",
        name: "Alfred Buxley",
        url: "http://google.com?q=abux"
    },
    "cnla4uat8se4ntsh": {
        id: "cnla4uat8se4ntsh",
        username: "martym",
        name: "MartyMcFly",
        url: "http://google.com?q=martym"
    },
    
};


export const MOCK_ARTICLES_DATA: IArticlesDataMap = {
    "abc": ARTICLE_ABC_DATA,

    /*{
        articleDate: new Date("1997-01-02 22:11"),
        articleDescription: "This is article ABC",
        articleTitle: "Article ABC",
        articleId: "abc",
        articleSub: "web",

        authorId: "lasdkjfh2o478h",
        authorUsername: "tsmith",
        authorName: "Tom Smith"
        articleBody: "<h2>This is Article ABC</h2><p>Enjoy.</p>"
    },*/
    "def": ARTICLE_DEF_DATA,

    /*{
        articleDate: new Date("1997-03-12 14:19"),
        articleDescription: "This is article DEF",
        articleTitle: "Article DEF",
        articleId: "def",
        articleSub: "web",

        authorId: "abux",
        articleBody: "<h2>This is Article DEF</h2><p>Like it?</p>"
    },*/
    "xyz": ARTICLE_XYZ_DATA

    /*{
        articleDate: new Date("1997-01-05 21:12"),
        articleDescription: "This is article XYZ",
        articleTitle: "Article XYZ",
        articleId: "xyz",
        articleSub: "ml",

        authorId: "martym",
        articleBody: "<h2>This is Article XYZ</h2><p>Pretty neat!</p>"
    }*/
};