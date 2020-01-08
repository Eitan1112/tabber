import React from 'react'
import { connect } from 'react-redux'

const dictionaryObject = {
    slash: 'slide up',
    backslash: 'slide down',
    h: 'hammer on',
    p: 'pull off',
    r: 'release bend',
    v: 'vibrato',
    t: 'tap',
    x: 'muted note'
}

const Dictionary = (props) => (
    <div class="dictionary">
        <div>**********</div>
        {
            Object.keys(props.dictionary.amount).map((key) => (
                props.dictionary.amount[key] > 0 && <div key={key}>{key.replace('backslash',  '\\')
                .replace('slash', '/')
                .replace('~', '~ / v') + ' - ' + dictionaryObject[key]}</div>
            
            ))
        }
        <div>**********</div>
    </div>
)
    

const mapStateToProps = (state) => ({
    dictionary: state.dictionary
})

export default connect(mapStateToProps)(Dictionary)
