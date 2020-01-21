import React from 'react'
import { Modal, Icon } from 'antd'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import getPageInfo, {pages} from '../libs/getTutorialPage'

function getElementPropertyValue( element, property ) {
    return window.getComputedStyle(element, null).getPropertyValue(property)
}

const changeLocation = (elem, x, y) => {
    const left = parseInt(getElementPropertyValue(elem, 'left'), 10)
    const top = parseInt(getElementPropertyValue(elem, 'top'), 10)
    const dx = left - x
    const dy = top - y
    let i = 1
    const count = 20
    const delay = 20
    
    const loop = () => {
        if ( i >= count ) { 
            return
        }
        i += 1
        elem.style.left = (left - (dx * i / count) ).toFixed(0) + 'px'
        elem.style.top = (top - (dy * i / count) ).toFixed(0) + 'px'
        setTimeout(loop, delay)
    }    
    loop();
}

const changeSize = (elem, x, y) => {
    const width = parseInt(getElementPropertyValue(elem, 'width'), 10)
    const height = parseInt(getElementPropertyValue(elem, 'height'), 10)
    const dx = width - x
    const dy = height - y
    let i = 1
    const count = 20
    const delay = 20
    
    const loop = () => {
        if ( i >= count ) { 
            return
        }
        i += 1
        elem.style.width = (width - (dx * i / count) ).toFixed(0) + 'px'
        elem.style.height = (height - (dy * i / count) ).toFixed(0) + 'px'
        setTimeout(loop, delay)
    }    
    loop();
}

class Keyboard extends React.Component {
    render() {
        return (
            <div className="keyboard-wrapper">
                <div className="keyboard-image">
                    <div className="keyboard-color">
                        <div className="keyboard-highlight" id="keyboard-highlight-1"></div>
                        <div className="keyboard-highlight" id="keyboard-highlight-2"></div>
                    </div>
                </div>
            </div>
        )   
    }
}

class Tutorial extends React.Component {
    constructor(props) {
        super(props);    
        this.state = { visible: false, page: 0, playing: false }
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleStartTutorial = () => {
        ReactDOM.render(<Keyboard />, document.getElementsByClassName('ant-modal-mask')[0])
        this.setState({ playing: true })
        this.handleChangePage()
    };

    handleChangePage = (goBy = 1) => {
        const page = typeof goBy === 'number' ? this.state.page + goBy : this.state.page + 1
        if (page <= pages) {
            const { left, top, width, height, text, dispatch } = getPageInfo(page)
            this.setState({ page })
            document.getElementById('tutorial-text').innerHTML = text
            const element = document.getElementById('keyboard-highlight-1')
            changeLocation(element, left, top)
            changeSize(element, width, height)
            dispatch.forEach((action, index) => {
                setTimeout(() => this.props.dispatch(action()), index * 750)
            })
        }
    }

    firstPageText = 'Do you want to watch the tutorial?'

    handleCancel = e => {
        document.getElementById('tutorial-text').innerHTML = this.firstPageText
        this.setState({
            visible: false,
            page: 0,
            playing: false
        },)
        document.getElementsByClassName('ant-modal-mask')[0].innerHTML = ''
    };


    render() {
        return (
            <span>
                <span onClick={this.showModal}>
                    {this.props.children}
                </span>
                <Modal
                    title="Tutorial"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={(
                        <div className="tutorial-container">
                        <button 
                        className="tutorial-button tutorial-button-no" 
                        onClick={this.state.playing ? () => this.handleChangePage(-1) : this.handleCancel}>
                        {
                            this.state.playing ?                                
                            <Icon type="caret-left" />
                            : 
                            'No'
                        }
                        </button>
                        <button 
                        className="tutorial-button tutorial-button-yes" 
                        onClick={
                            this.state.playing ?
                                this.state.page === pages ?
                                this.handleCancel
                                :
                                this.handleChangePage 
                            : 
                            this.handleStartTutorial
                        }>
                        {
                            this.state.playing ?
                            <Icon type="caret-right" />
                            : 
                            'Yes'
                        }
                        </button>
                        </div>
                    )}
                    width="300px">
                    <div>
                        <span id="tutorial-text">
                            {this.firstPageText}
                        </span>                           
                    </div>
                </Modal>
            </span>
        )
    }
}


const mapStateToProps = (state) => ({dispatch: state.dispatch})

export default connect(mapStateToProps)(Tutorial)