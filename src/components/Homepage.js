import React from "react";
import Header from "./Header";
import { history } from '../routers/AppRouter'

export default () => (
  <div className="homepage-root">
    <Header />
    <h1>Tab Writing Platform</h1>
    <div onClick={() => history.push('/tabwriter')} className="homepage-button">
      <span>Let's Go</span>
    </div>
  </div>
)