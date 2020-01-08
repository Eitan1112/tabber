export const goRight = () => {
    return ({
    type: 'GO_RIGHT'
})}

export const goLeft = () => ({
    type: 'GO_LEFT'
})

export const goDown = (rows) => {
    return ({
    type: 'GO_DOWN',
    rows
})}

export const goEnd = () => ({
    type: 'GO_END'
})

export const goUp = (rows) => {
    return ({
        type: 'GO_UP',
        rows
    })
}

export const goStart = () => ({
    type: 'GO_START'
})
