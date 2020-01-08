import React from 'react'
import { connect } from 'react-redux'
import handleSelected from '../utils/handleSelected'
import handlePlayedLine from '../utils/handlePlayedLine'

const Line = (props) => {
    return (
    <div>
        {props.settings.tuning.every((tune) => tune.length === 1) ?
            props.settings.tuning[props.lineIndex] 
            :
            props.settings.tuning[props.lineIndex].length === 1 ?
                props.settings.tuning[props.lineIndex].concat(' ')
                :
                props.settings.tuning[props.lineIndex]
        }
        |
        {
            (props.rowIndex === props.coords.rowIndex && props.lineIndex === props.coords.lineIndex) ? 
                handleSelected(props) 
                : 
                props.player.playing && props.player.coords.rowIndex === props.rowIndex ?
                    handlePlayedLine(props)
                    :
                    props.rows[props.rowIndex].lines[props.lineIndex]
        }
    </div>
)}

const mapStateToProps = (state) => {
    return ({...state})
}

export default connect(mapStateToProps)(Line)