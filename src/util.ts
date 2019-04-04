import * as sanitizeHtml from 'sanitize-html';

import { IGetArticleListData } from './parts/ApiCaller/ApiCaller.d';

/*
    DabblingIn Utilities
*/

const LOCALHOST = "localhost";
const _DAY_IN_MS = 1000*60*60*24;

export function isLocalhost() {
    return (location.hostname === LOCALHOST);
}

export function removeTrailingSlash(url: string): string {
    return url.replace(/\/$/, "");
}

/*
  Article Element Formats
*/
export function sortArticlesByUpdatedDate(a1: IGetArticleListData, a2: IGetArticleListData) {
    return new Date(a2.articleUpdatedAt).getTime()
                - new Date(a1.articleUpdatedAt).getTime();
}

export interface IInputFieldValidationResponse {
    valid: boolean;
    err: string;
}

const ZERO_LENGTH_ERR_MSG = "Length must be greater than zero.";

export function validArticleUrlId(testId: string): IInputFieldValidationResponse {
    let res: IInputFieldValidationResponse = {
        valid: true,
        err: ""
    };

    if (testId.length === 0) {
        res.valid = false;
        res.err = ZERO_LENGTH_ERR_MSG;
    } else if (testId.indexOf('/') !== -1) {
        res = {
            valid: false,
            err: "Cannot have slashes in URL ID."
        };
    }

    return res;
}

export function validArticleTitle(testTitle: string): IInputFieldValidationResponse {
    let res: IInputFieldValidationResponse = {
        valid: true,
        err: ""
    };

    if (testTitle.length === 0 ) {
        res = {
            valid: false,
            err: ZERO_LENGTH_ERR_MSG
        }
    }

    return res;
}

export function validArticleDescription(testDescription: string): IInputFieldValidationResponse {
    let res: IInputFieldValidationResponse = {
        valid: true,
        err: ""
    };

    if (testDescription.length === 0 ) {
        res = {
            valid: false,
            err: ZERO_LENGTH_ERR_MSG
        }
    }

    return res;

}

export function validArticleContent(testContent: string): IInputFieldValidationResponse {
    const res: IInputFieldValidationResponse = {
        valid: true,
        err: ""
    };
    // TODO: use sanitize-html to check for script & style elements


    return res;
}

/*
    Login Element Formats
 */
export function validUsername(username: string): IInputFieldValidationResponse {
    let res: IInputFieldValidationResponse = {
        valid: true,
        err: ""
    };

    if (username.length === 0) {
        res = {
            valid: false,
            err: "You need a username"
        }
    } else if (username.length > 50) {
        res = {
            valid: false,
            err: "Username cannot be longer than 20 characters."
        }
    }

    return res;
}

export function validPassword(password: string ): IInputFieldValidationResponse {
    let res: IInputFieldValidationResponse = {
        valid: true,
        err: ""
    }

    if (password.length === 0) {
        res = {
            valid: false,
            err: "You need a password"
        }
    } else if (password.length > 50) {
        res = {
            valid: false,
            err: "Password cannot be longer than 50 characters."
        }
    } 
    return res;
}


/*
  Date Strings
*/

export function minDateString(rawDateString: Date) {
    const d = new Date(rawDateString);
    const dateStringParts = [d.toLocaleDateString()];
    dateStringParts.push(d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    return dateStringParts.join(" ");
}

export function getWeekdayString(comparedDate: Date) {
    const date = new Date(comparedDate.getTime());
    const now = new Date();
    if (now.toLocaleDateString() === date.toLocaleDateString()) {
        return "Today";
    }

    // zeroing out hours before comparison
    date.setHours(0,0,0,0);
    now.setHours(0,0,0,0);
    const diffDays = (now.getTime() - date.getTime())/_DAY_IN_MS;

    if (diffDays >= 7) {
        return "";
    } else {
        return date.toLocaleDateString([], { weekday: "short" });
    }
}

// Links

export function articleLink(articleUrlId: string) {
    return "/p/" + articleUrlId;
}

export function userLink(userId: string) {
    return "/u/" + userId;
}

export function arrayToMap(array: any[], keyField: any): object {
    const map = {};
    return array.reduce((obj, item) => {
        map[item[keyField]] = item;
        return map
    }, {});
}

export function arrayToIdMap(array: IObjectWithId[]): object {
    return arrayToMap(array, "id");
}

interface IObjectWithId {
    id: any;
}


// HTML Sanitize
const ALLOWED_HTML_ARTICLE_CONTENT_TAGS = [ 
  // ours:
  'img', 'h2',
  // defaults:
  'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe',
  'twitter-widget' ];

export function sanitizeArticleContent(rawHtmlString: string): string {
    return sanitizeHtml(rawHtmlString, {
        allowedTags: ALLOWED_HTML_ARTICLE_CONTENT_TAGS,
        allowedClasses: {
            'blockquote': ['twitter-tweet']
        },
        allowedAttributes: {
            'i': ['class']
        }
    });
}

// Twitter
declare var twttr: any;
export function loadTwitterWidgets() {
    try {
        twttr.widgets.load();
    } catch(e) {
        if (e instanceof ReferenceError) {
            // tslint:disable-next-line:no-console
            console.log("Twitter widget load issue!");
            setTimeout(loadTwitterWidgets, 1000);
        } else {
            throw e;
        }
    }
}