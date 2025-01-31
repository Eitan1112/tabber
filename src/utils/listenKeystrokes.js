import { goRight, goLeft, goUp, goDown, goStart, goEnd, goRowStart, goRowEnd } from '../actions/coords'
import { replaceChar, downline, middleSpace, musicBreak, splittedDownline, backspace, undo, redo } from '../actions/tabwriter'

export default (e, store) => {
    const validChars = '0123456789\\/hpr~xtv-'
    if (e.key === 'ArrowRight') {
        e.preventDefault()
        return store.dispatch(goRight())   
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        return store.dispatch(goLeft())
    } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        return store.dispatch(goUp())                
    } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        return store.dispatch(goDown())                
    } else if (validChars.includes(e.key)) {
        return store.dispatch(replaceChar(e.key))
    } else if (e.key === 'Enter' && e.shiftKey) {
        return store.dispatch(downline())
    } else if (e.key === 'Enter' && !e.shiftKey) {
        return store.dispatch(splittedDownline())
    } else if (e.key === 'Backspace') {
        return store.dispatch(backspace())
    } else if (e.which === 32 && !e.shiftKey) { // Space
        return store.dispatch(musicBreak())
    } else if (e.which === 32 && e.shiftKey) { // Space
        return store.dispatch(middleSpace())
    } else if (e.key === 'z' && e.ctrlKey) {
        return store.dispatch(undo())
    } else if (e.key === 'y' && e.ctrlKey) {
        return store.dispatch(redo())
    } else if (e.key === 'PageUp') {
        return store.dispatch(goStart())
    } else if (e.key === 'PageDown') {
        return store.dispatch(goEnd())
    } else if (e.key === 'End') {
        return store.dispatch(goRowEnd())
    } else if (e.key === 'Home') {
        return store.dispatch(goRowStart())
    }
} 