import { rowReducerDefaultState } from '../reducers/rows'
import mapRow from '../libs/mapRow'

export default (state, { rowIndex, lineIndex, charIndex }) => {
    // If at the bottom row => create new row at bottom
    // If not at bottom row => create new row between
    let newState
    const currentRow = state[rowIndex]
    const newCurrentRow = mapRow(currentRow, (content) => content += '|')
    newState = state.slice(0, rowIndex).concat(
        newCurrentRow,
        rowReducerDefaultState[0],
        state.slice(rowIndex + 1, state.length)
    )
    return newState
}