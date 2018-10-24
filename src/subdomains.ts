
interface ISubdomainMetadata {
    name: string;   // site name (e.g. Dabbling In Web)
}

interface ISubdomainMetadataMap {
    [subName: string]: ISubdomainMetadata;
}

const LOCALHOST = "localhost";

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
        return "_base";
    } else {
        return splitted.slice(0, splitted.length-2).join('.');
    }
}

export function getSubdomainConfig(overrideSubName?: string): ISubdomainMetadata {
    let subKey: string;
    if (overrideSubName !== undefined) {
        subKey = overrideSubName;
    } else {
        if (location.hostname === LOCALHOST) {
            subKey = "_default";
        } else {
            subKey = parseSubdomain(location.hostname);
        }
    }

    return SUBDOMAIN_CONFIG[subKey];
}