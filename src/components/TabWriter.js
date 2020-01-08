import React from 'react'
import { Row, Col } from 'antd'
import Buttons from './Buttons'
import TabWriterRow from './Row'
import { connect } from 'react-redux'
import Sound from './Sound'
import Dictionary from './Dictionary'
import listenKeystrokes from '../utils/listenKeystrokes'
import Header from './Header'
import Sidebar from './Sidebar'

const TabWriter = (props) => (
    <div 
    className="tab-writer-root"
    onLoad={() => { document.getElementById('tab-writer-rows-container').focus() }}>
        <Header />
        <Buttons />
        <Row>
            <Col 
            tabIndex={0}
            span={20}
            className="tab-writer-rows-container" 
            id="tab-writer-rows-container"
            
            onKeyDown={(e) => { listenKeystrokes(e, props) }}>        
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
            </Col>
            <Col span={4}>
                <Sidebar />
            </Col>
        </Row>
        <Sound />
                
    </div>      
)
const mapStateToProps = (state) => ({...state})


export default connect(mapStateToProps)(TabWriter)