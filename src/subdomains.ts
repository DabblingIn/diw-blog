
import { isLocalhost } from './util';

export interface ISubdomainMetadata {
    name: string;         // Site name (e.g. Dabbling In Web)
    titlePrefix: string;  // Site title prefix
    uaAccountId: string;       // Universal Analytics code
    mega: boolean;        // Is a special 'mega' sub: displays articles from all subs
}

interface ISubdomainMetadataMap {
    [subName: string]: ISubdomainMetadata;
}

// sub special keys
export const DEV_DEFAULT_SUB: string = "_dev";
export const ROOT_SUB: string = "_root";

const HTTPS_PREFIX = "https://";
export const ROOT_DOMAIN = "dabbling.in";
const DOT_ROOT_DOMAIN = "." + ROOT_DOMAIN;
export const ROOT_SUB_ORIGIN = HTTPS_PREFIX + ROOT_DOMAIN;

// config by subdomain
const SUBDOMAIN_CONFIG: ISubdomainMetadataMap = {
    // fallback/localhost config
    _dev: {
        name: "Dabbling (Dev)",
        titlePrefix: "Dabbling (Dev)",
        uaAccountId: "NaN",
        mega: true
    },
    // root domain
    _root: {
        name: "Dabbling In...",
        titlePrefix: "Dabbling In...",
        uaAccountId: "UA-119556311-8",
        mega: true
    },
    web: {
        name: "Dabbling In Web",
        titlePrefix: "DIW",
        uaAccountId: "UA-119556311-5",
        mega: false
    },
    articleSub00: {
        name: "Sub00",
        titlePrefix: "DIW:S0",
        uaAccountId: "NaN",
        mega: false
    }
};

// Initializing current sub properties to avert unnecessary operations
export const CURRENT_SUBKEY = getSubKey();
export const CURRENT_SUB_ISMEGA = SUBDOMAIN_CONFIG[CURRENT_SUBKEY].mega;
export const CURRENT_SUB_ORIGIN = CURRENT_SUB_ISMEGA ?
                              ROOT_SUB_ORIGIN : _getSubOrigin(CURRENT_SUBKEY);


/**
 * Checks if the sub is a special 'mega' sub (root or dev default)
 *  If a key is fed in, it will check that sub. Otherwise, it will
 *  check the current sub.
 */
export function isMegaSub(subKey?: string): boolean {
    if (typeof subKey !== "undefined") {
        // If a key is fed in, it will check that sub
        return SUBDOMAIN_CONFIG[subKey] ? SUBDOMAIN_CONFIG[subKey].mega : false;
    } else {
        // Otherwise, it will check the current sub
        return CURRENT_SUB_ISMEGA
    }
}


/**
 * Gives the origin link (https://(yyy.)xxx.in) for the given sub.
 *  If no key is fed in, gives the origin of the current sub
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
              // https://dabbling.in
              ROOT_SUB_ORIGIN
                : 
              // https://[subKey].dabbling.in
              HTTPS_PREFIX + subKey + DOT_ROOT_DOMAIN;
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
