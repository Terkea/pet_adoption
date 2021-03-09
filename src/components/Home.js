import React, { useState } from "react";
import { ResponsiveImageSize } from "react-responsive-image";
import { Typography, Row, Col, Divider, Input, Card, AutoComplete } from "antd";
import picture from "../img/Untitled-2.png";
import cities from "../helpers/uk_cities.json";

const { Search } = Input;
const { Option } = AutoComplete;
const { Title, Text } = Typography;

const Home = (props) => {
  const [options, setOptions] = useState([]);

  const handleSearch = (value) => {
    let res = [];

    if (value.length > 2) {
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
                <span>
                  <b>{Math.random(1)}</b> results
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
    console.log("onSelect", value);
  };

  return (
    <div>
      {props.payload ? (
        <b>Hi {props.payload.user.email}</b>
      ) : (
        <>
          <Row
            justify="space-around"
            align="middle"
            style={{ marginTop: "20px" }}
          >
            <Col xs={20} lg={6}>
              <img alt="adopt me" style={{ width: "100%" }} src={picture} />
            </Col>
            <Col xs={18} lg={10}>
              <Title level={4}></Title>
              <Card title="Who are we?" bordered={true}>
                <Text>
                  <b>Pets for you</b> was foundered to give rescued animals the
                  best possible lives. Be it feed, bedding or veterinary care,
                  each and every resident is given all they need to lead safe
                  and happy lives. By adopting a rescued farm animal, you will
                  help us to care for both them and their friends.
                </Text>
                <AutoComplete
                  style={{ width: "100%", marginTop: "20px" }}
                  onSearch={handleSearch}
                  onSelect={onSelect}
                  options={options}
                  dropdownMatchSelectWidth={252}
                >
                  <Input.Search
                    size="large"
                    placeholder="Search by city..."
                    enterButton
                  />
                </AutoComplete>
              </Card>
            </Col>
          </Row>
          <Divider />
        </>
      )}
    </div>
  );
};

export default Home;
