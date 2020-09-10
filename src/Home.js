import React from "react";
import { useLocation } from "react-router-dom";
import ReactIcon from "./assets/React.png";

function Home() {
  const { pathname } = useLocation();
  return (
    <div>
      <p>{pathname}</p>
      <img src={ReactIcon} />
    </div>
  );
}

export default Home;
