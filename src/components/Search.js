import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { Row, Col, List, Typography, Input, Form, Button, Select } from "antd";

const { Title, Text } = Typography;
const { Item } = Form;
const { Option } = Select;

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

  return (
    <>
      <Row wrap={true} style={styles.rowMain}>
        <Col md={3} xs={0} style={styles.colFitlers}>
          <Title level={2} style={styles.titleFilters}>
            Filters
          </Title>
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 24, offset: 2 }}
            wrapperCol={{ span: 20, offset: 2 }}
          >
            <Item label="City">
              <Input placeholder="London" />
            </Item>
            <Item label="Type">
              <Select>
                <Option value="demo">Demo</Option>
              </Select>
            </Item>
            <Item label="Breed">
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
        </Col>

        <Col md={17} xs={20} offset={2} style={styles.colPosts}>
          <List
            size="large"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Col>
      </Row>
    </>
  );
};

const styles = {
  rowMain: { minHeight: "100vh", overflow: "auto" },
  colFitlers: {
    background: "#ccc",
    paddingTop: "150px",
    position: "fixed",
    top: "50px",
    left: 0,
    zIndex: 1,
    height: "100%",
  },
  colPosts: { marginTop: "100px" },
  titleFilters: { textAlign: "center", marginBottom: "50px" },
};

export default Search;
