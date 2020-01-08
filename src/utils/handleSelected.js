import React from 'react'

export default (state) => {
    const lineContent = state.rows[state.rowIndex].lines[state.lineIndex]
    return (
        <span>
            {lineContent.slice(0, state.coords.charIndex)}
            <span className="selected">
                {lineContent[state.coords.charIndex]}
            </span>
            {lineContent.slice(state.coords.charIndex + 1, lineContent.length)}
        </span>
    )
}