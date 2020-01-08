import { connect } from 'react-redux'
import React from 'react'
import { Input, message } from 'antd'
import { undo, redo,  } from '../actions/tabwriter'
import { changeSpeed, changeCapo, changeTuning, changeName } from '../actions/settings'
import convertTuning from '../libs/convertTuning'


const handleChangeTuning = (dispatch) => {
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

const Buttons = (props) => (
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
                        onChange={() => handleChangeTuning(props.dispatch)} />
                ))
            }
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











        /* <button
        onClick={() => {
            props.dispatch(goRight())
        }}>Right</button>
    <button
        onClick={ () => { props.dispatch(goLeft()) } } >
            Left
    </button>
    <button
        onClick={() => {
            props.dispatch(goDown())
        }}>Down</button>
    <button
        onClick={() => {
            props.dispatch(goUp())
        }}>Up</button>
    {
        [...Array(10).keys()].map((i) => {
            return <button
            onClick={() => { props.dispatch(replaceChar(String(i)))}}
            key={`char-button-${i}`}
            >{i}</button>            
        })
    }    
    <button
        onClick={() => {
            props.dispatch(backspace())
        }}>Backspace</button>
    <button
        onClick={() => {
            props.dispatch(downline())
        }}>Downline</button>
    <button
        onClick={() => {
            props.dispatch(musicBreak())
        }}>Break</button>
    <button
        onClick={() => {
            props.dispatch(middleSpace())
        }}>MiddleSpace</button>
    <button
        onClick={() => {
            props.dispatch(splittedDownline())
        }}>Splitted Downline</button> */







const mapStateToProps = (state) => ({
    coords: state.coords,
    rows: state.rows,
    settings: state.settings,
    auth: state.auth,
    player: state.player
})

export default connect(mapStateToProps)(Buttons)

