import React from 'react'
import { connect } from 'react-redux'
import { Select } from 'antd'
import Line from './Line'
import { changeSection, changeLyrics } from '../actions/tabwriter'

const { Option } = Select

const Row = (props) => (
    <div className="tab-writer-row">
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
        {
            props.visible_lyrics &&
            <input 
            className="lyrics-input" 
            id={`lyrics-input-${props.rowIndex}`} 
            placeholder="Click to add lyrics"
            value={props.rows[props.rowIndex].lyrics || ''}
            style={{width: props.rows[props.rowIndex].lyrics ? props.rows[props.rowIndex].lyrics.length * 8.5 : 150}}
            onChange={() => {
                const element = document.getElementById(`lyrics-input-${props.rowIndex}`)
                element.style.width = element.value.length * 8.5 > 150 ? element.value.length * 8.5 + 'px' : '150px'
                return props.dispatch(changeLyrics(element.value, props.rowIndex))
            }}
             />
        }
        <br />
        <br />
    </div>
)

const mapStateToProps = (state) => {
    return    ({
    coords: state.coords,
    rows: state.rows,
    visible_lyrics: state.settings.visible_lyrics
})
}

export default connect(mapStateToProps)(Row)