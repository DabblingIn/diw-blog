
import { AxiosResponse } from 'axios';


/*
 * GENERIC API RESPONSE JSON FORMATS
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

export interface IDataErrJsonReturn<T> {
    data?: T;
    err: string | null;
}

export interface ISuccessErrJsonResponse extends AxiosResponse<ISuccessErrJsonReturn> {}
export interface ISuccessErrDataJsonResponse<T> extends AxiosResponse<ISuccessErrDataJsonReturn<T>> {}
export interface IDataErrJsonResponse<T> extends AxiosResponse<IDataErrJsonReturn<T>> {}

/*
 * ARTICLES
 */

// article:DATA

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

export interface IPostArticleDataQuery {
    articleUrlId:        string;       // article:url_id
    articleTitle:        string,       // article:title
    articleDescription:  string;       // article:description
    articleSub:          string;       // article:sub
    articleContent:      string;       // article:content
}

export interface IPostArticleDataReturn {
    articleId: string;                  // article:id
}

export interface IUpdateArticleDataQuery {
    articleUrlId?:        string;      // article:url_id
    articleTitle?:        string,      // article:title
    articleDescription?:  string;      // article:description
    articleContent?:      string;      // article:content
}

// article:LISTING

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


export interface IArticlesDataIdMap {
    [articleId: string]: IGetArticleData;
}

export interface IArticlesDataUrlIdMap {
    [articleUrlId: string]: IGetArticleData;
}

export interface IGetArticlesListingResponse extends AxiosResponse<IDefaultJsonReturn<IGetArticleListData[]>> {}

export interface IGetArticleDataResponse extends AxiosResponse<IDefaultJsonReturn<IGetArticleData>> {}
export interface IPostArticleDataResponse extends AxiosResponse<IDefaultJsonReturn<IPostArticleDataReturn>> {}
export interface IPutArticleDataResponse extends AxiosResponse<ISuccessErrJsonReturn> {}
export interface IDeleteArticleByIdResponse extends AxiosResponse<ISuccessErrJsonReturn> {}

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

// listing: GET
export interface IGetUserListDataReturn {
    userId: string;           // user_account:id
    username: string;         // user_account:username
    userDisplayName: string;  // user_profile:display_name
    userPictureUrl: string;   // user_profile:picture
    userWebsite: string;      // user_profile:website
}

export interface IUsersDataMap {
    [userId: string]: IGetUserListDataReturn;
}

export interface IGetUserDataResponse extends AxiosResponse<IDefaultJsonReturn<IGetUserDataReturn>> {}

export interface IUsersListDataMap {
    [userId: string]: IGetUserListDataReturn;
}

export interface IGetUserListDataResponse extends AxiosResponse<IGetUserListDataReturn> {}


// Editor: Session / Login
interface IEditorLoginDataReturn {
    userId: string;
}

interface IEditorLoginQuery {
    username: string;
    password: string;
}

interface IEditorLoginDataResponse extends ISuccessErrDataJsonResponse<IEditorLoginDataReturn> {}


export interface IEditorSessionUser {
    id: string; 
}

export interface IGetEditorSessionData {
    user: IEditorSessionUser;    // same, but without an optional user
}

interface IGetEditorSessionDataResponse extends IDataErrJsonResponse<IGetEditorSessionData> {}