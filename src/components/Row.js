import React from 'react'
import { connect } from 'react-redux'
import { Select, Icon } from 'antd'
import Line from './Line'
import {changeSection} from '../actions/tabwriter'

const {Option} = Select

 const Row = (props) => (
    <div className="tab-writer-row">

    {
        console.log('From rows', props.rows[props.rowIndex].section)
    }
        <Select 
        className="row-section-select"
        value={props.rows[props.rowIndex].section || 'Section'}
        onChange={(value) => {
            props.dispatch(changeSection(value, props.rowIndex))
        }}>
            <Option value='Section'>
                [Section]
            </Option>
            <Option value="Intro">
                [Intro]
            </Option>
            <Option value="Verse">
                [Verse]
            </Option>
            <Option value="Pre Chorus">
                [Pre Chorus]
            </Option>
            <Option value="Chorus">
                [Chorus]
            </Option>
            <Option value="Bridge">
                [Bridge]
            </Option>
            <Option value="Outro">
                [Outro]
            </Option>
            <Option value="Solo">
                [Solo]
            </Option>
        </Select>
        {
            [...Array(6).keys()].map((i) => {
                return <Line
                rowIndex={props.rowIndex}
                lineIndex={i}
                key={String(props.rowIndex) + String(i)} />
            })
        }
        <br />
    </div>
)

const mapStateToProps = (state) => ({
    coords: state.coords,
    rows: state.rows
})

export default connect(mapStateToProps)(Row)