
export interface ISubdomainMetadata {
    name: string;   // site name (e.g. Dabbling In Web)
}

interface ISubdomainMetadataMap {
    [subName: string]: ISubdomainMetadata;
}

const LOCALHOST = "localhost";

// sub special keys
export const DEFAULT_SUB: string = "_default";
export const BASE_SUB: string = "_base";

export const MEGA_SUBS = [DEFAULT_SUB, BASE_SUB];

// config by subdomain
const SUBDOMAIN_CONFIG: ISubdomainMetadataMap = {
    // fallback/localhost config
    _default: {
        name: "Dabbling"
    },
    // root domain
    _base: {
        name: "Dabbling: Main"
    },
    web: {
        name: "Dabbling In Web"
    }
};

function parseSubdomain(hostname: string): string {
    const splitted: string[] = hostname.split('.');
    if (splitted.length === 2) {
        return BASE_SUB;
    } else {
        return splitted.slice(0, splitted.length-2).join('.');
    }
}

export function getSubKey() {
    if (location.hostname === LOCALHOST) {
        return DEFAULT_SUB;
    } else {
        return parseSubdomain(location.hostname);
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