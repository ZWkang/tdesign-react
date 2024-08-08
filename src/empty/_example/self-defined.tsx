import React from 'react';
import { Empty, Row, Col } from 'tdesign-react';
import { ErrorCircleIcon } from 'tdesign-icons-react';

export default function BasicGrid() {
  const CustomImageContainer = (
    <div
      style={{
        width: '64px',
        height: '64px',
        backgroundImage: 'url(https://tdesign.gtimg.com/demo/demo-image-1.png)',
      }}
    />
  );
  return (
    <Row gutter={40}>
      <Col>
        <Empty image={<ErrorCircleIcon size={64} color="rgba(0, 0, 0, 0.26)" />} description="暂无数据" type="" />
      </Col>
      <Col>
        <Empty description="暂无数据" type="" image={CustomImageContainer} />
      </Col>
    </Row>
  );
}
