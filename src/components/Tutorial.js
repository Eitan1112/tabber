import React from 'react'
import { Modal, Icon } from 'antd'
import { connect } from 'react-redux'
import getPageInfo, { pages } from '../libs/getTutorialPage'
import { reset } from '../actions/tabwriter'

const Keyboard = (props) => {
    return (
        <div className="keyboard-wrapper">
            <div className="keyboard-image">
                <div className="keyboard-color">
                    <div className="keyboard-highlight" id="keyboard-highlight-1" style={props.styles[0]}></div>
                    <div className="keyboard-highlight" id="keyboard-highlight-2" style={props.styles[1]}></div>
                </div>
            </div>
        </div>
    )
}

class Tutorial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            page: undefined,
            styles: undefined,
            text: undefined
        }
    }

    toggleModal = () => {
        if (this.state.visible) { // Closing
            this.props.dispatch(reset())
            this.setState({
                visible: !this.state.visible,
                page: undefined,
                styles: undefined,
                text: undefined
            })
        } else { // Opening
            this.setState({
                visible: !this.state.visible,
                page: 0,
                styles: getPageInfo(0).styles,
                text: getPageInfo(0).text
            })
        }
    }

    handleNext = () => {
        const isAtEnd = this.state.page === pages
        if (isAtEnd) {
            this.setState({ visible: false, page: undefined, styles: undefined })
        } else {
            const { styles, text, dispatch } = getPageInfo(this.state.page + 1)
            dispatch.forEach((action, index) => setTimeout(() => this.props.dispatch(action()), (index + 1) * 150))
            this.setState({
                page: this.state.page + 1,
                styles: styles,
                text
            })
        }
    }

    handlePrev = () => {
        const isAtStart = this.state.page === 0
        if (isAtStart) {
            this.setState({ visible: false, page: undefined, styles: undefined })
        } else {
            const { styles, text } = getPageInfo(this.state.page - 1)
            this.setState({
                page: this.state.page - 1,
                styles: styles,
                text
            })
        }
    }

    render() {
        return (
            <span>
                {
                    this.state.page < pages && <Keyboard styles={this.state.styles} />
                }
                <span onClick={this.toggleModal}>
                    {this.props.children}
                </span>
                <Modal
                    title="Tutorial"
                    visible={this.state.visible}
                    onCancel={this.toggleModal}
                    footer={(
                        <div className="tutorial-container">
                            <button
                                className="tutorial-button tutorial-button-no"
                                onClick={this.handlePrev} >
                                <Icon type="caret-left" />
                            </button>
                            <button
                                className="tutorial-button tutorial-button-yes"
                                onClick={this.handleNext}>
                                <Icon type="caret-right" />
                            </button>
                        </div>
                    )}
                    width="300px">
                    <div>
                        <span id="tutorial-text">
                            {this.state.text}
                        </span>
                    </div>
                </Modal>
            </span>
        )
    }
}


const mapStateToProps = (state) => ({ dispatch: state.dispatch })

export default connect(mapStateToProps)(Tutorial)