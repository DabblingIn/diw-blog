
import { isLocalhost } from './util';

export interface ISubdomainMetadata {
    name: string;   // site name (e.g. Dabbling In Web)
    tabName: string;
    uaCode: string;
}

interface ISubdomainMetadataMap {
    [subName: string]: ISubdomainMetadata;
}

// sub special keys
export const DEV_DEFAULT_SUB: string = "_dev";
export const ROOT_SUB: string = "_root";

export const MEGA_SUBS = [DEV_DEFAULT_SUB, ROOT_SUB];

const HTTPS_PREFIX = "https://";
const ROOT_DOMAIN = "dabblingin.com";
const ROOT_DOT_DOMAIN = "." + ROOT_DOMAIN;
const ROOT_SUB_ORIGIN = HTTPS_PREFIX + ROOT_DOMAIN;

// Initializing current sub properties to avert unnecessary operations
export const CURRENT_SUBKEY = getSubKey();
export const CURRENT_SUB_ISMEGA = (MEGA_SUBS.indexOf(CURRENT_SUBKEY) !== -1);
export const CURRENT_SUB_ORIGIN = CURRENT_SUB_ISMEGA ?
                              ROOT_SUB_ORIGIN : _getSubOrigin(CURRENT_SUBKEY);

// config by subdomain
const SUBDOMAIN_CONFIG: ISubdomainMetadataMap = {
    // fallback/localhost config
    _dev: {
        name: "Dabbling (Dev)",
        tabName: "Dabbling (Dev)",
        uaCode: "NaN"
    },
    // root domain
    _root: {
        name: "Dabbling In...",
        tabName: "Dabbling In...",
        uaCode: "UA-119556311-8"
    },
    web: {
        name: "Dabbling In Web",
        tabName: "DIW",
        uaCode: "UA-119556311-5"
    },
    articleSub00: {
        name: "Sub00",
        tabName: "DIW:S0",
        uaCode: "NaN"
    }
};


/**
 * Checks if the sub is a special 'mega' sub (root or dev default)
 *  If a key is fed in, it will check that sub. Otherwise, it will
 *  check the current sub.
 */
export function isMegaSub(subKey?: string): boolean {
    if (typeof subKey !== "undefined") {
        // If a key is fed in, it will check that sub
        return (MEGA_SUBS.indexOf(subKey) !== -1);
    } else {
        // Otherwise, it will check the current sub
        return CURRENT_SUB_ISMEGA
    }
}


/**
 * Gives the origin link (https://(yyy.)xxx.com) for the given sub.
 *  If no key is ged in, gives the origin of the current sub
 */
export function getSubOriginLink(subKey?: string): string {
    if (typeof subKey !== "undefined") {
        return _getSubOrigin(subKey);
    } else {
        return CURRENT_SUB_ORIGIN;
    }
}

/**
 * Base helper function for getSubOriginLink
 */
function _getSubOrigin(subKey: string): string {
    return isMegaSub(subKey) ?
              // https://dabblingin.com 
              ROOT_SUB_ORIGIN
                : 
              // https://[subKey].dabblingin.com
              HTTPS_PREFIX + subKey + ROOT_DOT_DOMAIN;
}

function parseSubdomain(hostname: string): string {
    const splitted: string[] = hostname.split('.');
    if (splitted.length === 2) {
        return ROOT_SUB;
    } else {
        return splitted.slice(0, splitted.length-2).join('.');
    }
}

export function getSubKey() {
    if (isLocalhost()) {
        return process.env.REACT_APP_TESTSUB ?
            process.env.REACT_APP_TESTSUB : DEV_DEFAULT_SUB;
    } else {
        return parseSubdomain(window.location.hostname);
    }
}

export function getSubdomainConfig(overrideSubName?: string): ISubdomainMetadata {
    let subKey: string;
    if (overrideSubName !== undefined) {
        subKey = overrideSubName;
    } else {
        subKey = getSubKey();
    }

    return SUBDOMAIN_CONFIG[subKey];
}
