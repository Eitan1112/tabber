import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import logo from '../styles/img/logo.svg'
import { startLogout } from '../actions/auth'

console.log(logo)

const Header = (props) => (
    <Menu mode="horizontal" className="menu">
        <Menu.Item key="home-menu-item">                 
            <NavLink
            exact={true} 
            to="/">               
                <img alt="Logo" src={logo} className="logo" />
            </NavLink>
        </Menu.Item>
        <Menu.Item key="tab-writer-menu-item" id="tab-writer-menu-item">
            <NavLink 
            activeClassName="active-menu-item"
            exact={true} 
            to="/tabwriter">
                Tab Writer
            </NavLink>
        </Menu.Item>
        <Menu.Item key="login-logout-menu-item">
            {
                props.loggedIn ? 
                <span onClick={() => {
                    props.dispatch(startLogout())
                }}>
                    Sign Out
                </span>
                :
                <NavLink
                exact={true}
                activeClassName="active-menu-item"
                to="/login">
                    Login
                </NavLink>
            }
        </Menu.Item>
    </Menu>
)
            

const mapStateToProps = (state) => ({
    loggedIn: !!state.auth.uid,
    startLogout
})

export default connect(mapStateToProps)(Header)