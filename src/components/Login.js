import React, { useEffect, useState } from "react";
import {  useHistory, Link } from "react-router-dom";

import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  AutoComplete,
  Modal,
} from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";

import SvgBackground from "../containers/SvgBackground";
import { runNotifications } from "../helpers/Notification";
import { useFirebase } from "react-redux-firebase";
import { connect } from "react-redux";

const { Title, Text } = Typography;

const styles = {
  heightForTheRow: {
    minHeight: "100%",
    background: "rgba(220, 220, 220, 0.2)",
  },
  logo: {
    fontSize: "100px",
    width: "100%",
    marginBottom: "30px",
  },
  loginButton: {
    width: "100%",
  },
};

const Login = (props) => {
  const firebase = useFirebase();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    if (props.authError) {
      runNotifications(props.authError.message, "ERROR");
    }
  }, [props.authError]);

  // E-mail autocomplete
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value || value.search("@") !== -1) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        ["@gmail.com", "@hotmail.com", "@outlook.com", "@yahoo.com"].map(
          (domain) => `${value}${domain}`
        )
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const onOkModal = () => {
    form.submit();
  };

  const onFinishModals = (values) => {
    firebase.resetPassword(values.forgottenEmail).then(() => {
      runNotifications(
        `Thanks! Please check ${values.forgottenEmail} for a link to reset your password.`,
        "SUCCESS"
      );
    });
  };

  const onFinish = (values) => {
    firebase
      .login({ email: values.email, password: values.password })
      .then(() => history.push("/"));
  };

  return (
    <SvgBackground>
      <Modal
        title="Change password"
        visible={modalVisibility}
        onOk={onOkModal}
        onCancel={() => {
          setModalVisibility(false);
        }}
      >
        <LockOutlined style={styles.logo} />
        <Text type="secondary">
          Enter your email and we'll send you a link to get back into your
          account.
        </Text>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinishModals}
          form={form}
          style={{ marginTop: "20px" }}
        >
          <Form.Item
            name="forgottenEmail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <AutoComplete options={websiteOptions} onChange={onWebsiteChange}>
              <Input
                placeholder="Email address"
                prefix={<MailOutlined className="site-form-item-icon" />}
              />
            </AutoComplete>
          </Form.Item>
        </Form>
      </Modal>

      <Row
        type="flex"
        justify="center"
        align="middle"
        style={styles.heightForTheRow}
      >
        <Col sm={14} md={14} lg={6}>
          <UserOutlined style={styles.logo} />
          <Title align="middle">Login</Title>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <AutoComplete options={websiteOptions} onChange={onWebsiteChange}>
                <Input
                  placeholder="Email"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                />
              </AutoComplete>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Link
                to="#"
                style={{ marginLeft: "30px" }}
                onClick={() => {
                  setModalVisibility(true);
                }}
              >
                Forgot password?
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </SvgBackground>
  );
};

const enhance = connect(
  // Map redux state to component props
  ({ firebase: { authError } }) => ({
    authError,
  })
);

export default enhance(Login);
