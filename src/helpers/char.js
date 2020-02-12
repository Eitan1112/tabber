// import mapStateLine from "../libs/mapStateLine"
import mapStateRow from "../libs/mapStateRow"


export default (state, action, { rowIndex, lineIndex, charIndex }) => {  
    const rowLength = state[rowIndex].lines[0].length
    const append = charIndex < rowLength - 2 ? '' : charIndex === rowLength - 2 ? '-' : '--'
    return mapStateRow(state, rowIndex, (content) => (
            content.slice(0, charIndex) + action.char + content.slice(charIndex + 1, content.length).concat(append)
        )
    )
}