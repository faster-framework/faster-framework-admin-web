import { Icon, Menu, Spin, Modal, Dropdown } from 'antd';
import { connect } from 'dva';
import React from 'react';
import router from 'umi/router';
import styles from './index.less';
import request from '@/common/utils/request'
const { confirm } = Modal;

class HeaderDropdown extends React.Component {
  onMenuClick = event => {
    const { key } = event;

    if (key === 'logout') {
      confirm({
        title: '注销',
        okText: "确定",
        cancelText: "取消",
        content: '确认退出登录？',
        onOk() {
          request.delete("/logout").then(res => {
            window.localStorage.removeItem("token");
            router.push('/login');
          });
        }
      });

      return;
    }
    router.push(`/account/${key}`);
  };

  render() {
    const {
      currentUser = {
        name: '',
      }
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <Dropdown overlay={menuHeaderDropdown} >
        <span className={`${styles.action} ${styles.account}`}>
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </Dropdown>

    ) : (
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(HeaderDropdown);
