import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { startLogout, startLogin } from '../actions/auth'

const Header = (props) => (
    <Menu mode="horizontal" className="menu">
        <Menu.Item key="home-menu-item">                 
            <NavLink 
            exact={true} 
            to="/">               
                Home
            </NavLink>
        </Menu.Item>
        <Menu.Item key="tab-writer-menu-item" id="tab-writer-menu-item">
            <NavLink 
            exact={true} 
            to="/tabwriter">
                Tab Writer
            </NavLink>
        </Menu.Item>
        <Menu.Item key="login-logout-menu-item">
            {
                props.loggedIn ? 
                <div onClick={() => {
                    props.dispatch(startLogout())
                }}>
                    Sign Out
                </div>
                :
                <div onClick={() => {
                    props.dispatch(startLogin())
                }}>
                    Login
                </div>
            }
        </Menu.Item>
    </Menu>
)
            

const mapStateToProps = (state) => ({
    loggedIn: !!state.auth.uid,
    startLogout
})

export default connect(mapStateToProps)(Header)