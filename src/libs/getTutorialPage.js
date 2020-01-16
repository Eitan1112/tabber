import { goRight } from '../actions/coords' 
import { musicBreak, replaceChar } from '../actions/tabwriter'

export default (page) => {
        switch (page) {
            case 1:
                return {
                    left: 535,
                    top: 170,
                    width: 110,
                    height: 80,
                    text: 'Hit the arrows to move around!',
                    dispatch: [goRight, goRight]
                }
            case 2:
                return {
                    left: 50,
                    top: 70,
                    width: 344,
                    height: 40,
                    text: 'Hit any number to insert it!',
                    dispatch: [replaceChar]
                }
            case 3:
                return {
                    left: 142,
                    top: 205,
                    width: 220,
                    height: 40,
                    text: 'Hit space to add a music break!',
                    dispatch: [musicBreak]
                }
            case 4:
                return {

                }
            default:
                return

        }
    }