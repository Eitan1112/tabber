export default (state, rowIndex, lineContent) => {
    const newRow = {
        ...state[rowIndex],
        lines: state[rowIndex].lines.map((content, index) => (
            lineContent(content, index)
        ))
    }
    return state.slice(0, rowIndex).concat(newRow, state.slice(rowIndex + 1, state.length))
}