import React from "react";
import { Layout, Menu, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useFirebase, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navigation = (props) => {
  const auth = useSelector((state) => state.firebase.auth);
  const firebase = useFirebase();

  return (
    <Header
      style={{
        width: "100%",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]}>
        <Menu.Item key="/">
          <Tooltip placement="bottom" title="Home">
            <Link to="/">
              <HomeOutlined style={{ width: "100%" }} />
            </Link>
          </Tooltip>
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
            <Tooltip placement="bottom" title="My profile">
              <Link to="/my_profile">
                <UserOutlined style={{ width: "100%" }} />
              </Link>
            </Tooltip>
          </Menu.Item>
        ) : null}
        {!isEmpty(auth) === true ? (
          <Menu.Item key="/logout">
            <Tooltip placement="bottom" title="Logout">
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  firebase.logout();
                }}
              >
                <LogoutOutlined style={{ width: "100%" }} />
              </Link>
            </Tooltip>
          </Menu.Item>
        ) : null}
      </Menu>
    </Header>
  );
};

export default Navigation;
