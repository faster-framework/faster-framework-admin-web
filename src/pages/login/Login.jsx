/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { http } from '@utils';
import { Input, Button, Checkbox, Grid, Feedback, Loading } from '@icedesign/base';
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
const { Row, Col } = Grid;

@connect(state => state, (dispatch) => {
  return bindActionCreators(userActions, dispatch);
})
export default class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: false,
      value: {
        account: '',
        password: '',
        checkbox: false
      },
    };
  };


  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      this.setState({
        loadingVisible: true
      });
      // 使用 axios 获取数据
      http.post('/login', values).then(response => {
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
        this.props.initUserInfo(response.data);
        //请求权限，获取权限列表
        http.get('/permissions').then(response => {
          this.props.initPermissions(response.data);
          Feedback.toast.success("登录成功");
          this.props.history.push('/');
        });

      }).catch(error => {
        this.setState({
          loadingVisible: false
        });
      });
    });
  };

  render() {
    return (
      <Loading visible={this.state.loadingVisible} shape="fusion-reactor">
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
                    <IceFormBinder name="account" required message="必填">
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
                    <IceFormBinder name="password" required message="必填">
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

                <Row className="formItem">
                  <Col>
                    <IceFormBinder name="checkbox">
                      <Checkbox className="checkbox">记住账号</Checkbox>
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

                <Row className="tips">
                  <Link to="/register" className="tips-text">
                    立即注册
                </Link>
                  <span className="line">|</span>
                  <Link to="/forgetpassword" className="tips-text">
                    忘记密码
                </Link>
                </Row>
              </div>
            </IceFormBinderWrapper>
          </div>

        </div>
      </Loading>
    );
  }
}