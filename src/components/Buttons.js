import { connect } from 'react-redux'
import React from 'react'
import { Tooltip, message, notification } from 'antd'
import { goStart, goEnd } from '../actions/coords'
import { pasteTabs } from '../actions/tabwriter'
import { saveTabs, startloadTabsNames } from '../actions/crudTabs'
import { startPlay, stopPlay } from '../actions/play'
import LoadTabs from './LoadTabs'
import PasteTabs from './PasteTabs'


const Buttons = (props) => (
    <div className="tab-writer-top-menu">   
        <button className="tab-writer-button" onClick={() => props.dispatch(goStart())}>
            <img alt="Go to start" src={require('../styles/img/step-backwards.svg')} />
        </button>
        <button className="tab-writer-button" onClick={() => props.player.playing ? props.dispatch(stopPlay()) : props.dispatch(startPlay()) }>
            <img alt="Play pause" src={require(`../styles/img/${props.player.playing ? 'pause' : 'play'}.svg`)} />
        </button>
        <button className="tab-writer-button" onClick={() => props.dispatch(goEnd())}>
            <img alt="Go to end" src={require('../styles/img/step-forwards.svg')} />
        </button>
        {
                !!props.auth.uid && (<span>
                    <Tooltip title="Save" placement="bottom">
                        <button className="tab-writer-button" onClick={() => (
                            document.getElementById('tabs-name').value !== '' ?
                                props.dispatch(saveTabs(JSON.parse(JSON.stringify(props))))
                                :
                                message.error('Please enter a name for your song')
                        ) }>
                            <img alt="Save" src={require('../styles/img/save.svg')} />
                        </button>
                    </Tooltip>
                    <LoadTabs>
                        <Tooltip title="Load Saved Tabs" placement="bottom">
                            <button className="tab-writer-button" onClick={() => props.dispatch(startloadTabsNames(props.auth.uid))}>
                                <img alt="Load" src={require('../styles/img/load.svg')} />
                            </button>
                        </Tooltip>
                    </LoadTabs>
                </span>
                )

            }
            <PasteTabs pasteTabs={pasteTabs} dispatch={props.dispatch}>
                <Tooltip title="Paste Tabs" placement="bottom">
                    <button className="tab-writer-button">
                        <img alt="Paste Tabs" src={require('../styles/img/paste.svg')} />
                    </button>
                </Tooltip>
            </PasteTabs>

            <Tooltip title="How to Use" placement="bottom">
                <button onClick={() => {
                    notification.open({
                        message: 'Welcome to the tutorial!',
                        description: 'Start by going around using the Arrow keys',
                        duration: 0
                    })
                }} className="tab-writer-button">
                    <img alt="How to Use" src={require('../styles/img/information.svg')} />
                </button>
            </Tooltip>

            
    </div>
)








// const Buttons1 = (props) => (
//     <div>
//     <button
//         onClick={() => {
//             props.dispatch(goRight())
//         }}>Right</button>
//     <button
//         onClick={ () => { props.dispatch(goLeft()) } } >
//             Left
//     </button>
//     <button
//         onClick={() => {
//             props.dispatch(goDown())
//         }}>Down</button>
//     <button
//         onClick={() => {
//             props.dispatch(goUp())
//         }}>Up</button>
//     {
//         [...Array(10).keys()].map((i) => {
//             return <button
//             onClick={() => { props.dispatch(replaceChar(String(i)))}}
//             key={`char-button-${i}`}
//             >{i}</button>            
//         })
//     }    
//     <button
//         onClick={() => {
//             props.dispatch(backspace())
//         }}>Backspace</button>
//     <button
//         onClick={() => {
//             props.dispatch(downline())
//         }}>Downline</button>
//     <button
//         onClick={() => {
//             props.dispatch(musicBreak())
//         }}>Break</button>
//     <button
//         onClick={() => {
//             props.dispatch(middleSpace())
//         }}>MiddleSpace</button>
//     <button
//         onClick={() => {
//             props.dispatch(splittedDownline())
//         }}>Splitted Downline</button>

//     <LoadTabs />

//     </div>
// )

const mapStateToProps = (state) => ({
    coords: state.coords,
    rows: state.rows,
    settings: state.settings,
    auth: state.auth,
    player: state.player
})

export default connect(mapStateToProps)(Buttons)