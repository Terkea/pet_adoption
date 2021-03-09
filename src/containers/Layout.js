import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useFirebase, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const firebase = useFirebase();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]}>
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>

          {/* PUBLIC ROUTES */}

          {!isEmpty(auth) ? null : (
            <Menu.Item key="/login">
              <Link to="/login/">Login</Link>
            </Menu.Item>
          )}

          {!isEmpty(auth) ? null : (
            <Menu.Item key="/register">
              <Link to="/register">Register</Link>
            </Menu.Item>
          )}

          {/* AUTH ROUTES */}
          {!isEmpty(auth) ? (
            <Menu.Item key="/my_profile">
              <Link to="/my_profile">My profile</Link>
            </Menu.Item>
          ) : null}
          {!isEmpty(auth) === true ? (
            <Menu.Item key="/logout">
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  firebase.logout();
                }}
              >
                Logout
              </Link>
            </Menu.Item>
          ) : null}
        </Menu>
      </Header>
      <Content style={{ padding: "0 10px", height: "100vh" }}>
        <div style={{ padding: 24 }}>{props.children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Pets for you</Footer>
    </Layout>
  );
};

export default CustomLayout;
