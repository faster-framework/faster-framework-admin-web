import { Tab, Button, Icon } from "@icedesign/base";

const TabPane = Tab.TabPane;

const panes = [
    { tab: "邮件", key: 1, closeable: false },
    { tab: "消息通知", key: 2 },
    { tab: "设置", key: 3 },
    { tab: "未读邮件", key: 4 }
];

export default class CloseableTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panes: panes,
            activeKey: panes[0].key
        };
    }

    /*eslint-disable eqeqeq */
    remove(targetKey) {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((item, i) => {
            if (item.key == targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key != targetKey);
        if (lastIndex >= 0 && activeKey == targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    onClose(targetKey) {
        this.remove(targetKey);
    }

    onChange(activeKey) {
        console.info(activeKey)
        this.setState({ activeKey });
    }

    addTabpane() {
        this.setState(prevState => {
            const { panes } = prevState;
            panes.push({ tab: "new tab", key: Math.random() });
            return { panes };
        });
    }

    render() {
        const state = this.state;
        return (
            <div>
                <Tab
                    type="wrapped"
                    activeKey={state.activeKey}
                    closeable
                    onChange={this.onChange}
                    onClose={this.onClose}
                    className="custom-tab"
                >
                    {
                        state.panes.map(item => (
                            <TabPane tab={item.tab} key={item.key} closeable={item.closeable}>
                                {item.tab}的内容区域
            </TabPane>
                        ))
                    }
                </Tab>
            </div >
        );
    }
}
