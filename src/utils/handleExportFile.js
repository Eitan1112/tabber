export default (rows, settings) => {
    var element = document.createElement('a')
    const name = settings.name !== undefined ? settings.name : 'Unnamed Song'
    console.log(name)
    let content = `${name}\n\nCapo: ${settings.capo}`
    rows.forEach((row) => {
        content += row.section !== undefined && row.section !== '' ? `\n\n${row.section}\n` : '\n\n'
        row.lines.forEach((line, index) => {
            content += `${settings.tuning[index]}|${line}\n`
        })
    })
    element.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', name)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}