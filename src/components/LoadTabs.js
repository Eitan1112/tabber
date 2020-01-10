import React from 'react'
import { connect } from 'react-redux'
import { Modal, List, Icon } from 'antd'
import { startLoadTabs, removeTabs, startloadTabsNames } from '../actions/crudTabs'

class Load extends React.Component {

    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
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
                    footer={null}
                    title="Load Tabs"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <div>
                        <List
                            bordered
                            dataSource={this.props.auth.songs}
                            renderItem={(song) => (
                                <List.Item
                                    key={song.id}
                                    className="load-tabs-list-item"
                                    actions={[
                                        <Icon type="delete" key={`remove-${song.id}`} onClick={(event) => {
                                            this.props.dispatch(removeTabs(this.props.auth.uid, song.id))
                                            event.stopPropagation();
                                            this.props.dispatch(startloadTabsNames(this.props.auth.uid))
                                        }} />
                                    ]}
                                    onClick={() => {
                                        this.props.dispatch(startLoadTabs(this.props.auth.uid, song.id))
                                        this.handleOk()
                                    }

                                    }>
                                    {
                                        song.name
                                    }

                                </List.Item>
                            )}
                        />
                    </div>
                </Modal>
            </span>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Load)