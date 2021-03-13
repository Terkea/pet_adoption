import React from "react";

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
} from "antd";

import { InboxOutlined } from "@ant-design/icons";
import Navigation from "./Navigation";

import { useFirestore } from "react-redux-firebase";

const { Title } = Typography;
const { Content } = Layout;
const { Dragger } = Upload;

const CreatePost = (props) => {
  const [form] = Form.useForm();
  const firestore = useFirestore();

  const fileupload = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = (values) => {
    return firestore.collection("posts").add(values);
  };
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
            Create post
          </Title>
          <Row justify="center">
            <Col md={16} xs={20}>
              <Card>
                <Dragger {...fileupload} style={{ marginBottom: "30px" }}>
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

                <Form form={form} onFinish={onFinish}>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input type="password" placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Submit
                    </Button>
                  </Form.Item>
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
  content: { margin: "50px 16px 0", overflow: "initial" },
};

export default CreatePost;
