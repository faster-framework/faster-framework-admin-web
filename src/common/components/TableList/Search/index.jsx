import { Button, Col, Form, Row, Icon } from 'antd';
import React, { Component } from 'react';


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
    this.props.form.validateFields((err, values) => {
      let filterValues = {};
      Object.keys(values).filter(item => {
        return values[item] != '' && values[item] != undefined;
      }).forEach(item => {
        filterValues[item] = values[item];
      })
      this.props.handleSearch(filterValues);
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
        sm: 8,
      },
      wrapperCol: {
        xs: 24,
        sm: 16
      },
    };
    return (
      <Form style={{ marginBottom: 16 }} {...formItemLayout}>
        <Row gutter={64}>
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
            <a style={{ marginLeft: 16, fontSize: 12, display: this.props.children && this.props.children.length >= count ? '' : 'none' }} onClick={this.toggle}>
              {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create({})(Search)
