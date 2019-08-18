
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

export function isMegaSub(subKey: string) {
    return (MEGA_SUBS.indexOf(subKey) !== -1);
}
