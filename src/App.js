import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import MyProfile from "./components/MyProfile";
import Search from "./components/Search";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import AdoptionDashboard from "./components/AdoptionDashboard";
import CookieConsent from "react-cookie-consent";

import "antd/dist/antd.less"; // or 'antd/dist/antd.less'
import "./App.css";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import { store, rrfProps } from "./createStore";

const App = (props) => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <CookieConsent>By continuing to browse or by clicking 'I understand', you agree to the storing of cookies on your device to enhance your site experience and for analytical purposes.</CookieConsent>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create_post" component={CreatePost} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/dashboard" component={AdoptionDashboard} />
            <Route exact path="/my_profile" component={MyProfile} />
            <Route exact path="/post/:id" component={Post} />
          </Switch>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
