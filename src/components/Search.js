import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

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
  Avatar,
  Space,
} from "antd";

import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
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

const listData = [];
for (let i = 0; i < 1; i++) {
  listData.push({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

const Search = (props) => {
  // GETTING THE PARAMS
  let query = useQuery();
  const history = useHistory();
  const [form] = Form.useForm();

  const [collapsed, setCollapsed] = useState(false);
  const [city, setCity] = useState(query.get("city"));
  const [petType, setPetType] = useState(query.get("petType"));
  const [breed, setBreed] = useState(query.get("breed"));

  const filter = (values) => {
    console.log(values);
    const { city, petType, breed } = values;
    setCity(city);
    setBreed(breed);
    setPetType(petType);
    history.push({
      pathname: "/search",
      search: `?city=${city || ""}&petType=${petType || ""}&breed=${
        breed || ""
      }`,
    });

    // do filter
  };

  const clearFilters = () => {
    form.resetFields();
    history.push({
      pathname: "/search",
    });
  };

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
          onFinish={filter}
          style={{ padding: "20px" }}
          labelCol={{ span: 24, offset: 0 }}
          wrapperCol={{ span: 24, offset: 0 }}
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
          <Row>
            <Col span={24}>
              <Button type="primary" block htmlType="submit">
                Filter
              </Button>
              <Button
                block
                style={{ marginTop: "10px" }}
                onClick={() => clearFilters()}
              >
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
            <Col span={24}>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={listData}
                footer={<Text>Posted 20 minutes ago</Text>}
                renderItem={(item) => (
                  <List.Item
                    key={item.title}
                    extra={
                      <img
                        style={{ maxWidth: "100%" }}
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.href}>Title</a>}
                      description="Cat, persain  - Luton, Bedfordshire "
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </Col>
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
  mainRow: { padding: 24, background: "#fff" },
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
