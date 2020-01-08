export default (state, action, stateTree) => {
    const isFinalLine = state.lineIndex === 5
    const isFinalRow = (state.rowIndex + 1 === stateTree.rows.length)
    const nextState = {
        charIndex: (
            (!isFinalRow && isFinalLine && state.charIndex + 1 > stateTree.rows[state.rowIndex + 1].lines[0].length) ? 
            stateTree.rows[state.rowIndex + 1].lines[0].length - 1
            :
            state.charIndex
        ),
        lineIndex: (
            isFinalLine ? 
                isFinalRow ?
                    state.lineIndex
                    :
                    0
                :
                state.lineIndex + 1
        ),
        rowIndex: (
            (!isFinalRow && isFinalLine) ? 
            state.rowIndex + 1
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