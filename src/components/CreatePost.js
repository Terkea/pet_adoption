import React, { useState } from "react";

import {
  Row,
  Col,
  Typography,
  Button,
  Layout,
  Form,
  Input,
  Card,
  Upload,
  message,
  Select,
  Tooltip,
} from "antd";

import Navigation from "./Navigation";
import petTypes from "../helpers/types_breeds.json";
import uuid from "react-uuid";

import { InboxOutlined } from "@ant-design/icons";
import { storage } from "../createStore";

import { useFirestore } from "react-redux-firebase";
import { runNotifications } from "../helpers/Notification";

const { Title } = Typography;
const { Content } = Layout;
const { Dragger } = Upload;
const { Option } = Select;
const { Item } = Form;
const { TextArea } = Input;

let pictures = [];
const CreatePost = (props) => {
  const [form] = Form.useForm();
  const firestore = useFirestore();
  const [fileList, updateFileList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState([
    {
      value: "Pet Type (Any)",
    },
  ]);

  const updateOptions = (values) => {
    let arr = petTypes[values].map((i) => {
      return { value: i };
    });
    setSelectedBreed(arr);
  };

  const customUpload = ({ onError, onSuccess, file }) => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = storage.ref();
    const imageName = uuid(); //a unique name for the image

    const imgFile = storageRef.child(`pets/${imageName}.jpg`);
    const image = imgFile.put(file, metadata);
    image.then((snapshot) => {
      onSuccess(null, image);
      pictures.push(`${imageName}.jpg`);
      console.log("imageName", imageName);
      message.success(`File uploaded successfully.`);
      console.log("pictures", pictures);
    });
  };

  const options = {
    fileList,
    name: "file",
    multiple: true,
    showUploadList: true,
    onChange: (info) => {
      updateFileList(info.fileList.filter((file) => !!file.status));
    },
  };

  const onFinish = (values) => {
    // get only the fields that have values
    const validValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v != null)
    );
    validValues.pictures = pictures;
    console.log(pictures);
    console.log(validValues);
    try {
      return firestore
        .collection("posts")
        .add(validValues)
        .then(() => {
          runNotifications("Post created successfully", "SUCCESS");
          // TODO: add redirect to post
        });
    } catch (e) {
      runNotifications("You need to upload at least one picture", "ERROR");
    }
  };
  return (
    <Layout style={{ width: "100%", minHeight: "100vh" }}>
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
            Create post
          </Title>
          <Row justify="center">
            <Col md={8} xs={20}>
              <Card>
                <Dragger customRequest={customUpload} {...options}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </Dragger>

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
                    rules={[
                      { required: true, message: "Title field is required" },
                    ]}
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
                    rules={[
                      { required: true, message: "Breed field is required" },
                    ]}
                  >
                    <Select
                      placeholder="Select breed"
                      options={selectedBreed}
                    ></Select>
                  </Item>

                  <Item name="age" label="Age" rules={[{ required: false }]}>
                    <Input />
                  </Item>
                  <Item
                    name="Location"
                    label="Location"
                    rules={[
                      {
                        required: true,
                        message: "Location field is mandatory",
                      },
                    ]}
                  >
                    <Input />
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
                    Submit
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

const styles = {
  mainRow: { padding: 24 },
  content: { margin: "50px 16px 0", overflow: "initial", marginBottom: "50px" },
};

export default CreatePost;
