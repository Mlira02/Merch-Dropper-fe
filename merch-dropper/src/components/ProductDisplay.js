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
  //edit to filter products by user associated store
  useEffect(() => {
    axios
      .get("https://merchdropper-production.herokuapp.com/api/products")
      .then(res => {
        // console.log('res', res.data)
        const shirtsToDisplay = match.params.storeID
          ? res.data.filter(
              product => product.storeID === parseInt(match.params.storeID)
            )
          : res.data;

        setShirts(shirtsToDisplay);
      });
  }, [match.params, match.params.storeID]);

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
