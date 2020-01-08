import charHelper from '../helpers/char'
import backspaceHelper from '../helpers/backspace'
import downlineHelper from '../helpers/downline'
import splittedDownlineHelper from '../helpers/splittedDownline'
import pasteTabsHelper from '../helpers/pasteTabs'
import mapStateRow from '../libs/mapStateRow'

export const rowReducerDefaultState =  [
    {
        lines: [
                '--',
                '--',
                '--',
                '--',
                '--',
                '--'
        ],
        section: undefined,
        lyrics: undefined
    }
    
]

const rowsReducer = (state = [...rowReducerDefaultState], action, stateTree) => {
    let currentRowLength
    switch (action.type) {
        case 'GO_RIGHT':
            currentRowLength = state[stateTree.coords.rowIndex].lines[stateTree.coords.lineIndex].length
            const nextChar = state[stateTree.coords.rowIndex].lines[stateTree.coords.lineIndex][stateTree.coords.charIndex + 1]
            console.log(currentRowLength, nextChar, stateTree.coords.charIndex)
            return currentRowLength === stateTree.coords.charIndex + 1 ? 
                mapStateRow(state, stateTree.coords.rowIndex, (content) => content += '-') 
                : 
                currentRowLength === stateTree.coords.charIndex + 2 && nextChar === '|' ? 
                    mapStateRow(state, stateTree.coords.rowIndex, (content) => content += '-') 
                    :
                    state
            

        case 'REPLACE_CHAR':
            return charHelper(state, action, stateTree.coords)

        case 'BACKSPACE':
            return backspaceHelper(state, stateTree.coords)

        case 'DOWNLINE':
            return downlineHelper(state, stateTree.coords)

        case 'BREAK':
            return mapStateRow(state, stateTree.coords.rowIndex, (content) => content.slice(0, stateTree.coords.charIndex+1)
            .concat('|-', content.slice(stateTree.coords.charIndex+1 , content.length)))

        case 'MIDDLE_SPACE':
            return state[stateTree.coords.rowIndex].lines[stateTree.coords.lineIndex].length === stateTree.coords.charIndex + 1 ? 
            state
            :
            mapStateRow(state, stateTree.coords.rowIndex, (content) => content.slice(0, stateTree.coords.charIndex+1)
            .concat('-', content.slice(stateTree.coords.charIndex+1 , content.length)))
        
        case 'SPLITTED_DOWNLINE':
            return splittedDownlineHelper(state, stateTree.coords)
        
        case 'UNDO':
            return stateTree.past.length > 0 ?
            stateTree.past[stateTree.past.length - 1].rows : state

        case 'REDO':
            return stateTree.future.length > 0 ?
            stateTree.future[stateTree.future.length - 1].rows : state
        
        case 'PASTE_TABS':
            return pasteTabsHelper(state, stateTree.coords.rowIndex, action.tabs, action.pasteType)
        
        case 'LOAD_TABS':
            return action.rows

        case 'CHANGE_SECTION':
            return state.slice(0, action.rowIndex).concat({
                ...state[action.rowIndex],
                section: action.value
            }, state.slice(action.rowIndex + 1, state.length))

        case 'RESET':
            return rowReducerDefaultState

        default:
            return state
    }
}


export default rowsReducer