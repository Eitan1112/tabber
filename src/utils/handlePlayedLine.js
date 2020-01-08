import React from 'react'

export default (state) => {
    const lineContent = state.rows[state.rowIndex].lines[state.lineIndex]
    return (
        <span>
            {lineContent.slice(0, state.player.coords.charIndex)}
            <span className="played">
                {lineContent[state.player.coords.charIndex]}
            </span>
            {lineContent.slice(state.player.coords.charIndex + 1, lineContent.length)}
        </span>
    )
}