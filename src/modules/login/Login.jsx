/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { http } from '@utils';
import { Input, Button, Checkbox, Grid, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '@redux/actions/userActions'
import cookie from 'react-cookies';
import CryptoJS from 'crypto-js';



const { Row, Col } = Grid;

@connect(state => state, (dispatch) => {
  return {
    userCreator: bindActionCreators(userActions, dispatch),
  }
})
export default class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        account: '',
        password: '',
        captcha: '',
        captchaToken: '',
        checkbox: false
      },
      captcha: {
        img: '',
        token: ''
      }
    };
  };

  componentWillMount() {
    if (cookie.load('account') && cookie.load('password')) {
      let userRem = Object.assign(this.state.value, {checkbox: true, account: cookie.load('account'), password: cookie.load('password')})
      this.setState({value: userRem})
    }
    this.capRefresh()
  };
  formChange = (value) => {
    this.setState({
      value,
    });
  };

  pwd2AES = (pwd) => {
    let key = 'ZmFzdGVyLWZyYW1ld29yaw=='
    let AESpwd = CryptoJS.AES.encrypt(pwd, key)
    return AESpwd
  };

  pwdRemember = (checked) => {
    if (!checked) {
      if (cookie.load('account')) {
        cookie.remove('account')
      }
      if (cookie.load('password')) {
        cookie.remove('password')
      }
    }
  };

  capRefresh = () => {
    http.get('/captcha').then(res => {
      let capData = Object.assign({}, this.state.captcha, res.data)
      let checkData = Object.assign({}, this.state.value, {captchaToken: res.data.token})
      this.setState({captcha: capData})
      this.setState({value: checkData})
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      // 使用 axios 获取数据
      http.post('/login', values).then(response => {
        if (values.checkbox) {
          cookie.save('account', values.account, {
            maxAge: 60 * 60 * 24 * 30
          })
          let pwd = this.pwd2AES(values.password).toString()
          console.log(pwd)
          cookie.save('password', pwd, {
            maxAge: 60 * 60 * 24 * 30
          })
        }
        const body = response.data;
        //存储token到cookie中
        //todo: 增加自动登录，当为自动登录时，才存储cookie
        cookie.save("token", body.token, {
          maxAge: 60 * 60 * 24 * 7
        });
        cookie.save("name", body.name, {
          maxAge: 60 * 60 * 24 * 7
        });
        //登录成功，存储用户信息到store中
        this.props.userCreator.initUserInfo(response.data);
        //请求权限，获取权限列表
        http.get('/permissions').then(response => {
          this.props.userCreator.initPermissions(response.data);
          Feedback.toast.success("登录成功");
          this.props.history.push('/');
        });
      })
    });
  };

  render() {
    return (
      <div className="user-login">
        <div className="formContainer">
          <h4 className="formTitle">登 录</h4>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div className="formItems">
              <Row className="formItem">
                <Col className="formItemCol">
                  <IceIcon type="person" size="small" className="inputIcon" />
                  <IceFormBinder name="account" required message="请输入用户名">
                    <Input size="large" maxLength={20} placeholder="用户名" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="account" />
                </Col>
              </Row>
              <Row className="formItem">
                <Col className="formItemCol">
                  <IceIcon type="lock" size="small" className="inputIcon" />
                  <IceFormBinder name="password" required message="请输入密码">
                    <Input
                      size="large"
                      htmlType="password"
                      placeholder="密码"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="password" />
                </Col>
              </Row>
              <Row className="formItem formColItem">
                <Col className="formItemCol formCaptchaCol" span="18">
                  <IceIcon type="lock" size="small" className="inputIcon" />
                  <IceFormBinder name="captcha" required message="请输入验证码">
                    <Input
                      size="large"
                      placeholder="验证码"
                    />
                  </IceFormBinder>
                </Col>
                <Col className="formItemCol formCaptchaCol formCaptchaImg" span="6">
                  <img onClick={this.capRefresh} src={this.state.captcha.img} />
                </Col>
                <Col>
                  <IceFormError name="captcha" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col>
                  <IceFormBinder name="checkbox">
                    <Checkbox onChange={this.pwdRemember} checked={this.state.value.checkbox} className="checkbox">记住账号</Checkbox>
                  </IceFormBinder>
                </Col>
              </Row>

              <Row className="formItem">
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  className="submitBtn"
                >
                  登 录
                </Button>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </div>

      </div>
    );
  }
}