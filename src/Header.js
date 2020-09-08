import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 10px;
  }
  color: ${(props) => (props.current === "true" ? "peru" : "#333")};
`;

function Header() {
  const pathname = location.pathname;
  return (
    <div>
      <SLink to="/" current={pathname === "/" ? "true" : "false"}>
        Home
      </SLink>
      <SLink to="/one" current={pathname === "/one" ? "true" : "false"}>
        one
      </SLink>
      <SLink to="/two" current={pathname === "/two" ? "true" : "false"}>
        two
      </SLink>
    </div>
  );
}

export default Header;
