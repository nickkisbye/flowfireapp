import React from "react";
import { IUserData } from "../providers/AuthProvider";

function Home(props: IUserData) {
  return (
    <React.Fragment>
      <h4>Welcome, {props.username}</h4>
    </React.Fragment>
  );
}

export default Home;
