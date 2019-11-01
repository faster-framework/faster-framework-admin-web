import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { connect } from 'dva';
import HeaderDropdown from './HeaderDropdown';
import styles from './index.less';

class GlobalHeaderRight extends Component {

  constructor(props) {
    super(props)
    this.breadcrumbNameMap = {};
    this.firstBread = undefined;
    Object.keys(props.breadcrumb).forEach((item, index) => {
      this.breadcrumbNameMap[item] = props.breadcrumb[item].name;
      if (index == 0) {
        this.firstBread = props.breadcrumb[item];
      }
    })

  }
  render() {
    const { location, theme, layout } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((item, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const exist = FLAT_ROUTES.find(existItem => existItem.path == url);
      const name = this.breadcrumbNameMap[url];
      return (
        <Breadcrumb.Item key={url}>
          {exist && url != location.pathname ? <Link to={url}>{name}</Link> : <span>{name}</span>}
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key={this.firstBread.path}>
        <Link to={this.firstBread.path}>{this.firstBread.name}</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    let className = styles.right;
    if (theme === 'dark' && layout === 'topmenu') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={styles.rightContainer}>
        <Breadcrumb separator=">" className={styles.bread}>{breadcrumbItems}</Breadcrumb>
        <div className={className}>
          <HeaderDropdown />
        </div>
      </div>
    );
  }
};

export default connect(({ settings, routing }) => ({
  theme: settings.navTheme,
  layout: settings.layout
}))(GlobalHeaderRight);
