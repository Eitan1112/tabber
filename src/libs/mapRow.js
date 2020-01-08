export default (row, lineContent) => {
    return ({
    ...row,
    lines: row.lines.map((line, index) => (
        lineContent(line, index)
    ))    
})
}