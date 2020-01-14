import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { firebase } from '../firebase/firebase'
import Header from './Header'


class ResetPassword extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                firebase.auth().sendPasswordResetEmail(values.email).then(() => {
                    message.success('Email for password reset sent')
                }).catch((error) => {
                    message.error('Unable to reset password')
                });
            } else {
                message.error('Unable to reset password')
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="reset-password-form">
                <h2>
                    Reset Password
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const ResetPasswordFormCreated = Form.create({ name: 'register'})(ResetPassword)

const WrapperResetPassword = () => (
    <div className='login-root'>
        <Header />
        <div>
            <div className='login-wrapper'>
                <ResetPasswordFormCreated />
            </div>
        </div>
    </div>
)

export default WrapperResetPassword