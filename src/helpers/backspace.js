import mapStateRow from "../libs/mapStateRow"

export default (state, { rowIndex, lineIndex, charIndex }) => {
    // If at start of row => combine the row with the top row
    // If at middle or end of row => remove from middle or end
    // If removes line break => removes two chars
    if ( charIndex > 0 ) {   
        const prevChar = state[rowIndex].lines[lineIndex][charIndex - 1]
        const removeCharsAmount = prevChar === '|' ? 1 : 0
        return mapStateRow(state, rowIndex, (content) => content
        .slice(0, charIndex - removeCharsAmount)
        .concat(content.slice(charIndex + 1, content.length)))
    } else if (rowIndex > 0) {
        if(state[rowIndex].lines[0].length === 1) {
            return state.slice(0, rowIndex).concat(state.slice(rowIndex + 1, state.length))
        }
        const combinedRow = {
            ...state[rowIndex],
            lines: state[rowIndex - 1].lines.map((line, index) => (
                line.concat(state[rowIndex].lines[index])
            ))
        }
        return state.slice(0, rowIndex - 1).concat(combinedRow, state.slice(rowIndex + 1, state.length))
    }
    return state
}


export const backspaceCoordsHelper = ({ rowIndex, lineIndex, charIndex }, stateTree) => {
    // If user just deletes => go left
    // If user deletes entire line => go to upper line        
    const prevChar = stateTree.rows[rowIndex].lines[lineIndex][charIndex - 1]
    const atEndOfRow = stateTree.rows[rowIndex].lines[lineIndex].length === charIndex + 1
    const goBackBy = (prevChar === '|' && atEndOfRow) ? 2 : 1
    if (charIndex > 0) {
        return {
            charIndex: charIndex - goBackBy
        }
    } else if (rowIndex > 0) {
        if(stateTree.rows[rowIndex].lines[0].length === 1) {
            return {
                rowIndex: rowIndex - 1,
                charIndex: stateTree.rows[rowIndex - 1].lines[lineIndex].length - 1     
            }       
        }
        return {
            rowIndex: rowIndex - 1,
            charIndex: stateTree.rows[rowIndex - 1].lines[lineIndex].length
        }
    }
}