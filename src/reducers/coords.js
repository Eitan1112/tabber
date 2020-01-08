import goDownHelper  from '../helpers/down'
import goUpHelper from '../helpers/up'
import { backspaceCoordsHelper } from '../helpers/backspace'

const coordsReducerDefaultState = {
    rowIndex: 0,
    lineIndex: 0,
    charIndex: 1
}

const coordsReducer = (state = coordsReducerDefaultState, action, stateTree) => {
    // eslint-disable-next-line
    let currentRowLength
    switch (action.type) {
        case 'GO_RIGHT': 
            currentRowLength = stateTree.rows[state.rowIndex].lines[0].length
            const nextChar = stateTree.rows[state.rowIndex].lines[state.lineIndex][state.charIndex + 1]
            return {
                ...state,
                charIndex: nextChar === '|' ? state.charIndex + 2 : state.charIndex + 1      
            }   
        case 'GO_LEFT':
            currentRowLength = stateTree.rows[state.rowIndex].lines[0].length
            const prevChar = stateTree.rows[state.rowIndex].lines[state.lineIndex][state.charIndex - 1]
            return {
                ...state,
                charIndex: state.charIndex > 0 ?
                    prevChar === '|' ?
                    state.charIndex - 2
                    :
                    state.charIndex - 1 
                : 
                0
            }
        case 'GO_DOWN':
            return {
                ...state,
                ...goDownHelper(state, action, stateTree)
            }
        case 'GO_UP':
            return {
                ...state,
                ...goUpHelper(state, stateTree)
            }
        case 'BACKSPACE':
            return {                
                ...state,
                ...backspaceCoordsHelper(state, stateTree)
            }
        case 'DOWNLINE':
            return {
                rowIndex: state.rowIndex + 1,
                charIndex: 1,
                lineIndex: 0
            }     
        case 'MIDDLE_SPACE':
            return {
                ...state,
                charIndex: state.charIndex + 1 < stateTree.rows[state.rowIndex].lines[0].length ?
                state.charIndex + 1
                :
                state.charIndex
            }
        case 'SPLITTED_DOWNLINE':
            return {
                rowIndex: state.rowIndex + 1,
                lineIndex: 0,
                charIndex: state.charIndex + 1 === stateTree.rows[state.rowIndex].lines[0].length ? 1 : 0
            }
               
        case 'BREAK':
            return {
                ...state,
                charIndex: state.charIndex + 2
            }

        case 'UNDO':
                return stateTree.past.length > 0 ?
                stateTree.past[stateTree.past.length - 1].coords : state

        case 'REDO':
                return stateTree.future.length > 0 ?
                stateTree.future[stateTree.future.length - 1].coords : state
        
        case 'PASTE_TABS':
        case 'GO_START':
            return {
                rowIndex: 0,
                lineIndex:0,
                charIndex: 0
            }
        case 'GO_END':
            return {
                rowIndex: stateTree.rows.length - 1,
                lineIndex: 0,
                charIndex: stateTree.rows[stateTree.rows.length - 1].lines[0].length - 1
            }
            
        case 'PLAY':
            return {
                    rowIndex: undefined,
                    lineIndex: undefined,
                    charIndex: undefined
            }
            
        case 'STOP_PLAY':
            return stateTree.coords.rowIndex === undefined ?
            {
                rowIndex: stateTree.player.originalCoords.rowIndex,
                lineIndex: stateTree.player.originalCoords.lineIndex,
                charIndex: stateTree.player.originalCoords.charIndex
            }
            :
            state
        
        default:
            return state
    }
}


export default coordsReducer