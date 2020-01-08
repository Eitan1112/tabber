const dictionaryReducerDefaultState = {
    isDisplayed: false,
    amount: {
        backslash: 0,
        slash: 0,
        h: 0,
        p: 0,
        r: 0,
        v: 0,
        x: 0,
        t: 0
    }
}

export default (state = dictionaryReducerDefaultState, action, stateTree) => {
    switch(action.type) {
        case 'REPLACE_CHAR':
            const { rowIndex, lineIndex, charIndex} = stateTree.coords
            const prevChar = stateTree.rows[rowIndex].lines[lineIndex][charIndex]
            const newChar = action.char
            let newState = {...state}
            const dictionaryChars = '\\/hpr~xtv'
            if (dictionaryChars.includes(prevChar)) {
                const keyName = prevChar.replace('\\', 'backslash')
                .replace('/', 'slash')
                .replace('~', 'v')
                newState.amount[keyName]--

                newState.isDisplayed = false
                for (let key in newState.amount){
                    if (newState.amount[key] !== 0) {
                        newState.isDisplayed = true
                        break
                    }
                }

            }
            if (dictionaryChars.includes(newChar)) {
                const keyName = newChar.replace('\\', 'backslash')
                .replace('/', 'slash')
                .replace('~', 'v')
                newState.amount[keyName]++
                if(!newState.isDisplayed) {
                    newState.isDisplayed = true
                }
            }
            return newState

        case 'LOAD_TABS':
            return action.dictionary === undefined ? dictionaryReducerDefaultState : action.dictionary
        default:
            return state
    }
}