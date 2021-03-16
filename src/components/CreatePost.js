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
  AutoComplete,
} from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "./Navigation";
import petTypes from "../helpers/types_breeds.json";
import cities from "../helpers/uk_cities.json";
import uuid from "react-uuid";

import { InboxOutlined } from "@ant-design/icons";
import { storage } from "../createStore";

import { useFirestore } from "react-redux-firebase";
import { runNotifications } from "../helpers/Notification";

const { Title, Text } = Typography;
const { Content } = Layout;
const { Dragger } = Upload;
const { Option } = Select;
const { Item } = Form;
const { TextArea } = Input;

let pictures = [];
const CreatePost = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const firestore = useFirestore();
  const [fileList, updateFileList] = useState([]);
  const [options, setOptions] = useState([]);
  const [city, setCity] = useState("");
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);
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

  const customUpload = ({ onSuccess, file }) => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = storage.ref();
    const imageName = uuid(); //a unique name for the image

    const imgFile = storageRef.child(`pets/${imageName}.jpg`);
    const image = imgFile.put(file, metadata);
    image.then(() => {
      onSuccess(null, image);
      pictures.push(`${imageName}.jpg`);
      console.log("imageName", imageName);
      message.success(`File uploaded successfully.`);
      console.log("pictures", pictures);
    });
  };

  const uploadOptions = {
    fileList,
    name: "file",
    multiple: true,
    showUploadList: true,
    onChange: (info) => {
      updateFileList(info.fileList.filter((file) => !!file.status));
    },
  };

  const onFinish = (values) => {
    // debugger;
    if (pictures.length === 0)
      runNotifications("You need to upload at least one picture", "ERROR");

    if (city === "") runNotifications("City field is mandatory", "ERROR");

    if (pictures.length > 0 && city !== "") {
      // get only the fields that have values
      const newPost = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v != null)
      );
      newPost.pictures = pictures;
      newPost.userId = auth.uid;
      newPost.timestamp = firestore.FieldValue.serverTimestamp();
      newPost.views = 0;
      newPost.city = city;
      newPost.userAvatar = profile.photoURL;
      newPost.phone = profile.phoneNo;
      // if status = true it means that the post is still valid,
      // otherwise the pet was adopted
      newPost.status = true;
      try {
        return firestore
          .collection("posts")
          .add(newPost)
          .then(() => {
            runNotifications("Post created successfully", "SUCCESS");
            history.push("/dashboard");
            // TODO: add redirect to post
          });
      } catch (e) {
        runNotifications("You need to upload at least one picture", "ERROR");
      }
    }
  };

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
            <Col md={8} xs={20} align="middle">
              <Card>
                <Dragger customRequest={customUpload} {...uploadOptions}>
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
                  <Text style={{ marginRight: "10px" }}>City:</Text>
                  <AutoComplete
                    onSearch={handleSearch}
                    onSelect={onSelect}
                    options={options}
                    dropdownMatchSelectWidth={252}
                    label="city"
                    style={{
                      width: "77%",
                      // marginTop: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <Input name="city" placeholder="London" />
                  </AutoComplete>
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
