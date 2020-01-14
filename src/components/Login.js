import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { firebase } from '../firebase/firebase'
import Header from './Header'
import { startLogin } from '../actions/auth';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        firebase.auth().signInWithEmailAndPassword(values.email, values.password).then(() => {
          message.success('Login succesful')
        }).catch(function(error) {
          message.error('Unable to log you in')
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(getFieldDecorator)
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
      <h2>
        Login
      </h2>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Link className="login-form-forgot" to="/reset-password">
            Forgot password
          </Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <Button className="google-login"  onClick={() => this.props.dispatch(startLogin())}>
            <img className="custom-icon" src={require('../styles/img/google.svg')}/>
            Sign in with Google
          </Button>
          Or <Link to='/register'>register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
    loggedIn: !!state.auth.uid
})

const ConnectedNormalLoginForm = connect(mapStateToProps)(NormalLoginForm)

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(ConnectedNormalLoginForm);

const Login = () => (
    <div className='login-root'>
        <Header />
        <div>
            <div className='login-wrapper'>
                <WrappedNormalLoginForm />
            </div>
        </div>
    </div>
)

export default Login