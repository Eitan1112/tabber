import { goRight } from '../actions/coords' 
import { musicBreak, replaceChar, backspace, downline } from '../actions/tabwriter'

export default (page) => {
        switch (page) {
            case 1:
                return {
                    left: 535,
                    top: 170,
                    width: 110,
                    height: 80,
                    text: 'Hit the arrows to move around',
                    dispatch: [goRight, goRight]
                }
            case 2:
                return {
                    left: 50,
                    top: 70,
                    width: 344,
                    height: 40,
                    text: 'Hit any number to insert it',
                    dispatch: [replaceChar, goRight]
                }
            case 3:
                return {
                    left: 142,
                    top: 205,
                    width: 220,
                    height: 40,
                    text: 'Hit space to add a music break',
                    dispatch: [musicBreak]
                }
            case 4:
                return {
                    left: 460,
                    top: 70,
                    width: 70,
                    height: 40,
                    text: 'Hit backspace to delete',
                    dispatch: [backspace]
                }
            case 5:
                return {
                    left: 475,
                    top: 100,
                    width: 60,
                    height: 80,
                    text: 'Hit enter to add another line',
                    dispatch: [downline]
                }
            default:
                return {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                    text: 'You finished the tutorial!',
                    dispatch: []
                }

        }
    }

export const pages = 6