const playerReducerDefaultState = {
    playing: false,
    coords: {
        rowIndex: undefined,
        charIndex: undefined
    }
}

export default (state = playerReducerDefaultState, action, stateTree) => {
    switch(action.type) {
        case 'PLAY':
            const currentRowLength =  stateTree.rows[state.coords.rowIndex].lines[0].length
            const nextChar = stateTree.rows[state.coords.rowIndex].lines[0][state.coords.charIndex + 1]

            const isAtEndOfRow = nextChar === '|' ? 
            currentRowLength === state.coords.charIndex + 2 
            : 
            currentRowLength === state.coords.charIndex + 1

            const skipBy = (nextChar === '|' && !isAtEndOfRow) ? 2 : 1

            return { 
                ...state,
                coords: {
                    rowIndex: isAtEndOfRow ? // Is the player at end of row
                        state.coords.rowIndex + 1
                        :
                        state.coords.rowIndex,

                    charIndex: isAtEndOfRow ? // Is the player at end of row
                        0
                        :
                        state.coords.charIndex + skipBy
                },
                playing: !(isAtEndOfRow && stateTree.rows.length === state.coords.rowIndex + 1)
            }
        case 'START_PLAY':
            return {
                ...state,
                playing: true,
                coords: {
                    rowIndex: stateTree.coords.rowIndex,
                    charIndex: stateTree.coords.charIndex - 1
                },
                originalCoords: {
                    rowIndex: stateTree.coords.rowIndex,
                    lineIndex: stateTree.coords.lineIndex,
                    charIndex: stateTree.coords.charIndex                    
                }
            }
        case 'STOP_PLAY':
            return {
                ...state,
                playing: false,
                coords: {
                    rowIndex: undefined,
                    charIndex: undefined
                }
            }
        default:
            return state
    }
}