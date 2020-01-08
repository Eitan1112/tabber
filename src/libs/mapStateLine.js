export default (state, rowIndex, lineIndex, lineContent) => {
    const newLines = state[rowIndex].lines.slice(0, lineIndex).concat(
        lineContent(state[rowIndex].lines[lineIndex]),
        state[rowIndex].lines.slice(lineIndex + 1, state[rowIndex].lines.length)
    )
    const newRow = {
        ...state[rowIndex],
        lines: newLines
    }
    return state.slice(0, rowIndex).concat(newRow, state.slice(rowIndex + 1, state.length))
}