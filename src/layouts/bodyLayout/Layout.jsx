/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { Icon } from '@icedesign/base';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import FoundationSymbol from 'foundation-symbol';
import { enquire } from 'enquire-js';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Logo from '@components/Logo';
import './scss/light.scss';
import './scss/dark.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '@redux/actions/userActions'
import * as tabActions from '@redux/actions/tabActions'
import cookie from 'react-cookies';
import { permissionUtil, http } from '@utils';
import { Overlay, Loading } from "@icedesign/base";
import Tab from './components/tab';

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
const theme = typeof THEME === 'undefined' ? 'light' : THEME;
@withRouter
@connect(state => state, (dispatch) => {
  return {
    userCreator: bindActionCreators(userActions, dispatch),
    tabCreator: bindActionCreators(tabActions, dispatch)
  }
})
export default class HeaderAsideFooterResponsiveLayout extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.asideMenuConfig = this.props.userState.menuList;
    const openKeys = this.getOpenKeys();
    this.state = {
      collapse: false,
      openDrawer: false,
      isScreen: undefined,
      openKeys
    };
    this.openKeysCache = openKeys;
    this.init();
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }
  init = () => {
    //如果token为空，跳转到登录页面
    const token = cookie.load('token');
    if (token == null) {
      //跳转到登录页面
      this.props.history.push('/login');
    }
    //如果为空，加载权限
    const permissions = this.props.userState.permissions;
    if (Array.isArray(permissions) &&
      permissions.length == 0) {
      //请求权限，获取权限列表
      http.get('/permissions').then(response => {
        this.props.userCreator.initPermissions(response.data);
      });
    }
  }
  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    let collapse;
    if (type === 'isMobile') {
      collapse = false;
    } else if (type === 'isTablet') {
      collapse = true;
    } else {
      collapse = this.state.collapse;
    }

    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
          openDrawer: true,
          collapse,
        });
      },
      unmatch: () => {
        // handler unmatched
      },
    };

    return handler;
  };

  toggleCollapse = () => {
    const { collapse } = this.state;
    const openKeys = !collapse ? [] : this.openKeysCache;

    this.setState({
      collapse: !collapse,
      openKeys,
    });
  };

  /**
   * 左侧菜单收缩切换
   */
  toggleMenu = () => {
    const { openDrawer } = this.state;
    this.setState({
      openDrawer: !openDrawer,
    });
  };

  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
    this.openKeysCache = openKeys;
  };

  /**
   * 响应式时点击菜单进行切换
   */
  onMenuClick = (args) => {
    this.toggleMenu();
    const menuItemProp = args.item.props;
    const menuName = menuItemProp.name;
    const path = menuItemProp.eventKey;

    //这里之所以不添加内容，是因为当前获取的内容还为当前页的，所以这里在跳转以后获取内容
    this.props.tabCreator.add({ tab: menuName, key: path });
  };

  /**
   * 获取当前展开的菜单项
   */
  getOpenKeys = () => {
    const { match } = this.props;
    const matched = match.path;
    let openKeys = [];
    Array.isArray(this.asideMenuConfig) &&
      this.asideMenuConfig.length > 0 &&
      this.asideMenuConfig.forEach((item, index) => {
        if (matched.startsWith(item.path)) {
          openKeys = [`${index}`];
        }
      });
    return openKeys;
  };

  render() {
    const { location } = this.props;
    const { pathname } = location;
    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(
          `ice-design-header-aside-footer-responsive-layout-${theme}`,
          {
            'ice-design-layout': true,
          }
        )}
      >

        <Overlay
          visible={this.props.loadingState.visible}
          align="cc cc"
          hasMask={this.props.loadingState.visible}
        >
          <Loading visible={this.props.loadingState.visible} shape="fusion-reactor">
          </Loading>
        </Overlay>
        <Header
          theme={theme}
          isMobile={this.state.isScreen !== 'isDesktop' ? true : undefined}
        />
        <Layout.Section>
          {this.state.isScreen === 'isMobile' && (
            <a className="menu-btn" onClick={this.toggleMenu}>
              <Icon type="category" size="small" />
            </a>
          )}
          {/* 变小以后点击这个区域隐藏左侧菜单栏 */}
          {this.state.openDrawer && (
            <div className="open-drawer-bg" onClick={this.toggleMenu} />
          )}
          <Layout.Aside
            width="auto"
            theme={theme}
            className={cx('ice-design-layout-aside', {
              'open-drawer': this.state.openDrawer,
            })}
          >
            {/* 侧边菜单项 begin */}
            {this.state.isScreen !== 'isMobile' && (
              <a className="collapse-btn" onClick={this.toggleCollapse}>
                <Icon
                  type={this.state.collapse ? 'arrow-right' : 'arrow-left'}
                  size="small"
                />
              </a>
            )}
            {this.state.isScreen === 'isMobile' && <Logo />}
            <Menu
              style={{ width: this.state.collapse ? 60 : 200 }}
              inlineCollapsed={this.state.collapse}
              mode="inline"
              selectedKeys={[pathname]}
              openKeys={this.state.openKeys}
              defaultSelectedKeys={[pathname]}
              onOpenChange={this.onOpenChange}
              onClick={this.onMenuClick}
            >
              {Array.isArray(this.asideMenuConfig) &&
                this.asideMenuConfig.length > 0 &&
                this.asideMenuConfig.filter(item => permissionUtil.hasPermission(item.code)).map((nav, index) => {
                  if (nav.children && nav.children.length > 0) {
                    return (
                      <SubMenu
                        key={index}
                        title={
                          <span>
                            {nav.icon ? (
                              <FoundationSymbol size="small" type={nav.icon} />
                            ) : null}
                            <span className="ice-menu-collapse-hide">
                              {nav.name}
                            </span>
                          </span>
                        }
                      >
                        {nav.children.filter(item => permissionUtil.hasPermission(item.code)).map((item) => {
                          const linkProps = {};
                          if (item.newWindow) {
                            linkProps.href = item.path;
                            linkProps.target = '_blank';
                          } else if (item.external) {
                            linkProps.href = item.path;
                          } else {
                            linkProps.to = item.path;
                          }
                          return (
                            <MenuItem key={item.path} name={item.name}>
                              <Link {...linkProps} replace>{item.name}</Link>
                            </MenuItem>
                          );
                        })}
                      </SubMenu>
                    );
                  }
                  const linkProps = {};
                  if (nav.newWindow) {
                    linkProps.href = nav.path;
                    linkProps.target = '_blank';
                  } else if (nav.external) {
                    linkProps.href = nav.path;
                  } else {
                    linkProps.to = nav.path;
                  }
                  return (
                    <MenuItem key={nav.path} name={nav.name}>
                      <Link {...linkProps} replace>
                        <span>
                          {nav.icon ? (
                            <FoundationSymbol size="small" type={nav.icon} />
                          ) : null}
                          <span className="ice-menu-collapse-hide">
                            {nav.name}
                          </span>
                        </span>
                      </Link>
                    </MenuItem>
                  );
                })}
            </Menu>
            {/* 侧边菜单项 end */}
          </Layout.Aside>
          {/* 主体内容 */}
          <Layout.Main>
            <Tab>{this.props.children}</Tab>
          </Layout.Main>
        </Layout.Section>
        <Footer />
      </Layout >
    );
  }
}
