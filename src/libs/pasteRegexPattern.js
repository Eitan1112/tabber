export const tabsRowPattern = (paste) => {
    const pattern = /((?:\w|\s|b|#|m){1,2})\|((?:(?:\d|\w|-|\/|^|~|\\|\(|\))+\|)+)/g
    const matches = paste.matchAll(pattern);
    return matches !== null ? Array.from(matches) : null
}

export const sectionPattern = (paste) => {
    const pattern = /\[.+]/g
    const match = paste.match(pattern)
    return match
}
