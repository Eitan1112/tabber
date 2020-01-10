export default (paste) => {
    const pattern = /((?:\w|\s|b|#|m){1,2})\|((?:(?:\d|\w|-|\/|^|~|\\|\(|\))+\|)+)/g;
    const matches = Array.from(paste.matchAll(pattern));
    return matches 
}