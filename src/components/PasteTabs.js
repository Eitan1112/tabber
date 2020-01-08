import React from 'react'
import { Modal, Radio, Input } from 'antd'

const { TextArea } = Input;

class PasteTabs extends React.Component {

    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        const tabs = document.getElementById('paste-tabs-textarea').value
        const pasteTabs = document.querySelector('input[type="radio"]:checked').value;
        // console.log(this.props, 'From')
        this.props.dispatch(this.props.pasteTabs(tabs, pasteTabs))
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <span>
                <span onClick={this.showModal}>
                {this.props.children}
                </span>
                <Modal
                title="Paste Tabs"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                    <TextArea placeholder="Paste Tabs Here" id="paste-tabs-textarea" />
                    <Radio.Group defaultValue="REPLACE">
                    <Radio.Button value="REPLACE">Paste & Replace</Radio.Button>
                    <Radio.Button value="APPEND">Paste to End</Radio.Button>
                    <Radio.Button value="AT_SELECTOE">Paste after Selector</Radio.Button>
                    </Radio.Group>
                </Modal>
            </span>
        );
    }
}


// function onChange(e) {
//   console.log(`radio checked:${e.target.value}`);
// }

//   <div>
//     <div>
//       <Radio.Group onChange={onChange} defaultValue="a">
//         <Radio.Button value="a">Hangzhou</Radio.Button>
//         <Radio.Button value="b">Shanghai</Radio.Button>
//         <Radio.Button value="c">Beijing</Radio.Button>
//         <Radio.Button value="d">Chengdu</Radio.Button>
//       </Radio.Group>
//     </div>
//     <div style={{ marginTop: 16 }}>
//       <Radio.Group onChange={onChange} defaultValue="a">
//         <Radio.Button value="a">Hangzhou</Radio.Button>
//         <Radio.Button value="b" disabled>
//           Shanghai
//         </Radio.Button>
//         <Radio.Button value="c">Beijing</Radio.Button>
//         <Radio.Button value="d">Chengdu</Radio.Button>
//       </Radio.Group>
//     </div>
//     <div style={{ marginTop: 16 }}>
//       <Radio.Group disabled onChange={onChange} defaultValue="a">
//         <Radio.Button value="a">Hangzhou</Radio.Button>
//         <Radio.Button value="b">Shanghai</Radio.Button>
//         <Radio.Button value="c">Beijing</Radio.Button>
//         <Radio.Button value="d">Chengdu</Radio.Button>
//       </Radio.Group>
//     </div>
//   </div>,
//   mountNode,
// );

export default PasteTabs