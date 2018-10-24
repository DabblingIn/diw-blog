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

export const MOCK_ARTICLES_LISTDATA: IArticleListData[] = [
    {
        articleDate: new Date(),
        articleDescription: "This is article ABC",
        articleName: "Article ABC",
        articleId: "abc",
        articleSub: "web",

        authorId: "tsmith",
        //authorName: "Tom Smith"
    },
    {
        articleDate: new Date(),
        articleDescription: "This is article DEF",
        articleName: "Article DEF",
        articleId: "def",
        articleSub: "web",

        authorId: "abux",
        //authorName: "Alfred Buxley"
    },
    {
        articleDate: new Date(),
        articleDescription: "This is article XYZ",
        articleName: "Article XYZ",
        articleId: "xyz",
        articleSub: "ml",

        authorId: "martym",
        //authorName: "Marty McFly"
    }
];

// users
export const MOCK_USER_DATA: IUsersDataMap = {
    "tsmith": {
        id: "tsmith",
        name: "Tom Smith",
        url: "http://google.com?q=tsmith"
    },
    "abux": {
        id: "abux",
        name: "Alfred Buxley",
        url: "http://google.com?q=abux"
    },
    "martym": {
        id: "martym",
        name: "MartyMcFly",
        url: "http://google.com?q=martym"
    },
    
};


export const MOCK_ARTICLES_DATA: IArticlesDataMap = {
    abc: {
        articleDate: new Date("1997-01-02 22:11"),
        articleDescription: "This is article ABC",
        articleName: "Article ABC",
        articleId: "abc",
        articleSub: "web",

        authorId: "tsmith",
        articleBody: "<h2>This is Article ABC</h2><p>Enjoy.</p>"
    },
    def: {
        articleDate: new Date("1997-03-12 14:19"),
        articleDescription: "This is article DEF",
        articleName: "Article DEF",
        articleId: "def",
        articleSub: "web",

        authorId: "abux",
        articleBody: "<h2>This is Article DEF</h2><p>Like it?</p>"
    },
    xyz: {
        articleDate: new Date("1997-01-05 21:12"),
        articleDescription: "This is article XYZ",
        articleName: "Article XYZ",
        articleId: "xyz",
        articleSub: "ml",

        authorId: "martym",
        articleBody: "<h2>This is Article XYZ</h2><p>Pretty neat!</p>"
    }
};