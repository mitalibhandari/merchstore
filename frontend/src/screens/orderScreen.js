import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET} from '../constants/orderConstants'

function OrderScreen() {
    const match = useParams();
    const orderId = match.id;

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false)

    if (!loading && !error) {
        order.itemsPrice = order.orderItems
            .reduce((acc, item) => acc + item.price * item.qty, 0)
            .toFixed(2);
    }

    //    client ID:  AYhaBAKuaWKQdU2FNuWutoq6do0LAc93gSkZk1Hg4S9EDvoo6jzuhtXpeNZ-O5s47GzgRcLopHQUFVKZ

    const addPayPalScript = () => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
            "https://www.paypal.com/sdk/js?client-id=AYhaBAKuaWKQdU2FNuWutoq6do0LAc93gSkZk1Hg4S9EDvoo6jzuhtXpeNZ-O5s47GzgRcLopHQUFVKZ";
        script.async = true;
        
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!order || successPay || order._id !== Number(orderId)) {
            dispatch({type:ORDER_PAY_RESET}) 
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                sdkReady(true);
            }
        }
    }, [dispatch, order, orderId, successPay]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>>
                            </p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address},{order.shippingAddress.city}
                                {"   "}
                                {order.shippingAddress.postalCode},{"   "}
                                {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                <Message variant="success">
                                    Your order has been delivered on{" "}
                                    {moment(order.deliveredAt).format("MMMM Do, YYYY")}
                                </Message>
                            ) : (
                                <Message variant="warning">Not Delivered</Message>
                            )}
                        </ListGroup.Item>
                        <hr />

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">
                                    Your order has been paid on{" "}
                                    {moment(order.paidAt).format("MMMM Do, YYYY")}
                                </Message>
                            ) : (
                                <Message variant="warning">Not Paid</Message>
                            )}
                        </ListGroup.Item>
                        <hr />

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant="info">Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    ></Image>
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = $
                                                    {(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                            <PayPalButton
                                                
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />
                                        )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default OrderScreen;
