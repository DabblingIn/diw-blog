//import axios from 'axios';

import { IArticleData, IGetAllArticlesDataResponse } from './ApiCaller.d';

const ApiCaller = {
    //functions
    getAllArticlesData
};

export default ApiCaller;

// mock
const MOCK_ARTICLES_DATA: IArticleData[] = [
    {
        articleDate: new Date(),
        articleDescription: "This is article ABC",
        articleName: "Article ABC",
        articleUrl: "/p/abc.html",

        authorName: "Tom Smith",
        authorUrl: "tomsmith.com"
    },
    {
        articleDate: new Date(),
        articleDescription: "This is article DEF",
        articleName: "Article DEF",
        articleUrl: "/p/def.html",

        authorName: "Alfred Buxley",
        authorUrl: "alfredbuxley.com"
    },
    {
        articleDate: new Date(),
        articleDescription: "This is article XYZ",
        articleName: "Article XYZ",
        articleUrl: "/p/xyz.html",

        authorName: "Marty McFly",
        authorUrl: "martymcfly.com"
    }
];


// functions
function getAllArticlesData(callback: (response: IGetAllArticlesDataResponse) => void): void {
    // TODO: Replace with axios.get() method after backend established
    const response: IGetAllArticlesDataResponse = {
        data: MOCK_ARTICLES_DATA,
        status: 100,
        statusText: "OK",
        headers: {},
        config: {}
    };
    callback(response);
}