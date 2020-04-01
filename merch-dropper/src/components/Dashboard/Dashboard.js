import React from "react";
import SideBar from "./SideBar";
import Chart from "./Chart";
import { StyledDiv, BigContainer } from "./Styled";

// let key = localStorage.getItem("profile");
// let profileObj = JSON.parse(key);
// let nickname = profileObj.nickname;

const Dashboard = props => {
  return (
    <BigContainer className="dashboard-container">
      <div className="user-info">
        <h2 align="right"> Welcome, ! </h2>
      </div>
      <StyledDiv className="dashboard-components">
        <SideBar />
        <Chart />
      </StyledDiv>
    </BigContainer>
  );
};

export default Dashboard;
