import parsePaste from '../libs/parsePaste'

export default (state, rowIndex, tabs, pasteType) => {
  const matches = parsePaste(tabs)
  if (matches.length % 6 !== 0 || matches.length === 0) {
    // If the pattern didn't match multiplie of 6 rows
    return state;
  }
  let newState = [];  
  for (let i = 0; i < matches.length; i = i + 6) {
    let newRow = { lines: [], section: undefined, lyrics: undefined };
    for (let j = i; j < i + 6; j++) {
      newRow.lines.push(matches[j][2]);
    }
    newState.push(newRow);
  }
  switch (pasteType) {
    case 'REPLACE':
      return newState
    case 'APPEND':
      return [...state, ...newState]
    case 'AT_SELECTOR':
      return state.slice(0, rowIndex + 1).concat(newState, state.slice(rowIndex + 1, state.length))
    default:
      return state
  }
};
