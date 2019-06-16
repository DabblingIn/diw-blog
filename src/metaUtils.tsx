import * as React from 'react';

/**
 *
     <!-- EXAMPLE META SECTION WITH SOCIAL -->
     <!-- Primary tags -->
    <title>Dabbling In...</title>
    <meta name="title" content="Dabbling In...">
    <meta name="description" content="Blog platform for devs, by devs.">
    <meta name="keywords" content="tech,blog,software development,engineer">
    <meta name="robots" content="index, follow">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="language" content="English">
    <meta name="author" content="David J. Cunningham">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="http://dabblingin.com">
    <meta property="og:title" content="Dabbling In...">
    <meta property="og:description" content="Blog platform for devs, by devs.">
    <meta property="og:image" content="imageUrl.png">


    <!-- Twitter -->
    <meta property="twitter:card" content="twitterImageUrl.png">
    <meta property="twitter:url" content="http://dabblingin.com">
    <meta property="twitter:title" content="Dabbling In...">
    <meta property="twitter:description" content="Blog platform for devs, by devs.">
    <meta property="twitter:image" content="imageUrl.png">
*/

export function metaTitleTags(title: string): any[] {
    return [
        <title>{title}</title>,
        <meta name="title" content={title} />,
        <meta property="og:title" content={title} />,
        <meta property="twitter:title" content={title} />
    ]
}

export function metaDescriptionTags(description: string): any[] {
    return [
        <meta name="description" content={description} />,
        <meta property="og:description" content={description} />,
        <meta property="twitter:description" content={description} />
    ]
}


export function metaAuthorTag(author: string): any {
    return <meta name="author" content={author} />
}


export function metaKeywordsTag(keywords: string[]): any {
    return <meta name="keywords" content={keywords.join(',')} />
}


export function metaUrlTags(url?: string): any[] {
    // Give the current location if one isn't fed in
    url = url ? url : document.location.hostname;
    return [
        <meta property="og:url" content={url} />,
        <meta property="twitter:url" content={url} />
    ]
}


export function metaImageTags(imageUrl: string): any[] {
    return [
        <meta property="og:image" content={imageUrl} />,
        <meta property="twitter:image" content={imageUrl} />
    ]
}


export enum RobotDirective {
    index = "index",
    follow = "follow"
    // TODO: others?
}


export function metaRobotsTag(directives: RobotDirective[]) {
    return <meta name="robots" content={directives.join(',')} />
}


export enum OGType {
    website = "website"
    // TODO: others?
}


export function metaTypeTag(t: OGType): any {
    return <meta property="og:type" content={t} />
}


export function metaTwitterCardTag(imageUrl: string): any {
    return <meta property="twitter:card" content={imageUrl} />
}