import { Button, Col, Form, Row, Icon } from 'antd';
import React, { Component } from 'react';
import { value } from '@/common/utils/dict';


class Search extends Component {
  state = {
    expand: false,
  };
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.onRef('search', this)
  }
  handleSearch = e => {
    const that = this;
    this.props.form.validateFields((err, values) => {
      let filterValues = {};
      Object.keys(values).filter(item => {
        return values[item] != '' && values[item] != undefined;
      }).forEach(item => {
        //如果是时间范围查询
        if (Array.isArray(values[item]) && values[item][0]._isAMomentObject) {
          const originalProps = that.props.form.getFieldProps(item)["data-__meta"].originalProps;
          const moment1 = values[item][0];
          const moment2 = values[item][1];
          const moment1Value = moment1.format(originalProps.format);
          const moment2Value = moment2.format(originalProps.format);

          const startName = originalProps.startName?originalProps.startName:'start';
          filterValues[startName] =  moment1Value;
          const endName = originalProps.endName?originalProps.endName:'end';
          filterValues[endName] =  moment2Value;
        } else {
          //如果是普通时间查询
          if (values[item][0]._isAMomentObject) {
            const originalProps = that.props.form.getFieldProps(item)["data-__meta"].originalProps;
            filterValues[item] = values[item].format(originalProps.format);
          } else {
            filterValues[item] = values[item];
          }
        }
      })
      that.props.handleSearch(filterValues);
    });
  };
  handleReset = e => {
    this.props.form.resetFields();
  };
  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };
  render() {
    const count = this.state.expand ? React.Children.count(this.props.children) : 4;
    let expandBtDisplay = 'none';
    if (this.props.children) {
      if (this.state.expand == false && this.props.children.length > count) {
        expandBtDisplay = '';
      }
      if (this.state.expand && this.props.children.length >= count) {
        expandBtDisplay = '';
      }
    }

    const { getFieldDecorator } = this.props.form;
    const colLayout = {
      xs: 24,
      sm: 24,
      md: 12,
      lg: 12,
      xl: 8,
      xxl: 6
    }
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 6,
      },
      wrapperCol: {
        xs: 24,
        sm: 16
      },
    };
    return (
      <Form style={{ marginBottom: 16 }} {...formItemLayout}>
        <Row gutter={32}>
          {
            React.Children.map(this.props.children, (item, index) => {
              return (
                <Col {...colLayout} key={index} style={{ display: index < count ? 'block' : 'none' }}>
                  <Form.Item label={item.props.label}>
                    {
                      getFieldDecorator(item.props.name)(item)
                    }
                  </Form.Item>
                </Col>
              )
            })
          }
        </Row>
        <Row>
          <Col style={{ textAlign: "right" }}>
            <Button icon="search" type="primary" onClick={this.handleSearch}>
              查询
            </Button>
            <Button icon="reload" style={{ marginLeft: 16 }} onClick={this.handleReset}>
              重置
            </Button>
            <a style={{ marginLeft: 16, fontSize: 12, display: expandBtDisplay }} onClick={this.toggle}>
              {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create({})(Search)
