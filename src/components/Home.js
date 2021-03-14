import React, { useState } from "react";
import { ResponsiveImageSize } from "react-responsive-image";
import { Typography, Row, Col, Input, AutoComplete, Layout } from "antd";
import { useHistory } from "react-router-dom";
import Navigation from "./Navigation";

import cities from "../helpers/uk_cities.json";
// SVGS
import picture from "../img/Untitled-2.png";
import background from "../img/Background.png";
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
  let history = useHistory();

  const handleSearch = (value) => {
    let res = [];

    if (value.length > 2) {
      // eslint-disable-next-line array-callback-return
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
    history.push(`/search?city=${value}`);
  };

  return (
    <Layout>
      <Navigation />
      {props.payload ? (
        <b>Hi {props.payload.user.email}</b>
      ) : (
        <>
          <div style={styles.svgContainer}>
            <Row
              justify="space-around"
              align="middle"
              style={styles.rowSearchByCity}
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
            style={styles.rowSecondSection}
          >
            <Col xs={24} lg={12}>
              <ResponsiveImageSize default minWidth={0} path={whyAdopting} />
              <Title level={4}>Why adopting?</Title>
              <Text style={styles.text}>
                Adopting not only saves you money. Adopting provides an animal
                with a second chance to experience love and in many cases, it
                can be a life saviour. Adopting also improves other animals
                lives as it reduces breeding factories from people exploiting
                animals for money.
              </Text>
            </Col>

            <Col xs={24} lg={8}>
              <ResponsiveImageSize minWidth={100} path={didYouKnow} />
              <Title level={4}>Did you know?</Title>
              <Text style={styles.text}>
                Almost 6.5 million animals enter shelters worldwide and 1.5 of
                which are euthanized. adopting allows these animals to
                experience life again.
              </Text>
            </Col>
          </Row>

          {/* STATS */}
          <Row justify="space-around" align="middle" style={styles.rowStats}>
            <Col style={styles.rowStats} xs={24} lg={6}>
              <ResponsiveImageSize default minWidth={0} path={adoptedPets} />
              <Title level={2}>
                Since we launched, we have helped rehome over 13,531 pets into
                happy homes.
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
          <Row justify="space-around" align="middle" style={styles.rowFundUs}>
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
    </Layout>
  );
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
  rowSearchByCity: {
    height: "100vh",
    textAlign: "center",
    overflow: "hidden",
  },
  rowSecondSection: {
    paddingTop: "50px",
    paddingBottom: "150px",
    background: "white",
  },
  rowFundUs: { paddingTop: "50px", paddingBottom: "50px", background: "white" },
  rowStats: { paddingTop: "50px" },
  text: { fontSize: "16px" },
};

export default Home;
