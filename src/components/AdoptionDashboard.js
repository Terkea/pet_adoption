import React, { useState } from "react";

import {
  Row,
  Col,
  Typography,
  Button,
  Layout,
  Table,
  Space,
  Drawer,
  Select,
  Tooltip,
  Form,
  Input,
} from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty, useFirestoreConnect } from "react-redux-firebase";
import { useFirestore } from "react-redux-firebase";
import petTypes from "../helpers/types_breeds.json";

const { Title, Text } = Typography;
const { Content } = Layout;
const { Option } = Select;
const { Item } = Form;
const { TextArea } = Input;

const AdoptionDashboard = () => {
  const firestore = useFirestore();
  const [form] = Form.useForm();
  const auth = useSelector((state) => state.firebase.auth);
  const [visible, setVisible] = useState(false);
  const [post, setPost] = useState({});
  const [selectedBreed, setSelectedBreed] = useState([
    {
      value: "Pet Type (Any)",
    },
  ]);
  // query for all posts using the userId
  useFirestoreConnect([
    {
      collection: "posts",
      userId: auth.uid,
    },
  ]);

  const posts = useSelector(({ firestore: { data } }) => data.posts) || [];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Type",
      dataIndex: "pet_type",
    },
    {
      title: "Breed",
      dataIndex: "breed",
    },
    {
      title: "Views",
      dataIndex: "views",
    },
    {
      title: "Adopted?",
      dataIndex: "status",
      render: (text, record) => {
        return text ? (
          <Button
            value="small"
            onClick={() => {
              markAsAdopted(record.key);
            }}
          >
            Mark as adopted
          </Button>
        ) : (
          <Text color={"green"}>Adopted</Text>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              updatePost(record.key);
            }}
            value="small"
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => {
              deletePost(record.key);
            }}
            danger
            value="small"
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const markAsAdopted = (docId) => {
    firestore.collection("posts").doc(docId).update({ status: false });
  };

  const deletePost = (docId) => {
    firestore.collection("posts").doc(docId).delete();
  };

  const onFinish = (values) => {
    // console.log(values, post[0].key);
    firestore
      .collection("posts")
      .doc(post[0].key)
      .update(
        Object.fromEntries(Object.entries(values).filter(([_, v]) => v != null))
      );
    onClose();
  };

  const updateOptions = (values) => {
    let arr = petTypes[values].map((i) => {
      return { value: i };
    });
    setSelectedBreed(arr);
  };

  const updatePost = (docId) => {
    // eslint-disable-next-line array-callback-return
    let search = Object.keys(posts).map((i) => {
      if (i === docId) return { ...posts[i], key: i };
    });
    setPost(search);

    form.setFieldsValue({
      title: search[0].title,
      pet_type: search[0].pet_type,
      breed: search[0].breed,
      microchiped: search[0].microchiped,
      neutred: search[0].neutred,
      registered: search[0].registered,
      vaccinations_up_to_date: search[0].vaccinations_up_to_date,
      description: search[0].description,
    });

    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout style={{ width: "100%", height: "100vh" }}>
      <Navigation />
      <Layout>
        {!isEmpty(post) ? (
          <Drawer
            title="Update post"
            placement="right"
            closable={false}
            width={520}
            onClose={onClose}
            visible={visible}
          >
            <Form
              form={form}
              onFinish={onFinish}
              layout="horizontal"
              style={{ marginTop: "20px" }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
            >
              <Item
                name="title"
                label="Post title"
                rules={[{ required: true, message: "Title field is required" }]}
              >
                <Input />
              </Item>
              <Item
                name="pet_type"
                label="Pet Type"
                rules={[
                  { required: true, message: "Pet type field is required" },
                ]}
              >
                <Select onChange={updateOptions} placeholder="Pet type">
                  {Object.keys(petTypes).map((i) => {
                    return (
                      <Option key={i} value={i}>
                        {i}
                      </Option>
                    );
                  })}
                </Select>
              </Item>
              <Item
                name="breed"
                label="Breed"
                rules={[{ required: true, message: "Breed field is required" }]}
              >
                <Select
                  placeholder="Select breed"
                  options={selectedBreed}
                ></Select>
              </Item>

              <Item
                name="microchiped"
                label={
                  <Tooltip
                    title="Microchipping a pet is the process of implanting a chip under the 
                      pets skin and registering the keepers details on a national database so
                      that the keeper can be traced."
                  >
                    Microchiped?
                  </Tooltip>
                }
                rules={[{ required: false }]}
              >
                <Select placeholder="Is the pet microchiped?">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Item>
              <Item
                name="registered"
                label="Registered?"
                rules={[{ required: false }]}
              >
                <Select placeholder="Is the pet registered?">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Item>
              <Item
                name="neutred"
                label={
                  <Tooltip title="Neutering is a small surgical operation performed by a vet to prevent the animal from being able to have babies.">
                    Neutred?
                  </Tooltip>
                }
                rules={[{ required: false }]}
              >
                <Select placeholder="Is the pet neutred?">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Item>
              <Item
                name="vaccinations_up_to_date"
                label="Vaccinations Up-to-Date?"
                rules={[{ required: false }]}
              >
                <Select placeholder="Vaccinations Up-to-Date?">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Item>

              <Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Description field is required",
                  },
                ]}
              >
                <TextArea placeholder="Pet requirements, preferences..." />
              </Item>

              <Button
                block
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Update
              </Button>
            </Form>
          </Drawer>
        ) : (
          "Loading..."
        )}
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
                <Link to="/create_post">Create new post</Link>
              </Button>
              <Table
                rowKey="key"
                style={{
                  marginTop: "10px",
                  background: "white",
                }}
                columns={columns}
                // posts returns an object of all docs in the query
                // transform the object of objects into an array of objects
                // and appending to that the docId as key
                dataSource={Object.keys(posts).map((i) => {
                  return { ...posts[i], key: i };
                })}
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
