import ua from 'universal-analytics';
import { isLocalhost } from './util';
import { getSubdomainConfig, ROOT_SUB_ORIGIN } from './subdomains';

const { uaCode } = getSubdomainConfig();

/**
 * Master *Analytics* GAnalytics Property config - not to be confused with the root 
 *  domain and corresponding property.  Both use the root domain, but the master 
 *  GAnalytics property is used to track all root and sub traffic, while the other 
 *  just tracks activity in root.
 */
const _MASTER_ANALYTICS_INFO = {
    trackingId: 'UA-119556311-7',
    hostname: ROOT_SUB_ORIGIN
}

const _MASTER_ANALYTICS_DEFAULT_PARAMS = {
    dh: _MASTER_ANALYTICS_INFO.trackingId
}

/**
 * Initializing visitors
 */
const _masterVisitor = ua(_MASTER_ANALYTICS_INFO.trackingId);
const _siteVisitor = ua(uaCode);
const _siteDefaultParams = {
    dh: document.location.origin
}
if (isLocalhost()) {
    _siteVisitor.debug();
}

interface IUA_VISITOR_Interface {
    [visitorKey: string]: {
        visitor: ua.Visitor,
        defaultParams: ua.PageviewParams
    }
}

export const UA_VISITOR: IUA_VISITOR_Interface = {
    master: {
        visitor: _masterVisitor,
        defaultParams: _siteDefaultParams
    },
    site: {
        visitor: _siteVisitor,
        defaultParams: _MASTER_ANALYTICS_DEFAULT_PARAMS
    }
}

/*type PageViewArgs = [
    ua.PageviewParams | string,    // path
    string?,                       // hostname
    string?,                       // title
    ua.PageviewParams?             // params
];*/

//type PageViewArgs = Parameters<typeof siteVisitor.pageview>;
export function pageview(params: ua.PageviewParams, callback?: ua.Callback): void {
    if (true) { //(!isLocalhost()) {
        UA_VISITOR.master.visitor.pageview(Object.assign(
                                        {},
                                        UA_VISITOR.master.defaultParams,
                                        params)
                                    ).send(callback)
        UA_VISITOR.site.visitor.pageview(Object.assign(
                                            {}, 
                                            UA_VISITOR.site.defaultParams, 
                                            params)
                                    ).send(callback)
    } else {
        return;
    }
}

export function defaultPageViewLogCallback(logPrefix: string): ua.Callback {
  return (err, count) => {
    if (err !== null) {
      console.log(logPrefix + ' GA Err (count ' + count + '):', err.name, "|", err.stack)
    }
  }
}
