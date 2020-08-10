import React, { Component } from 'react';
import { Tabs, Spin, Icon, Popover, Divider } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import router from 'umi/router';

const { TabPane } = Tabs;

class TabsPro extends Component {
  constructor(props) {
    super(props)
    const { dispatch, routing } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/addTab',
        menuItemProps: { path: "/", name: "控制台" },
      });
      FLAT_ROUTES.forEach(item => {
        if (routing.pathname === item.path) {
          dispatch({
            type: 'global/addTab',
            menuItemProps: { path: item.path, name: item.name },
          });
        }
      })
    }
  }

  tabClick = (key) => {
    const { dispatch, routing } = this.props;
    if (dispatch && routing.pathname != key) {
      router.push(key);
      dispatch({
        type: 'global/addTab',
        menuItemProps: { path: key },
      });
    }
  }
  closeTab = (key, index, e) => {
    e.stopPropagation();
    const { dispatch, activeTab, tabList, routing } = this.props;
    if (dispatch) {
      // 如果要删除的是当前展开的，则请求前一个
      if (key == activeTab) {
        router.push(tabList[index - 1].path);
      }
      dispatch({
        type: 'global/closeTab',
        menuItemProps: { path: key, activeTab: routing.pathname },
      });
    }
  }
  closeOtherTab = (key, index, e) => {
    e.stopPropagation();
    const { dispatch, activeTab, routing } = this.props;
    if (dispatch) {
      //如果当前激活的跟点击的不一样,则跳转至点击的
      if (activeTab != key) {
        router.push(key);
      }
      dispatch({
        type: 'global/closeOtherTab',
        menuItemProps: { path: key, activeTab: routing.pathname },
      });
    }
  }
  closeRightTab = (key, index, e) => {
    e.stopPropagation();
    const { dispatch, activeTab, routing } = this.props;
    if (dispatch) {
      //如果当前激活的跟点击的不一样,则跳转至点击的
      if (activeTab != key) {
        router.push(key);
      }
      dispatch({
        type: 'global/closeRightTab',
        menuItemProps: { path: key, activeTab: routing.pathname },
      });
    }
  }
  closeAllTab = (key, index, e) => {
    e.stopPropagation();
    const { dispatch, activeTab, tabList, routing } = this.props;
    if (dispatch) {
      //获取当前索引
      let currentIndex;
      //获取当前要删除的key的前一个下标。
      tabList.forEach((item, i) => {
        if (item.path == activeTab) {
          currentIndex = i;
        }
      });
      //如果当前点击不为第一个元素，则跳转至第一个
      if (currentIndex != 0) {
        router.push(tabList[0].path);
      }
      dispatch({
        type: 'global/closeAllTab',
        menuItemProps: { index: currentIndex, activeTab: routing.pathname },
      });
    }
  }
  renderTabName = (name, key, index) => {
    let className = styles.tabName;
    if (index == 0) {
      className = `${styles.tabName} ${styles.tabNameNoClose}`;
    }
    const content = (
      <div className="tab-popover-content" onClick={(e) => e.stopPropagation()}>
        {index != 0 ? <div className="item" onClick={(e) => this.closeTab(key, index, e)}>关闭</div> : <></>}
        <div className="item" onClick={(e) => this.closeOtherTab(key, index, e)}>关闭其它</div>
        <div className="item" onClick={(e) => this.closeRightTab(key, index, e)}>关闭右侧</div>
        <div className="item" onClick={(e) => this.closeAllTab(key, index, e)}>关闭全部</div>
      </div>
    );
    return (
      <Popover overlayClassName="tab-popover" content={content} title="" trigger="contextMenu" placement="bottom" >
        <div className={className}>{name}{index == 0 ? <></> : <Icon rotate={45} onClick={(e) => this.closeTab(key, index, e)} className={styles.icon} type="plus" />}</div>
      </Popover>
    )
  }

  renderTabeContent = (children, currentTab, globalLoading) => {
    if (children.props.location.pathname != currentTab.path) {
      return <></>
    }
    return <Spin size="large" spinning={globalLoading}>
      {children}
    </Spin>
  }
  render() {
    const { children, globalLoading, tabList, activeTab, routing, dispatch } = this.props;
    return (
      <div className="header-tab">
        {
          <Tabs activeKey={routing.pathname} animated={false} className={styles.tabs} onTabClick={this.tabClick}>
            {tabList.map((item, index) => {
              return (
                <TabPane tab={this.renderTabName(item.name, item.path, index)} key={item.path}>
                  {
                    this.renderTabeContent(children, item, globalLoading)
                  }
                </TabPane>
              )
            })}
          </Tabs>
        }
      </div>
    )
  }
}

export default connect(({ global, routing }) => ({
  tabList: global.tabList,
  activeTab: global.activeTab,
  globalLoading: global.loading,
  routing: routing.location
}))(TabsPro);
