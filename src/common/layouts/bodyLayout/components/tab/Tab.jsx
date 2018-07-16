import { Tab } from "@icedesign/base";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tabActions from '@redux/actions/tabActions';
import { recursiveMenu } from "@/menuConfig";
const TabPane = Tab.TabPane;

@withRouter
@connect(state => state, (dispatch) => {
    return {
        tabCreator: bindActionCreators(tabActions, dispatch)
    }
})
export default class NavTab extends React.Component {
    constructor(props) {
        super(props);
        this.initTabs();
    }

    /**
     * 初始化
     */
    initTabs = () => {
        const { location } = this.props;
        const { pathname } = location;
        if (Array.isArray(recursiveMenu) && recursiveMenu.length > 0) {
            const firstMenu = recursiveMenu[0];
            this.props.tabCreator.add({ tab: firstMenu.name, key: firstMenu.path, closeable: false });
            // //获取扁平化以后的路径
            recursiveMenu.forEach(item => {
                if (pathname === item.path) {
                    this.props.tabCreator.add({ tab: item.name, key: item.path, content: this.props.children });
                }
            })
        }
    }
    /**
   * Tab点击
   */
    onTabClick = (args) => {
        this.props.history.replace(args);
    };
    /**
     * tab关闭
     */
    onTabClose = (key) => {
        const activeKey = this.props.tabState.activeKey;
        //获取当前要删除的key的前一个下标，如果要删除的是当前展开的，则请求前一个
        this.props.tabState.tabs.forEach((item, i) => {
            if (item.key == key && key == activeKey) {
                this.props.history.replace(this.props.tabState.tabs[i - 1].key);
            }
        });
        this.props.tabCreator.remove(key);
    }
    render() {
        return (
            <Tab
                type="wrapped"
                animation={false}
                closeable
                defaultActiveKey={this.props.tabState.activeKey}
                onClose={this.onTabClose}
            >
                {
                    this.props.tabState.tabs.map(item => (
                        <TabPane onClick={this.onTabClick} tab={item.tab} key={item.key} closeable={item.closeable}>
                            {item.content}
                        </TabPane>
                    ))
                }
            </Tab>
        );
    }
}
