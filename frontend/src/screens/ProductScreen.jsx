import { useParams } from 'react-router-dom';
import Ratings from '../components/Ratings';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useGetProductDetailsQuery,useCreateReviewMutation } from '../slices/productApiSlice'; 
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useState } from 'react';
import { addToCart } from '../slices/cartSlice';
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Rating from '../components/Ratings'
import Meta from '../components/Meta';

const ProductScreen = () => {
  const dispatch = useDispatch();  
  const navigate = useNavigate();  
  const { id: productId } = useParams();

  const { data: product = {}, isLoading, error,refetch } = useGetProductDetailsQuery(productId);
  const [qty, setQty] = useState(1);
  const [rating,setRating]=useState(0)
  const [comment,setComment]=useState('')
  const {userInfo}=useSelector((state)=>state.auth)

  const [createReview,{isLoading:loadingProductReview}]=useCreateReviewMutation()

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty }));
      navigate('/cart');
    }
  };

  const submitHandler=async(e)=>{
    e.preventDefault()
   
    try {
      await createReview({productId,rating,comment}).unwrap()
      refetch()
      toast.success('Review Submitted')
      setRating(0)
      setComment('')
      
    } catch (err) {
      toast.error(err?.data?.message || err.error)
      
    }
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        product && (
          <>
          <Meta title={product.name}/>
            <Row>
              <Col md={5}>
                <Image src={product.image || ''} alt={product.name || 'Product'} fluid />
              </Col>
              <Col md={4}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name || 'Unnamed Product'}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Ratings value={product.rating || 0} text={`${product.numReviews || 0} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Product Description: {product.description || 'No description available'}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price || 0}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control 
                              as='select' 
                              value={qty} 
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x+1} value={x+1}>{x+1}</option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        className='btn-block'
                        type='button'
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row className='review'>
              <Col md={6}>
              <h1>Reviews</h1>
              {product.reviews.length===0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                    {product.reviews.map(review=>(
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating}/>
                        <p>{review.createdAt.substring}</p>
                          <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}

                    <ListGroup.Item>
                      <h2>Write a customers Reviewa</h2>
                      {loadingProductReview && <Loader/>}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId='rating' className='my-2'>
                        <Form.Label>Rating</Form.Label>
                          <Form.Control as='select'
                          value={rating}
                          onChange={(e)=>setRating(Number(e.target.value))}
                          >
                            <option value="">Select...</option>
                            <option value="1">1-poor</option>
                            <option value="2">2-Fair</option>
                            <option value="3">3-Good</option>
                            <option value="4">4-Very Good</option>
                            <option value="5">5-Excellent</option>
                          </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='comment' className='my-2'>
                          <Form.Control as='textArea'
                          row='3'
                          value={comment}
                          onChange={(e)=>setComment(e.target.value)}
                          ></Form.Control>
                          </Form.Group>
                          <Button  disabled={loadingProductReview} type='submit' variant='primary'>Submit</Button>
                        </Form>
                      ) : (<Message>
                        Please <Link to='/login'>sign in</Link> to write a Review{ ' '}
                      </Message>)}
                    </ListGroup.Item>

              </ListGroup>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default ProductScreen;
