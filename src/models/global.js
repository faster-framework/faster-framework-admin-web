const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    loading: false,
    tabList: [],
    activeTab: ''
  },
  effects: {
  },
  reducers: {
    addTab(state, { menuItemProps }) {
      const tabList = state.tabList;
      const existTab = tabList.find(item => {
        return item.path == menuItemProps.path;
      });
      if (!existTab) {
        tabList.push(menuItemProps)
      }
      return { ...state, tabList: tabList, activeTab: menuItemProps.path };
    },
    closeTab(state, { menuItemProps }) {
      const tabList = state.tabList;
      //要删除的key
      const targetKey = menuItemProps.path;
      //当前激活的key
      let activeKey = state.activeTab;
      let lastIndex;
      //获取当前要删除的key的前一个下标。
      tabList.forEach((item, i) => {
        if (item.path == targetKey) {
          lastIndex = i - 1;
        }
      });
      //过滤掉要删除的key
      const tabs = tabList.filter(pane => {
        return pane.path != targetKey;
      });
      //如果要删除key为当前激活key，则激活的key需要重置为前一个下标。
      if (lastIndex >= 0 && activeKey == targetKey) {
        activeKey = tabs[lastIndex].path;
      }
      return { ...state, tabList: tabs, activeTab: activeKey };
    },
    closeOtherTab(state, { menuItemProps }) {
      const tabList = state.tabList;
      //当前key
      const currentKey = menuItemProps.path;
      //当前激活的key
      let activeKey = state.activeTab;
      //如果当前激活的跟点击的不一样，则将点击的设置为当前激活的
      if (activeKey != currentKey) {
        activeKey = currentKey;
      }
      //删除除了第一个以及当前点击的所有元素
      const tabs = tabList.filter((item, index) => {
        return index == 0 || item.path == currentKey;
      });
      return { ...state, tabList: tabs, activeTab: activeKey };
    },
    closeRightTab(state, { menuItemProps }) {
      const tabList = state.tabList;
      //当前key
      const currentKey = menuItemProps.path;
      //当前激活的key
      let activeKey = state.activeTab;
      //如果当前激活的跟点击的不一样，则将点击的设置为当前激活的
      if (activeKey != currentKey) {
        activeKey = currentKey;
      }
      //获取当前索引
      let currentIndex;
      //获取当前要删除的key的前一个下标。
      tabList.forEach((item, i) => {
        if (item.path == currentKey) {
          currentIndex = i;
        }
      });
      //保留小于等于当前索引的
      const tabs = tabList.filter((item, index) => {
        return index <= currentIndex;
      });
      return { ...state, tabList: tabs, activeTab: activeKey };
    },
    closeAllTab(state, { menuItemProps }) {
      const tabList = state.tabList;
      //当前激活的key
      let activeKey = state.activeTab;
      //如果当前不为第一个，激活第一个
      if (menuItemProps.index != 0) {
        activeKey = tabList[0].path;
      }
      //保留第一个
      const tabs = [];
      tabs.push(tabList[0]);
      return { ...state, tabList: tabs, activeTab: activeKey };
    },
    changeLayoutCollapsed(state, { payload }) {
      return { ...state, collapsed: payload };
    },
    loadingShow(state) {
      return { ...state, loading: true };
    },
    loadingHide(state) {
      return { ...state, loading: false };
    },
  }
};
export default GlobalModel;
