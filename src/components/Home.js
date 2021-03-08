import React from "react";
import { ResponsiveImageSize } from "react-responsive-image";
import { Typography, Row, Col, Divider, Input, Button } from "antd";

import aboutMe from "../img/Untitled-2.png";

const { Title, Text } = Typography;

const Home = (props) => {
  return (
    <div>
      {props.payload ? (
        <b>Hi {props.payload.user.email}</b>
      ) : (
        <>
          <Row justify="space-around" align="middle">
            <Title>Pets for you</Title>
          </Row>
          <Row justify="space-around" align="middle">
            <br />
            <Col xs={24} lg={6}>
              <img alt="adopt me" style={{ width: "100%" }} src={aboutMe} />
            </Col>
            <Col xs={20} lg={14}>
              <Title level={4}>
                Mainly self-thought but currently studying at the University of
                Bedfordshire. Passionate about open-sourced technologies.
                Throughout the years I have explored multiple technologies by
                working on personal and collaborative projects, looking for
                something that I could settle on and further develop.
              </Title>
            </Col>
          </Row>
          <Divider />
          <Row>
            Search by city
            <Input></Input>
            <Button>Search</Button>
          </Row>
        </>
      )}
    </div>
  );
};

export default Home;
