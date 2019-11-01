import { Checkbox, Form, Button, Input, Icon } from 'antd';
import React, { Component } from 'react';
import styles from './style.less';
import request from '@/common/utils/request'
import router from 'umi/router';

const lastRemember = window.localStorage.remember;
class LoginForm extends Component {
  state = {
    remember: lastRemember == "true" ? true : false,
    captcha: {
      img: '',
      token: ''
    }
  };

  changeRemember = e => {
    this.setState({
      remember: e.target.checked,
    });
  };

  handleLogin = values => {
    request.post("/login", { data: Object.assign(values, { captchaToken: this.state.captcha.token }) }).then(res => {
      if (this.state.remember) {
        window.localStorage.account = values.account;
        window.localStorage.password = values.password;
        window.localStorage.remember = true;
      } else {
        window.localStorage.removeItem("account");
        window.localStorage.removeItem("password");
        window.localStorage.remember = false;
      }
      window.localStorage.token = res.token;
      router.push('/');
    });
  }

  handleSubmit = e => {
    const { form } = this.props;
    if (!form) {
      return;
    }
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.handleLogin(values);
    },
    );
  };
  componentDidMount() {
    this.refreshCaptcha();
  }
  refreshCaptcha = () => {
    request.get('/captcha')
      .then(response => {
        this.setState({ captcha: response })
      });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.main}>
        <Form>
          <Form.Item>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入用户名' }],
              initialValue: window.localStorage.account,
            })(
              <Input
                size='large'
                prefix={<Icon type="user" className={styles.prefixIcon} />}
                placeholder="用户名"
                onPressEnter={this.handleSubmit}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
              initialValue: window.localStorage.password,
            })(
              <Input
                type="password"
                size='large'
                prefix={<Icon type="lock" className={styles.prefixIcon} />}
                placeholder="密码"
                onPressEnter={this.handleSubmit}
              />
            )}
          </Form.Item>
          <Form.Item className={styles.captchaContainer}>
            {getFieldDecorator('captcha', {
              rules: [{ required: true, message: '请输入验证码' }],
            })(
              <Input
                size='large'
                prefix={<Icon type="picture" className={styles.prefixIcon} />}
                placeholder="验证码"
                className={styles.captchaInput}
                onPressEnter={this.handleSubmit}
              />
            )}
            <img src={this.state.captcha.img} onClick={this.refreshCaptcha} />
          </Form.Item>
          <Form.Item className={styles.rememberContainer}>
            <Checkbox checked={this.state.remember} onChange={this.changeRemember}>
              记住密码
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button size="large" className={styles.submit} type="primary" onClick={this.handleSubmit} >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginForm);
