import ua from 'universal-analytics';
import { isLocalhost } from './util';
import { getSubdomainConfig, ROOT_SUB_ORIGIN } from './subdomains';

const { uaAccountId } = getSubdomainConfig();

/**
 * Master *Analytics* GAnalytics Property config - not to be confused with the root 
 *  domain and corresponding property.  Both use the root domain, but the master 
 *  GAnalytics property is used to track all root and sub traffic, while the other 
 *  just tracks activity in root.
 */
const _MASTER_ANALYTICS_INFO = {
    uaAccountId: 'UA-119556311-7',
    hostname: ROOT_SUB_ORIGIN
}

const _MASTER_ANALYTICS_DEFAULT_PARAMS = {
    dh: _MASTER_ANALYTICS_INFO.uaAccountId
}

/**
 * Initializing visitors
 */
/*
interface VisitorOptions {
    hostname?: string;
    path?: string;
    https?: boolean;
    enableBatching?: boolean;
    batchSize?: number;
    tid?: string;
    cid?: string;
    uid?: string;
    debug?: boolean;
    strictCidFormat?: boolean;
    requestOptions?: { [key: string]: any };
    headers?: { [key: string]: string };
}
*/
const _masterVisitor = ua(_MASTER_ANALYTICS_INFO.uaAccountId);
const _siteVisitor = ua(uaAccountId);
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

/**
 * Universal-analytics configs.
 */
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

/**
 * Runs pageview for the master tracking code as well as the current site tracking code.
 */
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

/**
 * Default callback for pageview: logs errors if any are present.  Otherwise,
 *  does nothing.
 */
export function defaultPageViewLogCallback(logPrefix: string): ua.Callback {
  return (err, count) => {
    if (err !== null) {
      console.log(logPrefix + ' GA Err (count ' + count + '):', err.name, "|", err.stack)
    }
  }
}
