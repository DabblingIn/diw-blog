import * as sanitizeHtml from 'sanitize-html';

/*
    DabblingIn Utilities
*/


const _DAY_IN_MS = 1000*60*60*24;


/*
  Article Element Formats
*/
export interface IArticleFieldValidationResponse {
    valid: boolean;
    err: string;
}

const ZERO_LENGTH_ERR_MSG = "Length must be greater than zero.";

export function validArticleUrlId(testId: string): IArticleFieldValidationResponse {
    let res: IArticleFieldValidationResponse = {
        valid: true,
        err: ''
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

export function validArticleTitle(testTitle: string): IArticleFieldValidationResponse {
    let res: IArticleFieldValidationResponse = {
        valid: true,
        err: ''
    };

    if (testTitle.length === 0 ) {
        res = {
            valid: false,
            err: ZERO_LENGTH_ERR_MSG
        }
    }

    return res;
}

export function validArticleDescription(testDescription: string): IArticleFieldValidationResponse {
    let res: IArticleFieldValidationResponse = {
        valid: true,
        err: ''
    };

    if (testDescription.length === 0 ) {
        res = {
            valid: false,
            err: ZERO_LENGTH_ERR_MSG
        }
    }

    return res;

}

export function validArticleContent(testContent: string): IArticleFieldValidationResponse {
    const res: IArticleFieldValidationResponse = {
        valid: true,
        err: ''
    };
    // TODO: use sanitize-html to check for script & style elements


    return res;
}


/*
  Date Strings
*/

export function minDateString(rawDateString: Date) {
    const d = new Date(rawDateString);
    // const weekdayString = _getWeekdayString(d);
    const dateStringParts = [d.toLocaleDateString()];
    /* if (weekdayString !== "") {
        dateStringParts.push(weekdayString);
    }*/
    dateStringParts.push(d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    return dateStringParts.join(" ");
    // return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
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

export function articleLink(articleId: string) {
    return "/p/" + articleId;
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
  'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe' ];

export function sanitizeArticleContent(rawHtmlString: string): string {
    return sanitizeHtml(rawHtmlString, { allowedTags: ALLOWED_HTML_ARTICLE_CONTENT_TAGS});
}