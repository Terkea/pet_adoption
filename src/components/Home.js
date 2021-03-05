import React from "react";

const Home = (props) => {
  return (
    <div>
      {props.payload ? (
        <b>Hi {props.payload.user.email}</b>
      ) : (
        "Never seen you before"
      )}
    </div>
  );
};

export default Home;
