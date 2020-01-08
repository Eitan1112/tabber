const pastReducerDefaultState = []

const pastReducer = (state = pastReducerDefaultState, action, stateTree) => {
    if (Object.keys(stateTree).length === 0) {
        return []
    }
    switch (action.type) {
        case 'UNDO':
            return state.length > 0 ?
            state.slice(0, state.length - 1) : state
        case 'REDO':
            if (stateTree.future === undefined || stateTree.future.length === 0)
                return state
        // eslint-disable-next-line
        case 'GO_RIGHT':
        case 'REPLACE_CHAR':
        case 'BACKSPACE':
        case 'DOWNLINE':
        case 'BREAK':
        case 'MIDDLE_SPACE':
        case 'SPLITTED_DOWNLINE':
        case 'PASTE_TABS':
            return state.length >= 10 ?
                state.slice(1, 10).concat({
                    rows: stateTree.rows,
                    coords: stateTree.coords
                })
                :
                state.concat({
                    rows: stateTree.rows,
                    coords: stateTree.coords
                })
        default:
            return state
    }
}
    


export default pastReducer