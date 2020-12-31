import React from "react";
import { IUserData } from "../providers/AuthProvider";
import Chats from "../components/Chats";

function Home(props: IUserData) {
  return (
    <React.Fragment>
      <Chats {...props}/>
    </React.Fragment>
  );
}

export default Home;
