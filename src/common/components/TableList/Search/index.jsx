import { Button, Col, Form, Row, Icon } from 'antd';
import React, { Component } from 'react';
import { value } from '@/common/utils/dict';
import styles from './index.less';


class Search extends Component {
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
        console.log('values[item]---', values[item])
        //如果是时间范围查询
        if (Array.isArray(values[item]) && values[item][0]._isAMomentObject) {
          const originalProps = that.props.form.getFieldProps(item)["data-__meta"].originalProps;
          const moment1 = values[item][0];
          const moment2 = values[item][1];
          const moment1Value = moment1.format(originalProps.format);
          const moment2Value = moment2.format(originalProps.format);

          const startName = originalProps.startName ? originalProps.startName : 'start';
          filterValues[startName] = moment1Value;
          const endName = originalProps.endName ? originalProps.endName : 'end';
          filterValues[endName] = moment2Value;
          if (filterValues[startName].indexOf(' ') === -1) {
            filterValues[startName] = filterValues[startName] + ' 00:00:00'
          }
          if (filterValues[endName].indexOf(' ') === -1) {
            filterValues[endName] = filterValues[endName] + ' 23:59:59'
          }
        } else if (values[item]._isAMomentObject) {
          //如果是普通时间查询
          const originalProps = that.props.form.getFieldProps(item)["data-__meta"].originalProps;
          console.log('that.props.form.getFieldProps(item)["data-__meta"]', that.props.form.getFieldProps(item)["data-__meta"])
          const format = originalProps.format || (originalProps.showTime && 'YYYY-MM-DD HH:mm:ss') || 'YYYY-MM-DD 00:00:00'
          filterValues[item] = values[item].format(originalProps.format || format);
        } else {
          filterValues[item] = values[item];
        }
      })
      that.props.handleSearch(filterValues);
    });
  };
  handleReset = e => {
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" style={{ marginBottom: 16 }} className="ant-search-form">
        {
          React.Children.map(this.props.children, (item, index) => {
            return (
              <Form.Item label={item.props.label} key={index}>
                {
                  getFieldDecorator(item.props.name)(item)
                }
              </Form.Item>
            )
          })
        }
        <Row>
          <Col style={{ textAlign: "right" }}>
            <Button icon="search" type="primary" onClick={this.handleSearch}>
              查询
            </Button>
            <Button icon="reload" style={{ marginLeft: 16 }} onClick={this.handleReset}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create({})(Search)
