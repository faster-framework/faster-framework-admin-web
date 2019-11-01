import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import RenderAuthorize from '@/common/components/Authorized';
import RightContent from '@/common/components/GlobalHeader/RightContent';
import Tabs from '@/common/components/Tabs';
import logo from '@/common/logo.png';

const footerRender = (_, defaultDom) => {
  return (
    <DefaultFooter links={[]} copyright={COPRY_RIGHT} />
  );
};

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }
  handleMenuCollapse = payload => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  handleMenu = menuList => {
    return menuList.map(item => {
      const localItem = { ...item, children: item.children ? this.handleMenu(item.children) : [] };
      let authorized = RenderAuthorize(this.props.currentUser.permissions);
      return authorized.check(item.authority, localItem, null);
    });
  };
  menuClick = (menuItemProps) => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/addTab',
        menuItemProps,
      });
    }
  }
  render() {
    const { children, settings } = this.props;
    return (
      <ProLayout
        logo={logo}
        title={TITLE}
        onCollapse={this.handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }
          return <Link onClick={() => this.menuClick(menuItemProps)} to={menuItemProps.path}>{defaultDom}</Link>;
        }}

        breadcrumbRender={(routers = []) => {
          return [
          {
            path: '/',
            breadcrumbName: '控制台',
          },
          ...routers,
        ]}}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={footerRender}
        menuDataRender={this.handleMenu}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...this.props}
        {...settings}
      >
        <Tabs>{children}</Tabs>
      </ProLayout>
    );
  }

};

export default connect(({ global, settings, user }) => ({
  collapsed: global.collapsed,
  settings,
  currentUser: user.currentUser
}))(BasicLayout);
