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
                    top: 50,
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
                    left: 215,
                    top: 50,
                    width: 60,
                    height: 55,
                }, { display: 'none' }],
                text: 'Save your tabs.',
                dispatch: []
            }
        case 10:
            return {
                styles: [{
                    position: 'fixed',
                    backgroundColor: backgroundColor,
                    left: 285,
                    top: 50,
                    width: 60,
                    height: 55,
                }, { display: 'none' }],
                text: 'Load  saved tabs.',
                dispatch: []
            }
        case 11:
            return {
                styles: [{
                    position: 'fixed',
                    backgroundColor: backgroundColor,
                    left: 355,
                    top: 50,
                    width: 60,
                    height: 55,
                }, { display: 'none' }],
                text: 'Paste tabs from anywhere.',
                dispatch: []
            }
        case 12:
            return {
                styles: [{
                    position: 'fixed',
                    backgroundColor: backgroundColor,
                    left: 495,
                    top: 50,
                    width: 130,
                    height: 55,
                }, { display: 'none' }],
                text: 'Import and Export tab files.',
                dispatch: []
            }
        case 13:
            return {
                styles: [{
                    position: 'fixed',
                    backgroundColor: backgroundColor,
                    right: 20,
                    top: 180,
                    width: 250,
                    height: 60,
                }, { display: 'none' }],
                text: 'Change the playing speed',
                dispatch: []
            }
        case 14:
            return {
                styles: [{
                    position: 'fixed',
                    backgroundColor: backgroundColor,
                    right: 20,
                    top: 240,
                    width: 250,
                    height: 60,
                }, { display: 'none' }],
                text: 'Change capo.',
                dispatch: []
            }
        case 15:
            return {
                styles: [{
                    position: 'fixed',
                    backgroundColor: backgroundColor,
                    right: 5,
                    top: 295,
                    width: 280,
                    height: 60,
                    zIndex: 20
                }, { display: 'none' }],
                text: 'Change tuning.',
                dispatch: []
            }
        case 16:
            return {
                styles: [{
                    position: 'fixed',
                    backgroundColor: backgroundColor,
                    right: 35,
                    top: 355,
                    width: 220,
                    height: 50,
                }, { display: 'none' }],
                text: 'Show or hide lyrics.',
                dispatch: []
            }
        case 17:
            return {
                styles: [{
                    position: 'fixed',
                    backgroundColor: backgroundColor,
                    right: 5,
                    top: 400,
                    width: 280,
                    height: 60,
                }, { display: 'none' }],
                text: 'Insert song name.',
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

export const pages = 18