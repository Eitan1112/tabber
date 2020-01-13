import { connect } from 'react-redux'
import React from 'react'
import { Input, message, Switch } from 'antd'
import { undo, redo, toggleLyrics } from '../actions/tabwriter'
import { changeSpeed, changeCapo, changeTuning, changeName } from '../actions/settings'
import convertTuning from '../libs/convertTuning'


const handleChangeTuning = (dispatch, index) => {
    let tuning = []
    let temp = ''
    for (let i = 0; i < 6; i++) {
        temp = document.getElementById(`tuning-${i}`).value
        if (temp === '') {
            return
        }
        tuning.push(temp)
    }
    try {
        convertTuning(tuning)
        dispatch(changeTuning(tuning))
        message.success('Changed Tuning')
    } catch (e) {
        message.error('Invalid Tuning')
    }
}

const Sidebar = (props) => (
    <div className="tab-writer-sidebar">

        <div className="tab-writer-centered-row">
            <button className="tab-writer-button" onClick={() => { props.dispatch(undo()) }}>
                <img alt="Go to end" src={require('../styles/img/undo.svg')} />
            </button>
            <button className="tab-writer-button" onClick={() => { props.dispatch(redo()) }}>
                <img alt="Go to end" src={require('../styles/img/redo.svg')} />
            </button>
        </div>


        <input
            type="range"
            id="speed-range"
            min={1} max={100}
            value={props.settings.speed}
            onChange={() => {
                props.dispatch(changeSpeed(document.getElementById('speed-range').value))
            }} />


        <div className="tab-writer-sidebar-text">
            Speed:
            <span id="tab-writer-speed-value">{(props.settings.speed)}</span>
        </div>

        <input
            type="range"
            id="capo-range"
            min={0} max={12}
            value={props.settings.capo}
            onChange={() => {
                props.dispatch(changeCapo(document.getElementById('capo-range').value))
            }} />

        <div className="tab-writer-sidebar-text">
            Capo:
            <span id="tab-writer-capo-value">{(props.settings.capo)}</span>
        </div>


        <div className="tab-writer-tuning-input-wrapper" >
            {
                props.settings.tuning.map((tuneObject, index) => (
                    <input
                        type="text"
                        maxLength={2}
                        id={`tuning-${index}`}
                        key={`tune-${tuneObject}-${index}`}
                        defaultValue={tuneObject}
                        onChange={() => handleChangeTuning(props.dispatch, index)} />
                ))
            }
        </div>
        
        <div className="sidebar-switch">
            <Switch defaultChecked onChange={() => props.dispatch(toggleLyrics())} />
            <span>Toggle Lyrics</span>
        </div>

        <Input
            placeholder="Name"
            id="tabs-name"
            value={props.settings.name}
            onChange={() => {
                const name = document.getElementById('tabs-name').value
                props.dispatch(changeName(name))
            }} />


    </div>
)

const mapStateToProps = (state) => ({
    coords: state.coords,
    rows: state.rows,
    settings: state.settings,
    auth: state.auth,
    player: state.player
})

export default connect(mapStateToProps)(Sidebar)

