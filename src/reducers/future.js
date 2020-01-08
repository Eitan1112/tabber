const futureReducerDefaultState = []

const futureReducer = (state = futureReducerDefaultState, action, stateTree) => {
    switch(action.type) {
        case 'UNDO':
            return stateTree.past !== undefined && stateTree.past.length !== 0 ?          
                 state.length >= 10 ?
                    state.slice(1, 10).concat({
                        rows: stateTree.rows,
                        coords: stateTree.coords
                    })
                    :
                    state.concat({
                        rows: stateTree.rows,
                        coords: stateTree.coords
                    })
                :
                state

        case 'REDO':
            return state.length > 0 ?
            state.slice(0, state.length - 1) : state
        default:
            return []
    }
}

export default futureReducer