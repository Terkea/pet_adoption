import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  Row,
  Col,
  List,
  Typography,
  Input,
  Form,
  Button,
  Select,
  Layout,
  Card,
  Tooltip,
} from "antd";

import { MenuUnfoldOutlined } from "@ant-design/icons";
import Navigation from "./Navigation";

const { Title, Text } = Typography;
const { Item } = Form;
const { Option } = Select;
const { Sider, Content, Header } = Layout;

// HOW TO GRAB THE QUERY PARAMS FROM THE URL
// https://stackoverflow.com/questions/52652661/how-to-get-query-string-using-react
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];
const Search = (props) => {
  // GETTING THE PARAMS
  let query = useQuery();
  const city = query.get("city");
  const petType = query.get("petType");
  const breed = query.get("breed");

  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      city: city,
      type: petType,
      breed: breed,
    });
  }, [form, city, petType, breed]);

  return (
    <Layout>
      <Navigation />

      <Sider
        collapsible
        collapsed={collapsed}
        theme={"light"}
        collapsedWidth={0}
        breakpoint="md"
        width="250px"
        onCollapse={() => setCollapsed(!collapsed)}
        style={styles.sidebar}
      >
        <Title level={2} style={styles.titleFilters}>
          Filters
        </Title>
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 24, offset: 2 }}
          wrapperCol={{ span: 20, offset: 2 }}
        >
          <Item label="City" name="city">
            <Input placeholder="London" />
          </Item>
          <Item label="Type" name="type">
            <Select>
              <Option value="demo">Demo</Option>
            </Select>
          </Item>
          <Item label="Breed" name="breed">
            <Select>
              <Option value="demo">Demo</Option>
            </Select>
          </Item>
          <Row justify="center" gutter={2}>
            <Col span={20}>
              <Button type="primary" block>
                Filter
              </Button>
              <Button block style={{ marginTop: "10px" }}>
                Clear filters
              </Button>
            </Col>
          </Row>
        </Form>
      </Sider>
      <Layout>
        <div>
          <Tooltip placement="right" title="Toggle filters">
            <Button
              style={styles.buttonToggle}
              className="trigger"
              size="large"
              type="primary"
              icon={<MenuUnfoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </Tooltip>
        </div>
        <Content style={styles.content}>
          <Title style={{ textAlign: "center" }}>Search results</Title>
          <Row style={styles.mainRow}>
            <List
              size="large"
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

const styles = {
  rowMain: { minHeight: "100vh", overflow: "auto" },
  content: { margin: "50px 16px 0", overflow: "initial" },
  colPosts: { marginTop: "100px" },
  mainRow: { padding: 24, background: "#fff", textAlign: "center" },
  titleFilters: { textAlign: "center", marginBottom: "50px" },
  buttonToggle: { marginTop: "50px" },
  sidebar: {
    overflow: "hidden",
    // border: "1px solid rgb(217, 217, 217)",
    height: "100vh",
    position: "sticky",
    paddingTop: "100px",
    top: 0,
    left: 0,
  },
};

export default Search;
