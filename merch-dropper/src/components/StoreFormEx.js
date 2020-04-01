import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
  StyledHeader,
  SignUpBox,
  StyledForm,
  StyledInput,
  StyledButton
} from "./Auth/Styled.js";

function StoreFormEx({ user }) {
  const [storeName, setStoreName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = e => {
    setStoreName(e.target.value);
  };

  const callSignUp = e => {
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(`https://merchdropper-production.herokuapp.com/api/stores`, {
        store_name: storeName,
        userID: user.id,
        email: user.email
      })
      .then(res => {
        setIsSubmit(false);
      });
  };

  return (
    <SignUpBox>
      <StyledHeader>Create Store</StyledHeader>
      <StyledForm onSubmit={callSignUp}>
        <StyledInput
          name="storeName"
          type="text"
          value={storeName}
          placeholder="Store Name"
          onChange={handleChange}
        />

        <StyledButton>Create Store</StyledButton>
      </StyledForm>
    </SignUpBox>
  );
}

const mapStateToProps = state => {
  return {
    user: state.LoginReducer.user
  };
};

export default connect(mapStateToProps)(StoreFormEx);
