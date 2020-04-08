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
  // async function createStore() {
  //   const res = await axios.get(
  //     "https://merchdropper-production.herokuapp.com/api/users/"
  //   );
  //   const user = res.data.find(user => user.email === profile.email);
  //   console.log(user.id);
  //   const postRes = await axios.post(
  //     `https://merchdropper-production.herokuapp.com/api/stores`,
  //     {
  //       store_name: storeName,
  //       userID: user.id
  //     }
  //   );
  //   // returns a promise
  //   // need this to .then later on
  //   return postRes;
  // }
  //
  // function callSignUp(e) {
  //   e.preventDefault();
  //   setIsSubmit(true);
  //   createStore()
  //     .then(() => {
  //       setIsSubmit(false);
  //     })
  //     .catch(/* handle errors */);
  // }
  const [storeName, setStoreName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const profile = JSON.parse(localStorage.getItem("profile"));
  console.log(profile.email);

  const handleChange = e => {
    setStoreName(e.target.value);
  };

  // need to reconfigure backend and folowing code should work
  const callSignUp = e => {
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(`http://localhost:5032/api/stores`, {
        store_name: storeName,
        email: profile.email
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
