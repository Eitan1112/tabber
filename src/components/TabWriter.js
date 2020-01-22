import React from 'react'
import Buttons from './Buttons'
import TabWriterRow from './Row'
import { connect } from 'react-redux'
import Sound from './Sound'
import Dictionary from './Dictionary'
import listenKeystrokes from '../utils/listenKeystrokes'
import Header from './Header'
import Sidebar from './Sidebar'
import { message } from 'antd'

const TabWriter = (props) => (
    <div 
    className="tab-writer-root"
    onLoad={() => { document.getElementById('tab-writer-rows-container').focus() }}>
        <Header />
        <Buttons />
        <div className="tab-writer-rows-sidebar-container">
            <div 
            tabIndex={0}
            className="tab-writer-rows-container" 
            id="tab-writer-rows-container"
            
            onKeyDown={props.player.playing ? () => { message.warning("You can't edit while playing")} : (e) => { listenKeystrokes(e, props) }}>        
            {
                props.rows.map((row, index) => (
                    <TabWriterRow 
                    rowIndex={index}
                    key={index}/>
                ))
            }
            {
                props.dictionary.isDisplayed && <Dictionary />
            }
            </div>
            <div className="tab-writer-sidebar-container">
                <Sidebar />
            </div>
        </div>
        <Sound />
                
    </div>      
)
const mapStateToProps = (state) => ({...state})


export default connect(mapStateToProps)(TabWriter)