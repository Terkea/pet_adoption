import React from "react";

import { Row, Col, Typography, Button, Layout, Table, Tag, Space } from "antd";

import {} from "@ant-design/icons";
import Navigation from "./Navigation";

const { Title } = Typography;
const { Content } = Layout;

const AdoptionDashboard = (props) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Chinese Score",
      dataIndex: "chinese",
    },
    {
      title: "Math Score",
      dataIndex: "math",
    },
    {
      title: "English Score",
      dataIndex: "english",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Tag color={"blue"}>Update </Tag>
          <Tag color={"red"}>Delete</Tag>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: "4",
      name: "Jim Red",
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];

  return (
    <Layout style={{ width: "100%", height: "100vh" }}>
      <Navigation />
      <Layout>
        <Content style={styles.content}>
          <Title
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBotom: "50px",
            }}
          >
            Adoption Dashboard
          </Title>
          <Row justify="center">
            <Col span={20}>
              <Button type="primary" style={{ marginTop: "20px" }}>
                Create new post
              </Button>
              <Table
                style={{
                  marginTop: "10px",
                  background: "white",
                  //   paddingRight: "24px",
                }}
                columns={columns}
                dataSource={data}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

const styles = {
  mainRow: { padding: 24 },
  content: { margin: "50px 16px 0", overflow: "initial" },
};

export default AdoptionDashboard;
