import { rowReducerDefaultState } from '../reducers/rows'
import mapRow from '../libs/mapRow'
import downline from './downline'

export default (state, { rowIndex, lineIndex, charIndex }) => {
    if (charIndex + 1 === state[rowIndex].lines[lineIndex].length) {
        return downline(state, { rowIndex, lineIndex, charIndex})
    }
    return state.slice(0, rowIndex).concat(
        mapRow(state[rowIndex], (content) => charIndex > 1 ? content.slice(0, charIndex).concat('|') : '--')
        ,
        mapRow(rowReducerDefaultState[0], (content, index) => ( 
            state[rowIndex].lines[index]
            .slice(charIndex, 
            state[rowIndex].lines[index].length)
        )),
        state.slice(rowIndex + 1, state.length)
        )   
}