import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "./DashboardProducts.css";
/*import Pagination from "./Pagination";*/

function DashboardProducts() {
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);
    // removing the product
    const [deleteProduct, { isLoading }] = useDeleteProductMutation();
    function handleDeleteProduct(id) {
        // logic here
        if (window.confirm("Are you sure?")) deleteProduct({ product_id: id, user_id: user._id });
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Product Image</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
               {products.map((product) => (
                <tr key={product._id}>
                    <td>
                        <img src={product.pictures[0].url} className="dashboard-product-preview" alt="Product Preview" />
                    </td>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                        <Button onClick={() => handleDeleteProduct(product._id)} disabled={isLoading}>Delete</Button>
                        <Link to={`/product/${product._id}/edit`} className="btn btn-warning">Edit</Link>
                    </td>
                </tr>
               ))}
            </tbody>
        </Table>
    );
}

export default DashboardProducts;
