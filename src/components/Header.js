import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { startLogout } from '../actions/auth'

// const handleIsActive = (match, location, to) => {
//     const selected = document.querySelector('.ant-menu-item-selected')
//     console.log(match, location, selected)
//     if (selected !== null) {
//         if (location.pathname === to) { // At location
            
//         } else if () { // Not at location

//         }
//     } else { 
//         // Check location
//         // highlight it
//     }
// }

const Header = (props) => (
    <Menu mode="horizontal" className="menu">
        <Menu.Item key="home-menu-item">                 
            <NavLink
            exact={true} 
            activeClassName="active-menu-item"
            to="/">               
                Home
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
                <div onClick={() => {
                    props.dispatch(startLogout())
                }}>
                    Sign Out
                </div>
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