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
        case 'REPLACE_CHAR': {
            const { rowIndex, lineIndex, charIndex } = stateTree.coords
            const prevChar = stateTree.rows[rowIndex].lines[lineIndex][charIndex]
            const newChar = action.char
            let newState = {...state}
            const dictionaryChars = '\\/hpr~xtv'

            // Checks if a dictionary char was deleted
            if (dictionaryChars.includes(prevChar)) {
                const keyName = prevChar.replace('\\', 'backslash')
                .replace('/', 'slash')
                .replace('~', 'v')
                newState.amount[keyName]--

                newState.isDisplayed = false
                // Check if dictionry should be displayed
                for (let key in newState.amount){
                    if (newState.amount[key] !== 0) {
                        newState.isDisplayed = true
                        break
                    }
                }
            }

            // Checks if a new dictionary char is typed
            if (dictionaryChars.includes(newChar)) {
                const keyName = newChar.replace('\\', 'backslash')
                .replace('/', 'slash')
                .replace('~', 'v')
                newState.amount[keyName]++
                newState.isDisplayed = true
            }

            return newState
        }

        case 'BACKSPACE': {
            // eslint-disable-next-line
            const { rowIndex, lineIndex, charIndex} = stateTree.coords
            let newState = {...state}
            const dictionaryChars = '\\/hpr~xtv'

            stateTree.rows[rowIndex].lines.forEach((line) => {
                // Checks if a dictionary char was deleted
               const prevChar = line[charIndex]
               if (dictionaryChars.includes(prevChar)) {
                   const keyName = prevChar.replace('\\', 'backslash')
                   .replace('/', 'slash')
                   .replace('~', 'v')
                   newState.amount[keyName]--
                   newState.isDisplayed = false
                   // Check if dictionry should be displayed
                   for (let key in newState.amount){
                       if (newState.amount[key] !== 0) {
                           newState.isDisplayed = true
                           break
                       }
                   }
               }
            })
            return newState
        }

        case 'LOAD_TABS':
            return action.dictionary === undefined ? dictionaryReducerDefaultState : action.dictionary

        case 'RESET':
            return dictionaryReducerDefaultState

        default:
            return state
    }
}