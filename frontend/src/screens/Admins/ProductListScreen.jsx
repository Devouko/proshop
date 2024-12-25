import React from 'react';
import { useGetProductsQuery, useCreateProductMutation,useDeleteProductMutation } from '../../slices/productApiSlice.js';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate.jsx';

const ProductListScreen = () => {
  const {pageNumber}=useParams()
  console.log(pageNumber)
  const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct,{isLoading:loadingDelete}]=useDeleteProductMutation()

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct().unwrap();
        toast.success('Product created successfully');
        refetch(); // Trigger a re-fetch of products
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  const deleteHandler = async (id) => {

    // Implement deletion logic here
      if(window.confirm('Are you sure ?')){
        try{
        await deleteProduct(id)
        toast.success('product deleted')
        refetch()
      }catch(err){
        toast.error(err?.data?.message || err.error)

      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler} disabled={loadingCreate}>
            {loadingCreate ? 'Creating...' : <><FaEdit /> Create Product</>}
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || 'Something went wrong'}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
