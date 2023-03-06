import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen() {
    const match = useParams();
    const productId = match.id;
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [color, setColor] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {

        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        }else{
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setColor(product.color);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
        
    }, [dispatch, product, productId, successUpdate, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            color,
            countInStock,
            description
        }))
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-type':'multipart/form-data'
                }
            }

            const {data} = await axios.post(
                '/api/products/upload/', 
                formData, 
                config
            )
            
            setImage(data)
            setUploading(false)


        }catch(error){
            setUploading(false)
        }


    }

    return (
        <div>
            <Link to="/admin/productlist">Go Back</Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>

                            <Form.Control 
                                id='image-file'
                                label='Choose File'
                                type='file'
                                custom
                                onChange={uploadFileHandler}
                            >
                            </Form.Control>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId="color">
                            <Form.Label>Color</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countinstock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Stock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );
}

export default ProductEditScreen;
