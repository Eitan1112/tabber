import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { firebase } from '../firebase/firebase'
import Header from './Header'


class Register extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                firebase.auth().createUserWithEmailAndPassword(values.email, values.password).then(() => {
                    message.success('Created account!')
                }).catch((e) => {
                    message.error('Failed to create account')
                });
            } else {
                message.error('Failed to create account')
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(getFieldDecorator)
        return (
            <Form onSubmit={this.handleSubmit} className="register-form">
                <h2>
                    Register
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign Up
            </Button>
                </Form.Item>
            </Form>
        );
    }
}

const RegisterFormCreated = Form.create({ name: 'register'})(Register)

const WrappedRegister = () => (
    <div className='login-root'>
        <Header />
        <div>
            <div className='login-wrapper'>
                <RegisterFormCreated />
            </div>
        </div>
    </div>
)

export default WrappedRegister


// export default () => (
//     <div>
//         <form onSubmit={handleCreateAccount}>
//             <input placeholder="Email" type="text" id="email" />
//             <input placeholder="Password" type="password" id="password" />
//             <button type="submit">
//                 Register
//             </button>
//         </form>
//     </div>
// )