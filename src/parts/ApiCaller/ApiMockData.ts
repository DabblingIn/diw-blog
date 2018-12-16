import { AxiosResponse } from 'axios';

import {
    IGetArticleData,
    IGetArticleListData,
    IUsersDataMap,
    IArticlesDataIdMap,
    IArticlesDataUrlIdMap
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
const AUTHOR1_SITE = "http://google.com?q=tsmith";

const AUTHOR2_ID = "fhkjem56ybjbcbfghk";
const AUTHOR2_USERNAME = "abux";
const AUTHOR2_NAME = "Alfred Buxley";
const AUTHOR2_SITE = "http://google.com?q=abux";

const AUTHOR3_ID = "cnla4uat8se4ntsh";
const AUTHOR3_USERNAME = "martym";
const AUTHOR3_NAME = "Marty McFly";
const AUTHOR3_SITE = "http://google.com?q=martym";

const ARTICLE1_TAGS: string[] = ['cool', 'neat', 'great'];
const ARTICLE2_TAGS: string[] = ['red', 'blue', 'green'];
const ARTICLE3_TAGS: string[] = ['basketball', 'baseball', 'football'];

const ARTICLE1_DATE = new Date("1997-01-02 22:11");
const ARTICLE2_DATE = new Date("1997-03-12 14:19");
const ARTICLE3_DATE = new Date("1997-01-05 21:12");

const DEFAULT_PIC_URL = "https://via.placeholder.com/150";


const ARTICLE_ABC_LISTDATA: IGetArticleListData = {
    articleDescription: "This is article ABC",
    articleTitle: "Article ABC",
    articleId: "abc123",
    articleUrlId: "abc",
    articleSub: "web",
    articleUpdatedAt: ARTICLE1_DATE,

    authorId: AUTHOR1_ID,
    authorUsername: AUTHOR1_USERNAME,
    authorName: AUTHOR1_NAME,
    authorSite: AUTHOR1_SITE,
    authorPicture: DEFAULT_PIC_URL
};

const ARTICLE_DEF_LISTDATA: IGetArticleListData = {
    articleDescription: "This is article DEF",
    articleTitle: "Article DEF",
    articleId: "def123",
    articleUrlId: "def",
    articleSub: "web",
    articleUpdatedAt: ARTICLE2_DATE,

    authorId: AUTHOR2_ID,
    authorUsername: AUTHOR2_USERNAME,
    authorName: AUTHOR2_NAME,
    authorSite: AUTHOR2_SITE,
    authorPicture: DEFAULT_PIC_URL
};

const ARTICLE_XYZ_LISTDATA: IGetArticleListData = {
    articleDescription: "This is article XYZ",
    articleTitle: "Article XYZ",
    articleId: "xyz123",
    articleUrlId: "xyz",
    articleSub: "ml",
    articleUpdatedAt: ARTICLE3_DATE,

    authorId: AUTHOR3_ID,
    authorUsername: AUTHOR3_USERNAME,
    authorName: AUTHOR3_NAME,
    authorSite: AUTHOR3_SITE,
    authorPicture: DEFAULT_PIC_URL
};

const ARTICLE_ABC_DATA: IGetArticleData = Object.assign({}, 
    ARTICLE_ABC_LISTDATA,  
    { articleContent: "<h2>This is Article ABC</h2><p>Enjoy.</p>", articleTags: ARTICLE1_TAGS, articleCreatedAt: ARTICLE1_DATE });
const ARTICLE_DEF_DATA: IGetArticleData = Object.assign({}, 
    ARTICLE_DEF_LISTDATA,  
    { articleContent: "<h2>This is Article DEF</h2><p>Like it?</p>", articleTags: ARTICLE2_TAGS, articleCreatedAt: ARTICLE2_DATE });
const ARTICLE_XYZ_DATA: IGetArticleData = Object.assign({}, 
    ARTICLE_XYZ_LISTDATA,  
    { articleContent: "<h2>This is Article XYZ</h2><p>Pretty neat!</p>", articleTags: ARTICLE3_TAGS, articleCreatedAt: ARTICLE3_DATE });

export const MOCK_ARTICLES_LISTDATA: IGetArticleListData[] = [
    ARTICLE_ABC_LISTDATA,
    ARTICLE_DEF_LISTDATA,
    ARTICLE_XYZ_LISTDATA
];

// users
export const MOCK_USER_DATA: IUsersDataMap = {
    "lasdkjfh2o478h": {
        userId: AUTHOR1_ID,
        username: AUTHOR1_USERNAME,
        userDisplayName: AUTHOR1_NAME,
        userWebsite: AUTHOR1_SITE,
        userPictureUrl: DEFAULT_PIC_URL
    },
    "fhkjem56ybjbcbfghk": {
        userId: AUTHOR2_ID,
        username: AUTHOR2_USERNAME,
        userDisplayName: AUTHOR2_NAME,
        userWebsite: AUTHOR2_SITE,
        userPictureUrl: DEFAULT_PIC_URL
    },
    "cnla4uat8se4ntsh": {
        userId: AUTHOR3_ID,
        username: AUTHOR3_USERNAME,
        userDisplayName: AUTHOR3_NAME,
        userWebsite: AUTHOR3_SITE,
        userPictureUrl: DEFAULT_PIC_URL
    },
    
};

export interface IGetUserDataReturn {
    userId: string;           // user_account:id
    username: string;         // user_account:username
    userEmail: string;        // user_accout:email
    userPhone: string;        // user_account:phone_number
    userDisplayName: string;  // user_profile:display_name
    userPictureUrl: string;   // user_profile:picture
    userGender: string;       // user_profile:gender
    userLocation: string;     // user_profile:location
    userWebsite: string;      // user_profile:website
    userSince: Date;          // user_profile:created_at
}


export const MOCK_ARTICLES_DATA_IDMAP: IArticlesDataIdMap = {
    "abc123": ARTICLE_ABC_DATA,
    "def123": ARTICLE_DEF_DATA,
    "xyz123": ARTICLE_XYZ_DATA
};

export const MOCK_ARTICLES_DATA_URLIDMAP: IArticlesDataUrlIdMap = {
    "abc": ARTICLE_ABC_DATA,
    "def": ARTICLE_DEF_DATA,
    "xyz": ARTICLE_XYZ_DATA
};