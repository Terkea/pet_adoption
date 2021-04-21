import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {Row, Col, Form, Input, Button, Typography, AutoComplete, DatePicker} from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import SvgBackground from "../containers/SvgBackground";
import { runNotifications } from "../helpers/Notification";
import { useFirebase } from "react-redux-firebase";
import { connect } from "react-redux";

const { Title } = Typography;

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
  registerButton: {
    width: "100%",
  },
};

const Register = (props) => {
  const history = useHistory();
  const firebase = useFirebase();
  const [dob, setDob] = useState('')

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
  const onFinish = (values) => {
    firebase
      .createUser(
        {
          email: values.email,
          password: values.password,
        },
        {
          username: values.username,
          email: values.email,
          dob: dob.toString(),
          phoneNo: values.telephone,
        }
      )
      .then(() => {
        runNotifications("Account successfully created", "SUCCESS");
        history.push("/");
      });
  };

  return (
    <SvgBackground>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={styles.heightForTheRow}
      >
        <Col sm={14} md={14} lg={6}>
          <UserOutlined style={styles.logo} />
          <Title align="middle">Register</Title>
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
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                placeholder="Username"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <DatePicker style={{width: '100%'}} onChange={setDob} placeholder="Date of birth" />

            <Form.Item
                style={{marginTop: '20px'}}
              name="telephone"
              rules={[
                {
                  required: true,
                  message: "Please input your telephone number!",
                },
              ]}
            >
              <Input
                placeholder="Mobile Number"
                prefix={<PhoneOutlined className="site-form-item-icon" />}
              />
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

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                style={styles.registerButton}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
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

export default enhance(Register);
