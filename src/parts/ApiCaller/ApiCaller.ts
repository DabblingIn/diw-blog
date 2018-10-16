import { AxiosResponse } from 'axios';

import { IArticleListData, IGetArticlesListingResponse, IUserData, IGetUserDataResponse } from './ApiCaller.d';

const ApiCaller = {
    // articles
    getArticlesListing,

    // users
    getUserData
};

export default ApiCaller;

/*
 * mock
 */

function mockResponse(data: any): AxiosResponse {
    return {
        data,
        status: 100,
        statusText: "OK",
        headers: {},
        config: {}
    };
}

// articles

const MOCK_ARTICLES_DATA: IArticleListData[] = [
    {
        articleDate: new Date(),
        articleDescription: "This is article ABC",
        articleName: "Article ABC",
        articleId: "abc",

        authorId: "tsmith",
        //authorName: "Tom Smith"
    },
    {
        articleDate: new Date(),
        articleDescription: "This is article DEF",
        articleName: "Article DEF",
        articleId: "def",

        authorId: "abux",
        //authorName: "Alfred Buxley"
    },
    {
        articleDate: new Date(),
        articleDescription: "This is article XYZ",
        articleName: "Article XYZ",
        articleId: "xyz",

        authorId: "martym",
        //authorName: "Marty McFly"
    }
];

// users
const MOCK_USER_DATA: { [id: string]: IUserData; } = {
    "tsmith": {
        id: "tsmith",
        name: "Tom Smith"
    },
    "abux": {
        id: "abux",
        name: "Alfred Buxley"
    },
    "martym": {
        id: "martym",
        name: "MartyMcFly"
    },
    
};

/*
 * functions
 */

// articles

function getArticlesListing(callback: (response: IGetArticlesListingResponse) => void): void {
    // TODO: Replace with axios.get() method after backend established
    const response: IGetArticlesListingResponse = mockResponse(MOCK_ARTICLES_DATA);
    callback(response);
}

// users
function getUserData(userId: string, callback: (response: IGetUserDataResponse) => void): void {
    const response: IGetUserDataResponse = mockResponse(MOCK_USER_DATA[userId]);
    callback(response);
}