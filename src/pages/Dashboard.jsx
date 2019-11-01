import React from 'react';
import { Card, Typography, Alert } from 'antd';
const CodePreview = ({ children }) => (
  <pre
    style={{
      background: '#f2f4f5',
      padding: '12px 20px',
      margin: '12px 0',
    }}
  >
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);
export default () => (
  <Card>
    欢迎来到后台管理
  </Card>
);
