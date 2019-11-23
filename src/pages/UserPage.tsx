import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import Helmet from 'react-helmet';
import DefaultNavbar from '../parts/Navbar/DefaultNavbar';
import ArticleListing from '../parts/ArticleListing/ArticleListing';

import { getArticlesListing, getUserDataByUsername } from '../parts/ApiCaller/ApiCaller';
import { IGetArticleListData } from '../parts/ApiCaller/ApiCaller.d';
import { sortArticleListingByCreated } from '../util';
import { metaTitleTags, metaDescriptionTags, metaKeywordsTag} from '../metaUtils';

import { defaultTheme as theme } from '../style/themes';

import './UserPage.css';

const defaultPageStyle = {
  marginTop: theme.navbarHeight + theme.topBottomMargin,
  marginBottom: theme.topBottomMargin
};

const META_KEYWORDS = ['user'];

interface IUserPageMatchParams {
    username: string;
}

interface IUserPageProps extends RouteComponentProps<IUserPageMatchParams> {}

export default function UserPage(props: IUserPageProps) {
    const { username } = props.match.params;
    const [articles, setArticles] = useState([] as IGetArticleListData[]);
    const [userDisplayName, setUserDisplayName] = useState("");
    const [userWebsite, setUserWebsite] = useState("");
    const [errMessage, setErrMessage] = useState("");

    // Article Listing
    useEffect(() => {
        getArticlesListing({ authorUsername: username })
            .then(({ data: resData }) => {
                let articleListData = sortArticleListingByCreated(resData.data);
                let err = resData.err;
                if (err) {
                    return setErrMessage("Articles Data Error: " + err);
                }
                setArticles(articleListData);
            })
            .catch(err => setErrMessage("Articles Data Error: " + err.message));
    }, [username]);

    // User Data
    useEffect(() => {
        getUserDataByUsername(username)
            .then(({ data: resData }) => {
                const userData = resData.data;
                const err = resData.err;
                if (err) {
                    return setErrMessage("User Data Error: " + err);
                } else if (typeof userData === "undefined" || userData === null) {
                    return setErrMessage("User " + username + " not found.");
                }
                setUserDisplayName(userData.userDisplayName);
                setUserWebsite(userData.userWebsite);
            })
            .catch(err => setErrMessage("User Data Error:" + err.message));
    }, [username]);

    const helmet = (
        <Helmet>
            {metaTitleTags(userDisplayName)}
            {metaDescriptionTags(`User profile of ${userDisplayName}.`)}
            {metaKeywordsTag(META_KEYWORDS)}
        </Helmet>
    );

    function userPageRender(body: any) {
        if (errMessage !== "") {
            return (
                <div className="user-page" style={defaultPageStyle}>
                    <DefaultNavbar />
                    <UserPageErrorPopup message={errMessage}/>
                </div>
            )
        }
        let websiteLine = null;
        if (userWebsite !== "" && userWebsite !== null) {
            websiteLine = websiteLineRender(userWebsite);
        }
        return (
            <div className="user-page" style={defaultPageStyle}>
                {helmet}
                <DefaultNavbar />
                <h1 className="user-page__title" style={theme.articleTitleStyle}>
                    {userDisplayName}
                </h1>
                {websiteLine}
                {body}
            </div>
        )
    }

    function websiteLineRender(website: string) {
        const cleanSiteLink = userWebsite.replace(/(^\w+:|^)\/\//, '');
        return (
           <div className="user-page__user-website-box">
               <p className="user-page__user-website-line">
                 <span className="user-page__user-website-line_h1">website&nbsp;</span>&nbsp;
                 <a className="user-page__user-website-link" href={userWebsite}>{cleanSiteLink}</a>
               </p>
           </div>)
    }

    // NO ARTICLES (yet)
    if (articles.length === 0) {
        return userPageRender((
            <p>(No Articles)</p>
        ));
    }

    // ARTICLES FOUND
    return userPageRender((
        <ArticleListing articlesListData={articles} />
    ))
}


interface IUserPageErrorPopupProps {
    message: string;
}

function UserPageErrorPopup(props: IUserPageErrorPopupProps) {
    return (
        <div>
            <Helmet>
                <title>Error</title>
            </Helmet>
            <div className="user-page__error-popup item-box">
                <h1 className="user-page__error-popup__header">Error</h1>
                <p className="user-page__error-popup__text">{props.message}</p>
            </div>
        </div>
    )
}