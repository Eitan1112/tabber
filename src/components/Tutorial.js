import React from 'react'
import { Modal } from 'antd'


class Tutorial extends React.Component {

    state = { visible: false}

    showModal = () => {
        this.setState({
            visible: true,
        })
    }

    handleOk = () => {
        this.setState({
            visible: false,
        })

    }

    handleCancel = e => {
        this.setState({
            visible: false,
        })
    }


    render() {
        return (
            <span>
                <span onClick={this.showModal}>
                    {this.props.children}
                </span>
                <Modal
                    title="Tutorial"
                    visible={this.state.visible}
                    footer={null}>
                    <div>
                        Move Around - Arrow keys <br />
                        Insert note - Numbers keys<br />
                        Add new line - Enter<br />
                        Insert special chars - Corresponding keys (p - pull-off, / - slide up, etc)<br />
                        Add music break - Space<br />
                        Add space in the middle of a row - Shift + Space<br />
                        Undo/Redo - Ctrl + Z/Y<br />
                        Delete - Backspace<br />
                        <br />
                        Notice you can paste tabs, save, load and play them. <br />
                        
                    </div>
                </Modal>
            </span>
        )
    }
}

export default Tutorial