export default (state, stateTree) => {
    const isFirstLine = state.lineIndex === 0
    const isFirstRow = (state.rowIndex === 0)
    const nextState = {
        charIndex: ((!isFirstRow && isFirstLine) ? 
            state.charIndex + 1 > stateTree.rows[state.rowIndex - 1].lines[0].length ?
                stateTree.rows[state.rowIndex - 1].lines[5].length - 1
                :
                state.charIndex
            :
            state.charIndex
        ),        
        lineIndex: (isFirstLine ? 
            isFirstRow ?
                state.lineIndex
                :
                5
            :
            state.lineIndex - 1
        ),
        rowIndex: (
            (!isFirstRow && isFirstLine) ? 
                state.rowIndex - 1
                :
                state.rowIndex
        )
    }
    if(stateTree.rows[nextState.rowIndex].lines[nextState.lineIndex][nextState.charIndex] === '|') {
        return {...nextState, charIndex: nextState.charIndex - 1}
    } else {
        return nextState
    }
}