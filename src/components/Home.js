import React, { useState } from "react";
import { ResponsiveImageSize } from "react-responsive-image";
import { Typography, Row, Col, Input, AutoComplete, Layout } from "antd";

// SVGS
import picture from "../img/Untitled-2.png";
import background from "../img/Background.png";
import cities from "../helpers/uk_cities.json";
import whyAdopting from "../img/3813540.svg";
import didYouKnow from "../img/3767179.svg";
import homelessPets from "../img/3824645.svg";
import adoptedPets from "../img/3780524.svg";
import adoptDontBuy from "../img/4143369.svg";
import fundUs from "../img/4176419.svg";

const { Title, Text } = Typography;
const { Footer } = Layout;
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

  const styles = {
    svgContainer: {
      backgroundImage: `url(${background})`,
      margin: 0,
      padding: 0,
      backgroundPosition: "left center !important",
      backgroundSize: "cover",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "auto",
    },
  };

  return (
    <div>
      {props.payload ? (
        <b>Hi {props.payload.user.email}</b>
      ) : (
        <>
          <div style={styles.svgContainer}>
            <Row
              justify="space-around"
              align="middle"
              style={{
                height: "100vh",
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              <Col xs={20} lg={6}>
                <img alt="adopt me" style={{ width: "80%" }} src={picture} />

                <Title style={{ marginTop: "20px" }} level={1}>
                  Adopt a pet, save a life.
                </Title>
                <AutoComplete
                  style={{ width: "85%" }}
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
              </Col>
            </Row>
          </div>

          {/* SECOND SECTION */}
          <Row
            justify="space-around"
            align="middle"
            style={{
              marginTop: "50px",
              marginBottom: "150px",
            }}
          >
            <Col xs={24} lg={12}>
              <ResponsiveImageSize default minWidth={0} path={whyAdopting} />
              <Title level={4}>Why adopting?</Title>
              <Text style={{ fontSize: "16px" }}>
                Mainly self-thought but currently studying at the University of
                Bedfordshire. Passionate about open-sourced technologies.
                Throughout the years I have explored multiple technologies by
                working on personal and collaborative projects, looking for
                something that I could settle on and further develop.
              </Text>
            </Col>

            <Col xs={24} lg={8}>
              <ResponsiveImageSize minWidth={100} path={didYouKnow} />
              <Title level={4}>Did you know?</Title>
              <Text style={{ fontSize: "16px" }}>
                Mainly self-thought but currently studying at the University of
                Bedfordshire. Passionate about open-sourced technologies.
              </Text>
            </Col>
          </Row>

          {/* STATS */}

          <Row
            justify="space-around"
            align="middle"
            style={{ marginTop: "50px", background: "#f0f2f5" }}
          >
            <Col style={{ textAlign: "center" }} xs={24} lg={6}>
              <ResponsiveImageSize default minWidth={0} path={adoptedPets} />
              <Title level={2}>
                Since we launched we found shelters for more than 231,312 pets
              </Title>
            </Col>
            <Col style={{ textAlign: "center" }} xs={24} lg={6}>
              <ResponsiveImageSize default minWidth={0} path={homelessPets} />
              <Title level={2}>
                Each day 312 pets remain homeless due to diverse reasons
              </Title>
            </Col>

            <Col style={{ textAlign: "center" }} xs={24} lg={6}>
              <ResponsiveImageSize default minWidth={0} path={adoptDontBuy} />
              <Title level={2}>
                Why buying a new pet when there are so many homeless ones out
                there?
              </Title>
            </Col>
          </Row>

          {/* FUND US */}
          <Row
            justify="space-around"
            align="middle"
            style={{ marginTop: "50px", marginBottom: "50px" }}
          >
            <Col style={{ textAlign: "center" }} xs={24} lg={6}>
              <Title>Support us</Title>
              <ResponsiveImageSize default minWidth={0} path={fundUs} />
              <Title level={4}>
                If you like our cause dont hesitate and support us. All the
                money will go into pet care.
              </Title>
            </Col>
          </Row>
          <Footer style={{ textAlign: "center" }}>
            <Text>Copyright © 2021 Pets for you. All rights reserved.</Text>
            <br />
            <a href="https://www.freepik.com/free-photos-vectors/work">
              <Text>Work vector created by freepik</Text>
            </a>
          </Footer>
        </>
      )}
    </div>
  );
};

export default Home;
