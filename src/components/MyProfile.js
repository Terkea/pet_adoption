import React, { useEffect, useState } from "react";

import {
  Input,
  Form,
  Row,
  Col,
  Typography,
  Avatar,
  Button,
  Card,
  Layout,
} from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";

import { useHistory, Link } from "react-router-dom";

// import ChangePassword from "./CustomModal";
import { runNotifications } from "../helpers/Notification";
import UploadProfilePicture from "./UploadProfilePicture";
import Navigation from "./Navigation";
import { useSelector, connect } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { storage } from "../createStore";
const { Title } = Typography;

const MyProfile = (props) => {
  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  const auth = useSelector((state) => state.firebase.auth);
  const storageRef = storage.ref();
  const [avatar, setAvatar] = useState();
  // ANTD FORM INPUT TRICKERY
  // https://stackoverflow.com/a/61244400/8193864
  // https://stackoverflow.com/a/62855456/8193864

  const [form] = Form.useForm();
  const { Content } = Layout;

  const history = useHistory();
  useEffect(() => {
    // check if logged in
    // if (isEmpty(auth)) {
    //   history.push("/");
    // } else {
    // Set up the default values for the inputs
    form.setFieldsValue({
      newEmail: profile.email,
      displayName: profile.username,
      phoneNo: profile.phoneNo,
      address: profile.address,
      city: profile.city,
      postcode: profile.postcode,
    });

    // get the url for the avatar
    storageRef
      .child(`avatar/${profile.photoURL}`)
      .getDownloadURL()
      .then((res) => {
        setAvatar(res);
      })
      .catch((e) => console.log(e));

    if (props.authError) {
      runNotifications(props.authError.message, "ERROR");
    }
    // }
  }, [form, history, auth, props, profile, storageRef]);

  const onFinish = (values) => {
    if (values.newEmail !== auth.email) {
      firebase
        .login({ email: auth.email, password: values.current_password })
        .then(() => {
          firebase
            .updateEmail(values.newEmail)
            .then(() => {
              runNotifications(
                `Email address updated to ${values.newEmail}`,
                "SUCCESS"
              );
              firebase.updateProfile({
                email: values.newEmail,
              });
            })
            .catch((e) => {
              console.log();
              runNotifications(e.message, "ERROR");
            });
        });
    }

    firebase
      .login({ email: auth.email, password: values.current_password })
      .then(() => {
        firebase
          .updateProfile({
            username: values.displayName,
            phoneNo: values.phoneNo || "",
            city: values.city || "",
            postcode: values.postcode || "",
            address: values.address || "",
          })
          .then(() => {
            runNotifications("Successfully updated profile", "SUCCESS");
          })
          .catch((e) => {
            runNotifications(e.message, "ERROR");
          });
      });
  };

  const resetPassword = () => {
    firebase.resetPassword(profile.email).then(() => {
      runNotifications(
        `Please check ${profile.email} for a link to reset your password.`,
        "SUCCESS"
      );
    });
  };

  return (
    <Layout>
      <Navigation />
      <Content style={styles.content}>
        <Title style={{ textAlign: "center" }}>My profile</Title>
        <Row justify="center" style={styles.mainRow}>
          <Card style={{ width: 700 }}>
            <Row align="center">
              <Avatar
                align="middle"
                src={avatar}
                size={256}
                icon={<UserOutlined />}
              />
            </Row>
            <Row style={{ marginTop: "20px" }} align="center">
              <UploadProfilePicture />
            </Row>

            <Row align="center">
              <Col style={{ marginLeft: "10px" }} md={20}>
                <Form
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  form={form}
                  name="normal_login"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="displayName"
                    label="Display name:"
                    rules={[
                      {
                        required: true,
                        message: "Please input your display name!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                    />
                  </Form.Item>

                  <Form.Item
                    name="newEmail"
                    label="New email:"
                    rules={[
                      { required: false, message: "Please input your E-mail!" },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Telephone number"
                    name="phoneNo"
                    rules={[
                      {
                        required: false,
                        message: "Please input your phone!",
                      },
                    ]}
                  >
                    <Input prefix={<PhoneOutlined />} />
                  </Form.Item>

                  <Form.Item
                    label="City"
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "Please input your city!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Full address"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your address!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Postcode"
                    name="postcode"
                    rules={[
                      {
                        required: true,
                        message: "Please input your postcode!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Current password:"
                    name="current_password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your current password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                    />
                  </Form.Item>

                  <Row align="middle">
                    <Col offset={8} span={8}>
                      <Button
                        block={true}
                        size={"medium"}
                        type="primary"
                        htmlType="submit"
                      >
                        Update profile
                      </Button>
                    </Col>
                    <Col offset={2} span={6} align="end">
                      <Link to="#" onClick={resetPassword} type="primary">
                        Change password
                      </Link>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card>
        </Row>
      </Content>
    </Layout>
  );
};

const enhance = connect(
  // Map redux state to component props
  ({ firebase: { authError } }) => ({
    authError,
  })
);

const styles = {
  logo: {
    fontSize: "100px",
    width: "100%",
    marginBottom: "30px",
  },
  mainRow: {
    paddingTop: "30px",
  },
  content: {
    margin: "100px 16px 0",
    overflow: "initial",
    minHeight: "100vh",
  },
};

export default enhance(MyProfile);
