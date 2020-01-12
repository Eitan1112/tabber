import { play, stopPlay } from '../actions/play'
import getNote from '../libs/getNote'
import mapRow from '../libs/mapRow'
import convertTuning from '../libs/convertTuning'
import { message } from 'antd'

const playColumn = (tuning, capo, charIndex, row) => {
    // Get current column (while check previous and next column for numbers)
    // Get tuning and capo
    // Get note for each tab in the column
    // Play'em

    const previousColumn = mapRow(row, (content) => content[charIndex]).lines
    const currentColumn = mapRow(row, (content) => content[charIndex + 1]).lines
    const nextColumn = mapRow(row, (content) => content[charIndex + 2]).lines

    let notes = []
    for (let i = 0; i < currentColumn.length; i++) {
        if(!isNaN(parseInt(currentColumn[i]))) { // If the char is a numebr

            if(!isNaN(parseInt(nextColumn[i])) && isNaN(parseInt(previousColumn[i]))) { //If there is a number in the next column (two digit note)

                notes.push(getNote(parseInt(currentColumn[i] + nextColumn[i]), capo, tuning[i]))  

            } else if (isNaN(parseInt(previousColumn[i]))) { // If this is a one digit note

                notes.push(getNote(parseInt(currentColumn[i]), capo, tuning[i]))
            }
        }
    }
    for (let note of notes) {
        try {
            document.getElementById(note.toLowerCase()).currentTime = 0
            document.getElementById(note.toLowerCase()).play()
        } catch {
            return false
        }
    }
    return true
}


export default ({ getState, dispatch }) => {
    return next => action => {
        next(action)
        if(action.type === 'START_PLAY') {

            let state = getState()
            const speed = 7000 / state.settings.speed
            const tuning = convertTuning(state.settings.tuning)
            const capo = state.settings.capo

            dispatch(play())
            const player = setInterval(() => {
                state = getState()
                if (state.player.playing === false) {
                    clearInterval(player)
                    dispatch(stopPlay())
                    return
                } else {
                    const coords = getState().player.coords
                    if(playColumn(tuning, capo, coords.charIndex, state.rows[coords.rowIndex])) {
                        dispatch(play())
                    } else {
                        dispatch(stopPlay())
                        message.warning('Unable to play tabs')
                    }
                }
            }, speed)
        }
    }
}