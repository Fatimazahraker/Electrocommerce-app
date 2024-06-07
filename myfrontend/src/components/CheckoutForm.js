import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [paying, setPaying] = useState(false);

    async function handlePay(e) {
        e.preventDefault();
        if (!stripe || !elements || user.cart.count <= 0) return;
        setPaying(true);

        try {
            const response = await fetch("http://localhost:5000/create-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer ",
                },
                body: JSON.stringify({ amount: user.cart.total }),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment intent');
            }

            const { client_secret } = await response.json();
            if (!client_secret) {
                throw new Error('Failed to retrieve client secret');
            }

            const { paymentIntent, error } = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                throw new Error(error.message);
            }

            if (paymentIntent && paymentIntent.status === "succeeded") {
                const orderResponse = await createOrder({ userId: user._id, cart: user.cart, address, country }).unwrap();
                console.log(orderResponse);
                if (orderResponse) {
                    setAlertMessage(`Payment ${paymentIntent.status}`);
                    setTimeout(() => {
                        navigate("/orders");
                        console.log("i am here");
                    }, 3000);
                } else {
                    setAlertMessage("Order creation failed. Please try again.");
                }
            } else {
                setAlertMessage("Payment failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setAlertMessage(`An error occurred: ${error.message}`);
        } finally {
            setPaying(false);
        }
    }

    return (
        <Col className="cart-payment-container">
            <Form onSubmit={handlePay}>
                <Row>
                    {alertMessage && <Alert>{alertMessage}</Alert>}
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" value={user.name} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" value={user.email} disabled />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={7}>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>
                <label htmlFor="card-element">Card</label>
                <CardElement id="card-element" />
                <Button className="mt-3" type="submit" disabled={user.cart.count <= 0 || paying || isSuccess}>
                    {paying ? "Processing..." : "Pay"}
                </Button>
            </Form>
        </Col>
    );
}

export default CheckoutForm;