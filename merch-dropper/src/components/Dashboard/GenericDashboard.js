import React from "react";
import GenericSideBar from "./GenericSideBar";
import { StyledDiv, BigContainer } from "./Styled";

// let key = localStorage.getItem("profile");
// let profileObj = JSON.parse(key);
// let nickname = profileObj.nickname;

const GenericDashboard = props => {
  return (
    <BigContainer className="dashboard-container">
      <div className="user-info">
        <h2 align="right"> Welcome,! </h2>
      </div>
      <StyledDiv className="dashboard-components">
        <GenericSideBar />
      </StyledDiv>
    </BigContainer>
  );
};

export default GenericDashboard;
