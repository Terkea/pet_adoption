import React from "react";

import { Row, Col, Typography, Button, Layout, Table, Space } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

const { Title, Text } = Typography;
const { Content } = Layout;

const AdoptionDashboard = (props) => {
  const firestore = useFirestore();
  const history = useHistory();
  const auth = useSelector((state) => state.firebase.auth);
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
      render: (text, record, index) => {
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
      render: (text, record, index) => (
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

  const updatePost = (docId) => {
    history.push(`/post/${docId}`);
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
