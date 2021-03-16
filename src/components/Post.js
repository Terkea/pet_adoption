import React, { useRef } from "react";

import {
  Row,
  Col,
  Typography,
  Avatar,
  Button,
  Card,
  Layout,
  Descriptions,
  Badge,
  message,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { isEmpty, isLoaded, useFirestoreConnect } from "react-redux-firebase";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";
import Gallery from "react-photo-gallery";
const { Title } = Typography;
const { Content } = Layout;

const Post = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const phoneNumber = useRef(null);
  let { id } = useParams();

  useFirestoreConnect([
    {
      collection: "posts",
    },
  ]);
  const post =
    useSelector(({ firestore: { data } }) => data.posts && data.posts[id]) ||
    {};

  const generateRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const revealNumber = (e) => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      phoneNumber.current.innerText = post.phone;
    } else {
      message.error("You need to login first");
    }
  };

  return (
    <Layout>
      <Navigation {...{ selectedKey: "/" }} />
      <Content style={styles.content}>
        <Title style={{ textAlign: "center", marginTop: "100px" }}>
          {post.title}
        </Title>
        {!isEmpty(post) ? (
          <Row justify="center" style={styles.mainRow}>
            <Col offset={1} md={13} xs={20}>
              <Card>
                <Gallery
                  style={{ height: "500px" }}
                  photos={post.pictures.map((i) => {
                    return {
                      src: `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET}/o/pets%2F${i}?alt=media`,
                      width: generateRandomInt(1, 3),
                      height: 1,
                    };
                  })}
                />
                <Descriptions
                  title="Post info"
                  layout="vertical"
                  bordered
                  style={{ marginTop: "50px" }}
                >
                  <Descriptions.Item label="Type">
                    {post.pet_type}
                  </Descriptions.Item>

                  <Descriptions.Item label="Breed" span={2}>
                    {post.breed}
                  </Descriptions.Item>

                  <Descriptions.Item label="Status" span={3}>
                    {post.microchiped === true ? (
                      <Badge status="success" text="Microchiped" />
                    ) : post.microchiped === false ? (
                      <Badge status="error" text="Microchiped" />
                    ) : (
                      <Badge status="default" text="Microchiped" />
                    )}
                    <br />

                    {post.registered === true ? (
                      <Badge status="success" text="Registered" />
                    ) : post.registered === false ? (
                      <Badge status="error" text="Registered" />
                    ) : (
                      <Badge status="default" text="Registered" />
                    )}
                    <br />

                    {post.neutred === true ? (
                      <Badge status="success" text="Neutred" />
                    ) : post.neutred === false ? (
                      <Badge status="error" text="Neutred" />
                    ) : (
                      <Badge status="default" text="Neutred" />
                    )}
                    <br />

                    {post.vaccinations_up_to_date === true ? (
                      <Badge status="success" text="Vaccinations Up-to-Date" />
                    ) : post.vaccinations_up_to_date === false ? (
                      <Badge status="error" text="Vaccinations Up-to-Date" />
                    ) : (
                      <Badge status="default" text="Vaccinations Up-to-Date" />
                    )}
                    <br />
                  </Descriptions.Item>

                  <Descriptions.Item label="City">
                    {post.city}
                  </Descriptions.Item>
                  <Descriptions.Item label="Posted" span={2}>
                    {<Moment fromNow>{post.date}</Moment>}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description" span={3}>
                    {post.description}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col md={4} xs={24}>
              <Row justify="center" align="middle">
                <Card>
                  <Title level={3}>Contact the owner</Title>
                  <div style={{ display: "inline", marginLeft: "50px" }}>
                    <Avatar
                      size={100}
                      src={`https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET}/o/avatar%2F${post.userAvatar}?alt=media`}
                    />
                    <Title level={4} style={{ textAlign: "center" }}>
                      {post.username || "Anonym"}
                    </Title>
                  </div>
                  <Button
                    type="primary"
                    ref={phoneNumber}
                    onClick={revealNumber}
                    block
                  >
                    Get phone number
                  </Button>
                </Card>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row justify="center" style={styles.mainRow}>
            <LoadingOutlined style={{ fontSize: "250px" }} />
          </Row>
        )}
      </Content>
    </Layout>
  );
};

const styles = {
  content: { minHeight: "100vh" },
  mainRow: {},
};

export default Post;
