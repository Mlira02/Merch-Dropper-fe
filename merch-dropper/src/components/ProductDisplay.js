import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import ProductCard from "./ProductCard";
import { connect } from "react-redux";
import { addToCart } from "../store/actions";
import { Container, Row, Col } from "reactstrap";
import "../App.css";

const ProductDisplay = ({ products, addToCart, match, location }) => {
  // console.log('productdisplay/products', products)
  const [shirts, setShirts] = useState([]);
  console.log({ match, location });

  // filters products by user associated store
  useEffect(() => {
    async function getProducts() {
      let storeID = "";
      //need to chage GET request to 'stores/domain/${match.params.domain_name}' once backend code is pushed
      const res = await axios.get(
        `https://merchdropper-production.herokuapp.com/api/stores/domain/${match.params.domain_name}`
      );
      storeID = res.data.id;
      console.log(res.data.id);
      const res2 = await axios.get(
        "https://merchdropper-production.herokuapp.com/api/products"
      );
      const shirtsToDisplay = storeID
        ? res2.data.filter(product => product.storeID === parseInt(storeID))
        : res2.data;
      setShirts(shirtsToDisplay);
    }
    getProducts();
  }, [match.params, match.params.store_name]);

  // useEffect(() => {
  //   axios
  //     .get("https://merchdropper-production.herokuapp.com/api/products")
  //     .then(res => {
  //       // console.log('res', res.data)
  //       const shirtsToDisplay = match.params.storeID
  //         ? res.data.filter(
  //             product => product.storeID === parseInt(match.params.storeID)
  //           )
  //         : res.data;
  //
  //       setShirts(shirtsToDisplay);
  //     });
  // }, [match.params, match.params.storeID]);

  // useEffect(() => {
  //   axios
  //     .get("https://merchdropper-production.herokuapp.com/api/products")
  //     .then(res => {
  //       // console.log('res', res.data)
  //       axios
  //         .get(
  //           `https://merchdropper-production.herokuapp.com/api/stores/${match.params.storeID}`
  //         )
  //         .then(response => {
  //           console.log(response.data.store_name);
  //         });
  //       const shirtsToDisplay = match.params.storeID
  //         ? res.data.filter(
  //             product => product.storeID === parseInt(match.params.storeID)
  //           )
  //         : res.data;
  //
  //       setShirts(shirtsToDisplay);
  //     });
  // }, [match.params, match.params.storeID]);

  return (
    <Container fluid="true" className="container-margin">
      {/*<NavBar />*/}
      <Row>
        <Col sm="7" className="flex ">
          {shirts.map((product, id) => (
            <ProductCard
              url={product.thumbnailURL}
              name={product.productName}
              design={product.design}
              price={product.price}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = state => {
  // console.log("state in products", state);
  return {
    cart: state.CartReducer.cart,
    products: state.ProductReducer.products
  };
};

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductDisplay);
