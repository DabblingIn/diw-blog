import ua from 'universal-analytics';
import { isLocalhost } from './util';
import { getSubdomainConfig, ROOT_DOMAIN } from './subdomains';

const { uaAccountId } = getSubdomainConfig();

/**
 * Master *Analytics* GAnalytics Property config - not to be confused with the root 
 *  domain and corresponding property.  Both use the root domain, but the master 
 *  GAnalytics property is used to track all root and sub traffic, while the other 
 *  just tracks activity in root.
 */
const MASTER_ANALYTICS_INFO = {
    uaAccountId: 'UA-119556311-7',
    hostname: ROOT_DOMAIN
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

// HTTPS unless testing on localhost
const onLocalhost = isLocalhost();
const DEFAULT_CONSTRUCTOR_PARAMS: ua.VisitorOptions = {
    https: onLocalhost ? false : true,
    debug: !onLocalhost
}

const _MASTER_VISITOR = ua(MASTER_ANALYTICS_INFO.uaAccountId, DEFAULT_CONSTRUCTOR_PARAMS);
const _SITE_VISITOR = ua(uaAccountId, DEFAULT_CONSTRUCTOR_PARAMS);

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
        visitor: _MASTER_VISITOR,
        defaultParams: {
            dh: document.location.hostname
        }
    },
    site: {
        visitor: _SITE_VISITOR,
        defaultParams: {
            dh: MASTER_ANALYTICS_INFO.hostname
        }
    }
}

/**
 * Runs pageview for the master tracking code as well as the current site tracking code.
 */
export function pageview(params: ua.PageviewParams, callback?: ua.Callback): void {
    if (!onLocalhost) {
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
