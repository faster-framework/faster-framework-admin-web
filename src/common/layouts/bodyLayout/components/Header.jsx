import React, { PureComponent } from 'react';
import { Balloon, Icon, Button, Dialog, Feedback } from '@icedesign/base';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { headerMenuConfig } from '@/menuConfig';
import Logo from './Logo';
import cookie from 'react-cookies';
import { http } from '@utils';
import { withRouter } from 'react-router';

@withRouter
export default class Header extends PureComponent {
  constructor(props) {
    super(props);
    const name = cookie.load('name');
    this.state = {
      name: name
    }
  }
  logout = () => {
    Dialog.confirm({
      content: "确定要退出系统",
      title: "注销",
      onOk: () => {
        http.delete("/logout").then(() => {
          this.props.history.push('/login');
          cookie.remove('token');
          cookie.remove('name');
          Feedback.toast.success("退出成功");
        });
      }
    });

  }
  render() {
    const { width, theme, isMobile, className, style } = this.props;

    return (
      <Layout.Header
        theme={theme}
        className={cx('ice-design-layout-header', className)}
        style={{ ...style, width }}
      >
        <Logo />
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.to;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.to;
                } else {
                  linkProps.to = nav.to;
                }
                return (
                  <Menu.Item key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        {!isMobile ? nav.name : null}
                      </Link>
                    ) : (
                        <a {...linkProps}>
                          {nav.icon ? (
                            <FoundationSymbol type={nav.icon} size="small" />
                          ) : null}
                          {!isMobile ? nav.name : null}
                        </a>
                      )}
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}

          <Balloon
            trigger={
              <div
                className="ice-design-header-userpannel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <div className="user-profile">
                  <span className="user-name" style={{ fontSize: '13px' }}>
                    {this.state.name}
                  </span>
                </div>
                <Icon
                  type="arrow-down-filling"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
            triggerType='click'
          >
            <ul>
              <li className="user-profile-menu-item">
                <Button shape="text" onClick={this.logout} size="small">
                  <FoundationSymbol type="backward" size="small" />退出登录
                </Button>
              </li>
            </ul>
          </Balloon>
        </div>
      </Layout.Header>
    );
  }
}
