import {tabsRowPattern} from '../libs/pasteRegexPattern'

export default (state, tabs) => {
    const matches = tabsRowPattern(tabs)

    if (matches.length % 6 !== 0 || matches.length === 0) {
        return state
    }
    let tuning = []
    for (let i = 0 ; i < 6 ; i++) {        
        tuning.push(matches[i][1].trim())
    }
    return {
        ...state,
        tuning
    }
}