import { connect } from 'react-redux'
import React from 'react'
import { Tooltip, message } from 'antd'
import { goStart, goEnd } from '../actions/coords'
import { pasteTabs, reset } from '../actions/tabwriter'
import { saveTabs, startloadTabsNames } from '../actions/crudTabs'
import { startPlay, stopPlay } from '../actions/play'
import LoadTabs from './LoadTabs'
import PasteTabs from './PasteTabs'
import ImportFile from './ImportFile'
import handleExportFile from '../utils/handleExportFile'
import Tutorial from './Tutorial'



const Buttons = (props) => (
    <div className="tab-writer-top-menu">
        <button className="tab-writer-button" onClick={() => props.dispatch(goStart())}>
            <img alt="Go to start" src={require('../styles/img/step-backwards.svg')} />
        </button>

        <button className="tab-writer-button" onClick={() => props.player.playing ? props.dispatch(stopPlay()) : props.dispatch(startPlay())}>
            <img alt="Play pause" src={require(`../styles/img/${props.player.playing ? 'pause' : 'play'}.svg`)} />
        </button>

        <button className="tab-writer-button" onClick={() => props.dispatch(goEnd())}>
            <img alt="Go to end" src={require('../styles/img/step-forwards.svg')} />
        </button>
        <span>
            <Tooltip title="Save" placement="bottom">
                <button 
                className="tab-writer-button" 
                onClick={
                    !!props.auth.uid ? // Is Logged In
                    () => (
                    document.getElementById('tabs-name').value !== '' ?
                        props.dispatch(saveTabs(JSON.parse(JSON.stringify(props))))
                        :
                        message.error('Please enter a name for your song')
                    )
                    :
                    () => message.error('You need to login in order to save tabs!')
                }>
                    <img alt="Save" src={require('../styles/img/save.svg')} />
                </button>
            </Tooltip>

            <LoadTabs>
                <Tooltip title="Load Saved Tabs" placement="bottom">
                    <button 
                    className="tab-writer-button" 
                    onClick={
                        !!props.auth.uid ? 
                        () => props.dispatch(startloadTabsNames(props.auth.uid))
                        :
                        () => message.error('You need to login in order to load save tabs!')
                    }>
                        <img alt="Load" src={require('../styles/img/load.svg')} />
                    </button>
                </Tooltip>
            </LoadTabs>
        </span>



        <PasteTabs pasteTabs={pasteTabs} dispatch={props.dispatch}>
            <Tooltip title="Paste Tabs" placement="bottom">
                <button className="tab-writer-button">
                    <img alt="Paste Tabs" src={require('../styles/img/paste.svg')} />
                </button>
            </Tooltip>
        </PasteTabs>



        <Tooltip title="Reset" placement="bottom">
            <button onClick={() => props.dispatch(reset())} className="tab-writer-button">
                <img alt="Reset" src={require('../styles/img/reset.svg')} />
            </button>
        </Tooltip>

        <ImportFile dispatch={props.dispatch}>
            <Tooltip title="Import File" placement="bottom">
                <button className="tab-writer-button">
                    <img alt="Import" src={require('../styles/img/import.svg')} />
                </button>
            </Tooltip>
        </ImportFile>


        <Tooltip title="Export File" placement="bottom">
            <button className="tab-writer-button" id="export-file" onClick={() => { handleExportFile(props.rows, props.settings) }}>
                <img alt="Export to File" src={require('../styles/img/export.svg')} />
            </button>
        </Tooltip>

        <Tutorial>
            <Tooltip title="Tutorial" placement="bottom">
                <button className="tab-writer-button">
                    <img alt="Tutorial" src={require('../styles/img/tutorial.svg')} />
                </button>
            </Tooltip>
        </Tutorial>

        <button className="tab-writer-button open-sidebar-button"
            onClick={() => {
                let display = document.querySelector('.tab-writer-sidebar-container').style.display
                document.querySelector('.tab-writer-sidebar-container').style.display = display === 'initial' ? 'none' : 'initial'
            }}>
            <img alt="Open Sidebar" src={require('../styles/img/settings.svg')} />
        </button>

    </div>
)


const mapStateToProps = (state) => ({
    coords: state.coords,
    rows: state.rows,
    settings: state.settings,
    auth: state.auth,
    player: state.player
})

export default connect(mapStateToProps)(Buttons)