const tabState = {
    tabs: [],
    activeKey: null
}
const reducers = (state = tabState, action) => {
    switch (action.type) {
        case 'ADD_TAB':
            const existTab = state.tabs.find(item => item.key === action.tab.key);
            if (existTab) {
                if (action.tab.content && !existTab.content) {
                    existTab.content = action.tab.content;
                }
            } else {
                state.tabs.push(action.tab);
            }
            state.activeKey = action.tab.key;
            return state;
        case 'DEL_TAB':
            //要删除的key
            const targetKey = action.key;
            //当前激活的key
            let activeKey = state.activeKey;
            let lastIndex;
            //获取当前要删除的key的前一个下标。
            state.tabs.forEach((item, i) => {
                if (item.key == targetKey) {
                    lastIndex = i - 1;
                }
            });
            //过滤掉要删除的key
            const tabs = state.tabs.filter(pane => pane.key != targetKey);
            //如果要删除key为当前激活key，则激活的key需要重置为前一个下标。
            if (lastIndex >= 0 && activeKey == targetKey) {
                activeKey = tabs[lastIndex].key;
            }
            return { tabs, activeKey };
        default:
            return state;
    }
};
export default reducers;