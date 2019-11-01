import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import React from 'react';
import { connect } from 'dva';
import styles from './LoginLayout.less';
import { Spin } from 'antd';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  const {loading } = props;
  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        ...props,
      })}
    >
      <Spin size="large" spinning={loading}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <span className={styles.title}>{TITLE}</span>
              </div>
              <div className={styles.desc}>{TITLE_DESC}</div>
            </div>
            {children}
          </div>
          <DefaultFooter links={[]} copyright={COPRY_RIGHT} />
        </div>
      </Spin>
    </DocumentTitle>
  );
};

export default connect(({ settings, global }) => (
  {
  ...settings,
  loading: global.loading,
}))(UserLayout);
