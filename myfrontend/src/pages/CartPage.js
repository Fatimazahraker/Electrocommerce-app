import React from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
//import CheckoutForm from "../components/CheckoutForm";
//import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
//import "./CartPage.css";

//const stripePromise = loadStripe("your_stripe_publishable_key");

function CartPage() {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    //const [increaseCart] = useIncreaseCartProductMutation();
    //const [decreaseCart] = useDecreaseCartProductMutation();
    //const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

    //function handleDecrease(product) {
       // const quantity = user.cart.count;
        //if (quantity <= 0) return alert("Can't proceed");
        //decreaseCart(product);
    //}

    return (
        <Container style={{ minHeight: "95vh" }} className="cart-container">
            <Row>
                <Col>
                <h1 className="pt-2 h3">Shopping cart</h1>
                    {cart.length === 0 && <Alert variant="info">Shopping cart is empty. Add products to your cart</Alert>}

                </Col>
                
            </Row>
        </Container>
    );
}

export default CartPage;