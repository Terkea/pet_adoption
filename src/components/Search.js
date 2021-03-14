import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";

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
  Tooltip,
  Avatar,
  AutoComplete,
} from "antd";

import { MenuUnfoldOutlined } from "@ant-design/icons";
import Navigation from "./Navigation";
import petTypes from "../helpers/types_breeds.json";
import cities from "../helpers/uk_cities.json";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

import Moment from "react-moment";

const { Title, Text } = Typography;
const { Item } = Form;
const { Option } = Select;
const { Sider, Content } = Layout;

// HOW TO GRAB THE QUERY PARAMS FROM THE URL
// https://stackoverflow.com/questions/52652661/how-to-get-query-string-using-react
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = (props) => {
  // GETTING THE PARAMS
  let query = useQuery();
  const history = useHistory();
  const [form] = Form.useForm();

  const [collapsed, setCollapsed] = useState(false);
  const [city, setCity] = useState(query.get("city"));
  const [petType, setPetType] = useState(query.get("petType"));
  const [breed, setBreed] = useState(query.get("breed"));
  const [selectedBreed, setSelectedBreed] = useState([]);
  const [options, setOptions] = useState([]);

  // if params are mentioned used them in query. otherwise dont
  let queryPosts = [["status", "==", true]];
  if (city) {
    queryPosts = [
      ["city", "==", city],
      ...queryPosts.filter((i) => i[0] !== "city"),
    ];
  }
  if (breed) {
    queryPosts = [
      ["breed", "==", breed],
      ...queryPosts.filter((i) => i[0] !== "breed"),
    ];
  }
  if (petType) {
    queryPosts = [
      ["pet_type", "==", petType],
      ...queryPosts.filter((i) => i[0] !== "pet_type"),
    ];
  }
  useFirestoreConnect([
    {
      collection: "posts",
      where: queryPosts,
    },
  ]);
  const posts = useSelector(({ firestore: { data } }) => data.posts) || [];

  const updateOptions = (values) => {
    let arr = petTypes[values].map((i) => {
      return { value: i };
    });
    setSelectedBreed(arr);
  };

  const filter = (values) => {
    const { type, breed } = values;
    // setCity(city);
    setBreed(breed);
    setPetType(type);
    history.push({
      pathname: "/search",
      search: `?city=${city || ""}&petType=${type || ""}&breed=${breed || ""}`,
    });
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
    // if theres a type in the url update the breed selector options
    if (petType) updateOptions(petType);
  }, [form, city, petType, breed]);

  const handleSearch = (value) => {
    let res = [];

    if (value.length > 2) {
      // eslint-disable-next-line array-callback-return
      Object.keys(cities).map((city) => {
        if (city.toLowerCase().includes(value)) {
          return res.push({
            value: city,
            label: (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  {city}, {cities[city]}
                </span>
              </div>
            ),
          });
        }
      });
    }

    setOptions(res);
  };

  const onSelect = (value) => {
    setCity(value);
    history.push({
      pathname: "/search",
      search: `?city=${value}`,
    });
    console.log(value);
  };
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
          <Text>City:</Text>
          <AutoComplete
            onSearch={handleSearch}
            onSelect={onSelect}
            options={options}
            dropdownMatchSelectWidth={252}
            defaultValue={city}
            style={{ width: "100%", marginTop: "8px" }}
            label="city"
          >
            <Input placeholder="London" />
          </AutoComplete>
          <Item label="Type" name="type">
            <Select onChange={updateOptions}>
              {Object.keys(petTypes).map((i) => {
                return (
                  <Option key={i} value={i}>
                    {i}
                  </Option>
                );
              })}
            </Select>
          </Item>
          <Item label="Breed" name="breed">
            <Select options={selectedBreed}></Select>
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
          <Row justify="center" style={styles.mainRow}>
            <Col md={20} xs={20}>
              {posts !== [] ? (
                <List
                  itemLayout="vertical"
                  size="large"
                  // posts returns an object of all docs in the query
                  // transform the object of objects into an array of objects
                  // and appending to that the docId as key
                  dataSource={Object.keys(posts).map((i) => {
                    return { ...posts[i], key: i };
                  })}
                  renderItem={(item) => (
                    <List.Item
                      key={item.key}
                      style={{ background: "white", marginTop: "10px" }}
                      extra={
                        //firebase.google.com/docs/storage/web/download-files#create_a_reference
                        <img
                          style={{ maxWidth: "100%" }}
                          width={300}
                          alt="main_picture"
                          src={`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET}/o/pets%2F${item.pictures[0]}?alt=media`}
                        />
                      }
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={
                          <Link to={`post/${item.key}`}>{item.title}</Link>
                        }
                        description={
                          <Text>
                            {item.pet_type}, {item.breed}, {item.city}
                          </Text>
                        }
                      />
                      {item.description.length > 500 ? (
                        <Text>{item.description.substr(0, 500) + "..."}</Text>
                      ) : (
                        <Text>{item.description}</Text>
                      )}
                      <br />
                      {
                        <Text>
                          Posted <Moment fromNow>{item.date}</Moment>
                        </Text>
                      }
                    </List.Item>
                  )}
                />
              ) : (
                <List loading={true} />
              )}
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
  mainRow: { padding: 24 },
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
