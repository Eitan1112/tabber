import mapStateLine from "../libs/mapStateLine"

export default (state, action, { rowIndex, lineIndex, charIndex }) => {  
    return mapStateLine(state, rowIndex, lineIndex, (content) => (
            content.slice(0, charIndex) + action.char + content.slice(charIndex + 1, content.length)
        )
    )
}