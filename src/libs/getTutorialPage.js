import React from 'react'
import { goRight, goLeft, goRowStart, goRowEnd, goStart, goEnd } from '../actions/coords'
import { musicBreak, replaceChar, backspace, downline, middleSpace, reset } from '../actions/tabwriter'

const backgroundColor = `rgba(${150}, ${150}, ${150}, ${0.5})`

export default (page) => {
    switch (page) {
        case 0:
            return {
                styles: [{
                    left: 535,
                    top: 170,
                    width: 110,
                    height: 80,
                }, { display: 'none' }],
                text: 'Hit the arrows to move around',
                dispatch: [goRight, goRight]
            }
        case 1:
            return {
                styles: [{
                    left: 50,
                    top: 70,
                    width: 344,
                    height: 40,
                }, { display: 'none' }],
                text: 'Hit any number to insert it',
                dispatch: [replaceChar, goRight]
            }
        case 2:
            return {
                styles: [{
                    left: 142,
                    top: 205,
                    width: 220,
                    height: 40,
                }, { display: 'none' }],
                text: 'Hit Space to add a music break',
                dispatch: [musicBreak]
            }
        case 3:
            return {
                styles: [{
                    left: 460,
                    top: 70,
                    width: 70,
                    height: 40,
                }, { display: 'none' }],
                text: 'Hit Bbackspace to delete',
                dispatch: [backspace]
            }
        case 4:
            return {
                styles: [{
                    left: 475,
                    top: 100,
                    width: 60,
                    height: 80,
                }, { display: 'none' }],
                text: 'Hit Enter to add another line.',
                dispatch: [downline]
            }
        case 5:
            return {
                styles: [{
                    left: 142,
                    top: 205,
                    width: 220,
                    height: 40,
                }, {
                    left: 15,
                    top: 170,
                    width: 85,
                    height: 40,
                }
                ],
                text: 'Hit Shift + Space to add space between chars.',
                dispatch: [goRight, replaceChar, goRight, replaceChar, goLeft, middleSpace]
            }
        case 6:
            return {
                styles: [{
                    left: 535,
                    top: 40,
                    width: 110,
                    height: 80,
                }, { display: 'none' }],
                text: 'Hit End, Home, PgUp, PgDn to move to start / end of row / song',
                dispatch: [goRowStart, goRowEnd, goStart, goEnd]
            }
        case 7:
            return {
                styles: [{
                    left: 80,
                    top: 100,
                    width: 400,
                    height: 100,
                }, { display: 'none' }],
                text: 'Hit special chars to add slides, pull-off, hammer etc.',
                dispatch: [goRight, replaceChar, goRight, () => replaceChar('h'), goRight, () => replaceChar(3)]
            }
        case 8:
            return {
                styles: [{
                    position: 'fixed',
                    backgroundColor,
                    left: 75,
                    top: 45,
                    width: 60,
                    height: 55,
                }, { display: 'none' }],
                text: 'Play your tabs.',
                dispatch: []
            }
        case 9:
            return {
                styles: [{
                    position: 'fixed',
                    backgroundColor: backgroundColor,
                    left: 200,
                    top: 45,
                    width: 60,
                    height: 55,
                }, { display: 'none' }],
                text: 'Paste tabs from anywhere!',
                dispatch: []
            }
        default:
            return {
                styles: [{
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                }, { display: 'none' }],
                text: 'You finished the tutorial!',
                dispatch: [reset]
            }

    }
}

export const pages = 10