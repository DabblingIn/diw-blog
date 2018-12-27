
import { AxiosResponse } from 'axios';


/*
 * DEFAULT API RESPONSE FORMAT
 */

export interface IDefaultJsonReturn<T> {
    err: string;
    data: T;
}

export interface ISuccessErrJsonReturn {
    success: boolean;      // whether attempt was successful
    err: string | null;    // error message (if any)
}

export interface ISuccessErrDataJsonReturn<T> {
    success: boolean;      // whether attempt was successful
    err: string | null;    // error message (if any)
    data?: T;              // accompanying relevant response data
}

export interface ISuccessErrJsonResponse extends AxiosResponse<ISuccessErrJsonReturn> {}
export interface ISuccessErrDataJsonResponse<T> extends AxiosResponse<ISuccessErrDataJsonReturn<T>> {}

/*
 * ARTICLES
 */

/*export interface IArticleListData {
    articleId: string;
    articleTitle: string,
    articleDescription: string;
    articleDate: Date;
    articleSub: string;

    authorId: string;
    authorUsername: string;
    authorName: string;
}*/

export interface IGetArticleData {
    articleId: string;            // article:id
    articleUrlId: string;         // article:url_id
    articleTitle: string,         // article:title
    articleDescription: string;   // article:description
    articleSub: string;           // article:sub
    articleUpdatedAt: Date;       // article:updated_at
    articleTags: string[];        // article_tag:name (GROUP BY)
    articleCreatedAt: Date;       // article:created_at
    articleContent: string;       // article:content

    authorId: string;             // user_account:id
    authorUsername: string;       // user_account:username
    authorName: string;           // user_profile:display_name
    authorSite: string;           // user_profile:website
    authorPicture: string;        // user_profile:picture
}


export interface IGetArticleListData {
    articleId: string;            // article:id
    articleUrlId: string;         // article:url_id
    articleTitle: string,         // article:title
    articleDescription: string;   // article:description
    articleSub: string;           // article:sub
    articleUpdatedAt: Date;       // article:updated_at

    authorId: string;             // user_account:id
    authorUsername: string;       // user_account:username
    authorName: string;           // user_profile:display_name
    authorSite: string;           // user_profile:website
    authorPicture: string;        // user_profile:picture
}




export interface IGetArticlesListingResponse extends AxiosResponse<IDefaultJsonReturn<IGetArticleListData[]>> {}


/*export interface IArticleData extends IArticleListData {
    articleBody: string;    // html
}*/

export interface IArticlesDataIdMap {
    [articleId: string]: IGetArticleData;
}

export interface IArticlesDataUrlIdMap {
    [articleUrlId: string]: IGetArticleData;
}

export interface IGetArticleDataResponse extends AxiosResponse<IDefaultJsonReturn<IGetArticleData>> {}


/*
 * USERS
 */

 // data: GET
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

// data: UPDATE
export interface IUpdateUserDataQuery {
    userId: string;            // user_account:id
    username?: string;         // user_account:username
    userEmail?: string;        // user_accout:email
    userPhone?: string;        // user_account:phone_number
    userDisplayName?: string;  // user_profile:display_name
    userPictureUrl?: string;   // user_profile:picture
    userGender?: string;       // user_profile:gender
    userLocation?: string;     // user_profile:location
    userWebsite?: string;      // user_profile:website
}

// POST
/*export interface IPostUserDataQuery {
    username?: string;         // user_account:username
    userEmail?: string;        // user_accout:email
    userPhone?: string;        // user_account:phone_number
    userDisplayName?: string;  // user_profile:display_name
    userPictureUrl?: string;   // user_profile:picture
    userGender?: string;       // user_profile:gender
    userLocation?: string;     // user_profile:location
    userWebsite?: string;      // user_profile:website
}*/

// DELETE
/*export interface IDeleteUserDataQuery {
    user: string;            // user_account:id
}*/

// listing: GET
export interface IGetUserListDataReturn {
    userId: string;           // user_account:id
    username: string;         // user_account:username
    userDisplayName: string;  // user_profile:display_name
    userPictureUrl: string;   // user_profile:picture
    userWebsite: string;      // user_profile:website
}

/*export interface IUserData {
    id: string,
    username: string,
    name: string,
    url: string
}*/

export interface IUsersDataMap { 
    [userId: string]: IGetUserListDataReturn; 
}

export interface IGetUserDataResponse extends AxiosResponse<IGetUserDataReturn> {}

export interface IUsersListDataMap { 
    [userId: string]: IGetUserListDataReturn; 
}

export interface IGetUserListDataResponse extends AxiosResponse<IGetUserListDataReturn> {}