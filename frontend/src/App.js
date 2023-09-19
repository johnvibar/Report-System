import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import OrderDetailScreen from "./components/pages/OrderDetail";
import { AuthToken } from "./auth/AuthToken";
import { Redirect } from 'react-router-dom';
import "./App.css";

export default function App() {
  const [token] = useState(AuthToken.get());
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Redirect to="/login" />
        )
          }}
        />
        <Route path="/login" component={Login} token={token} render={(props) => {
          return <component {...props} />
        }} />
        <Route exact path="/home" component={Home} token={token} render={(props) => {
          if (!props.token) return <Redirect to="/login" />
          return <component {...props} />
        }} />
        <Route path="/detail/:id" component={OrderDetailScreen} token={token} render={(props) => {
          if (!props.token) return <Redirect to="/login" />
          return <component {...props} />
        }} />
      </Switch>
    </Router>
  );
}
