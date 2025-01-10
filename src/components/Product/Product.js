import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css';
import { useLocation } from 'react-router-dom';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bankName = queryParams.get("bank");

  // Function to fetch products
  const fetchProducts = (bank) => {
    const accountId = localStorage.getItem('accountId');
    const access_token = localStorage.getItem('access_token');

    axios
      .get(`http://127.0.0.1:8000/accounts/${accountId}/product`, {
        params: { access_token, bank },
      })
      .then((response) => {
        setProducts(response.data?.Data?.Product || []);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch products.');
      });
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts(bankName);
  }, [bankName]);

  return (
    <div className="product-container">
      <h1 className="heading-main">Products</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : products.length > 0 ? (
        <div className="products-list">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <h3>Product {index + 1}</h3>
              <p>
                <strong>Product Name:</strong> {product.ProductName}
              </p>
              <p>
                <strong>Product ID:</strong> {product.ProductId}
              </p>
              <p>
                <strong>Account ID:</strong> {product.AccountId}
              </p>
              <p>
                <strong>Product Type:</strong> {product.ProductType}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}
