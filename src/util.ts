const _DAY_IN_MS = 1000*60*60*24;

/*
    USE THIS OBJECT:
*/

const util = {
    getWeekdayString,
    minDateString,
    articleLink,
    userLink
};

export default util;


function minDateString(rawDateString: Date) {
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

function getWeekdayString(comparedDate: Date) {
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

function articleLink(articleId: string) {
    return "/p/" + articleId;
}

function userLink(userId: string) {
    return "/u/" + userId;
}