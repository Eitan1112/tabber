import { tabsRowPattern, sectionPattern } from '../libs/pasteRegexPattern'

const newPaste = (state, rowIndex, paste, pasteType) => {
  paste = paste.split('\n')
  let newState = []

  let tempRow = {
    lines: [],
    section: undefined,
    lyrics: undefined
  }

  paste.forEach((line) => {
    const sectionMatches = sectionPattern(line)
    const rowsMatches = tabsRowPattern(line)
    if (sectionMatches != null && sectionMatches.length === 1) {
      tempRow.section = sectionMatches[0]
    }
    if (rowsMatches !== null && rowsMatches.length === 1) {
      tempRow.lines.push(rowsMatches[0][2])
    } else if (tempRow.lines.length !== 0) {
      tempRow = {
        lines: [],
        section: undefined,
        lyrics: undefined
      }
    }
    if (tempRow.lines.length === 6) {
      newState.push(tempRow)
      tempRow = {
        lines: [],
        section: undefined,
        lyrics: undefined
      }
    }

  })

  switch (pasteType) {
    case 'REPLACE':
      return newState
    case 'APPEND':
      return [...state, ...newState]
    case 'AT_SELECTOR':
      console.log(state)
      return state.slice(0, rowIndex + 1).concat(newState, state.slice(rowIndex + 1, state.length))
    default:
      return state
  }
}

export default newPaste