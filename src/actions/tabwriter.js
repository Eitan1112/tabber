export const replaceChar = (char, coords) => ({
    type: 'REPLACE_CHAR',
    char,
    coords
})

export const downline = (coords) => ({
    type: 'DOWNLINE',
    coords
})

export const middleSpace = (coords, rows) => ({
    type: 'MIDDLE_SPACE',
    coords,
    rows   
})

export const musicBreak = (coords) => ({
    type: 'BREAK',
    coords
})

export const splittedDownline = (coords, rows) => ({
    type: 'SPLITTED_DOWNLINE',
    coords,
    rows
})

export const backspace = (coords, rows) => ({
    type: 'BACKSPACE',
    coords,
    rows
})

export const reset = () => ({
    type: 'RESET'
})

export const undo = (coords, rows) => ({
    type: 'UNDO',
    coords,
    rows
})

export const redo = (coords, rows) => ({
    type: 'REDO',
    coords,
    rows
})

export const pasteTabs = (tabs, pasteType) => ({
    type: 'PASTE_TABS',
    tabs,
    pasteType
})

export const changeSection = (section, rowIndex) => ({
    type: 'CHANGE_SECTION',
    section,
    rowIndex
})

export const importFile = (content) => ({
    type: 'IMPORT_FILE',
    content
})

export const changeLyrics = (lyrics, rowIndex) => ({
    type: 'CHANGE_LYRICS',
    lyrics,
    rowIndex
})

export const toggleLyrics = () => ({
    type: 'TOGGLE_LYRICS'
})