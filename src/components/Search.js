import React, { useState } from "react";
import { Typography, Row, Col, Input, AutoComplete, Layout } from "antd";
import { useLocation } from "react-router-dom";
const { Title, Text } = Typography;

// HOW TO GRAB THE QUERY PARAMS FROM THE URL
// https://stackoverflow.com/questions/52652661/how-to-get-query-string-using-react
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = (props) => {
  // GETTING THE PARAMS
  let query = useQuery();
  const city = query.get("city");
  const petType = query.get("petType");
  const breed = query.get("breed");
  return <div>{city}</div>;
};

export default Search;
