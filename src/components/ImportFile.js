import React from 'react'
import { Modal, Icon, Upload, message } from 'antd'
import { pasteTabs } from '../actions/tabwriter'


const { Dragger } = Upload

class ImportFile extends React.Component {

    state = { visible: false, tabs: undefined }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        if (this.state.tabs !== undefined) {
            this.props.dispatch(pasteTabs(this.state.tabs, 'REPLACE'))
            message.success('Imported Successfuly')
        } else {
            message.error('Error getting file content')
        }
        this.setState({
            visible: false,
        });

    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handleUploadedFile = tabs => {
        this.setState({ tabs })
    }



    render() {
        return (
            <span>
                <span onClick={this.showModal}>
                    {this.props.children}
                </span>
                <Modal
                    title="Import File"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <div>
                        <Dragger
                            name="file"
                            disabled={false}
                            accept=".txt"
                            customRequest={({ file, onSuccess }) => {
                                setTimeout(() => onSuccess('ok'), 0)
                            }
                        }
                        onChange = {(info) => {
                            const { status } = info.file;
                            if (status !== 'uploading') {
                                let reader = new FileReader();
                                reader.onload = (e) => {
                                   this.handleUploadedFile(e.target.result)
                                }
                                reader.readAsText(info.file.originFileObj);
                            }
                        }}
                        >
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Dragger>
                    </div>
                </Modal>
            </span>
        );
    }
}

export default ImportFile