import React from 'react';
import { useGetProductsQuery } from '../slices/productApiSlice.js';
import Products from '../components/Products.jsx';
import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { useParams, Link } from 'react-router-dom';
import Paginate from '../components/Paginate.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';

function Homescreen() {
  const { keyword = '' } = useParams();
  const { pageNumber = 1 } = useParams();

  // Fetch products query
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {/* Show ProductCarousel only if there's no search keyword */}
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}

      {/* Display Loader during loading */}
      {isLoading ? (
        ''
      ) : error ? (
        // Display error message
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {/* Check if products exist */}
            {data?.products?.length > 0 ? (
              data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Products product={product} />
                </Col>
              ))
            ) : (
              <Message variant="info">No products available</Message>
            )}
          </Row>

          {/* Paginate component */}
          {data?.pages > 1 && (
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword || ''}
            />
          )}
        </>
      )}
    </>
  );
}

export default Homescreen;
