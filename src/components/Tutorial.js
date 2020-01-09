import React from 'react'
import { Tooltip, notification, message } from 'antd'
import { connect } from 'react-redux'
import listenKeystrokes from '../utils/listenKeystrokes'



class Tutorial extends React.Component {
    
    state = { visible: false, page: 0, prevState: this.props }
    

    
    handleStartTutorial = () => {
        document.getElementById('tab-writer-rows-container').onkeydown = (e) => {
            this.checkTutorialStage(e)
        }
        notification.open({
            message: 'Tutorial',
            description: (
            <div>
                Go around using the keyboard arrows!
                <img className="keyboard-animation" src={require('../styles/img/right-arrow.png')}></img>
            </div>
            ),
            duration: 0
        })
        document.getElementById('tab-writer-rows-container').focus()
    }
    
    checkTutorialStage = (e) => {
        switch (this.state.page) {
            case 0: {
                this.handleChangePage(1)
            }
            case 1: {
                const validNumbers = '0123456789'
                if (validNumbers.includes(e.key)) {
                    this.handleChangePage(1)
                }
            }
        }

    }
    
    handleChangePage = (goBy) => {
        this.setState({page: this.state.page + goBy})
        document.querySelector('.ant-notification-notice-close').click()
        notification.open({
            ...this.getPageNotification(this.state.page),
            duration: 0
        })
    }


    getPageNotification = (newPage) => {
        switch(newPage) {
            case 1:
                return {
                    message: 'Tutorial',
                    description: 'Now replace the char using any number key'
                }
            case 2:
                    return {
                        message: 'Tutorial',
                        description: 'You can try and '
                    }        
            case 3:
                return {
                    message: '',
                    description: ''
                }
            case 4:
                    return {
                        message: '',
                        description: ''
                    }    
            case 5:
                return {
                    message: '',
                    description: ''
                }
            case 6:
                return {
                    message: '',
                    description: ''
                }                                  
        }
    }
    

    render() {
        return (
            <Tooltip title="Tutorial" placement="bottom">
                <button onClick={this.handleStartTutorial} className="tab-writer-button">
                    <img alt="Tutorial" src={require('../styles/img/information.svg')} />
                </button>
                <button onClick={() => console.log(this.state)}>
                    Yep
                </button>

            </Tooltip>
        )
    }
}


const mapStateToProps = (state) => ({...state})

export default connect(mapStateToProps)(Tutorial)