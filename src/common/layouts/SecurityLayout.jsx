import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import { message } from 'antd';
import { stringify } from 'querystring';
import PageLoading from '@/common/components/PageLoading';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;
    const isLogin = Object.keys(currentUser).length > 0;
    if (isLogin) {
      return children;
    }
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    message.error("登录状态过期，请重新登录");
    return <Redirect to={`/login?${queryString}`}></Redirect>;
  }
}

export default connect(({ user, loading}) => ({
  currentUser: user.currentUser,
  loading: loading.models.user
}))(SecurityLayout);
