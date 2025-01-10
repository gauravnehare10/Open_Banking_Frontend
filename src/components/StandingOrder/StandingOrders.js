import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StandingOrders.css';
import { useLocation } from 'react-router-dom';

export default function StandingOrders() {
  const [standingOrders, setStandingOrders] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bankName = queryParams.get("bank");

  // Function to fetch standing orders
  const fetchStandingOrders = (bank) => {
    const accountId = localStorage.getItem('accountId');
    const access_token = localStorage.getItem('access_token');

    axios
      .get(`http://127.0.0.1:8000/accounts/${accountId}/standing-orders`, {
        params: { access_token, bank },
      })
      .then((response) => {
        setStandingOrders(response.data?.Data?.StandingOrder || []);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch standing orders.');
      });
  };

  // Fetch standing orders on component mount
  useEffect(() => {
    fetchStandingOrders(bankName);
  }, [bankName]);

  return (
    <div className="standing-order-container">
      <h1 className="heading-main">Standing Orders</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : standingOrders.length > 0 ? (
        <div className="standing-orders-list">
          {standingOrders.map((order, index) => (
            <div className="standing-order-card" key={index}>
              <h3>Standing Order {index + 1}</h3>
              <p>
                <strong>Frequency:</strong> {order.Frequency}
              </p>
              {order.Reference && (
                <p>
                  <strong>Reference:</strong> {order.Reference}
                </p>
              )}
              {order.FirstPaymentDateTime && (
                <p>
                  <strong>First Payment Date:</strong>{' '}
                  {new Date(order.FirstPaymentDateTime).toLocaleString()}
                </p>
              )}
              {order.NextPaymentDateTime && (
                <p>
                  <strong>Next Payment Date:</strong>{' '}
                  {new Date(order.NextPaymentDateTime).toLocaleString()}
                </p>
              )}
              {order.FinalPaymentDateTime && (
                <p>
                  <strong>Final Payment Date:</strong>{' '}
                  {new Date(order.FinalPaymentDateTime).toLocaleString()}
                </p>
              )}
              {order.StandingOrderStatusCode && (
                <p>
                  <strong>Status:</strong> {order.StandingOrderStatusCode}
                </p>
              )}
              <div className="payment-amounts">
                {order.FirstPaymentAmount && (
                  <p>
                    <strong>First Payment Amount:</strong>{' '}
                    {order.FirstPaymentAmount.Amount}{' '}
                    {order.FirstPaymentAmount.Currency}
                  </p>
                )}
                {order.NextPaymentAmount && (
                  <p>
                    <strong>Next Payment Amount:</strong>{' '}
                    {order.NextPaymentAmount.Amount}{' '}
                    {order.NextPaymentAmount.Currency}
                  </p>
                )}
                {order.FinalPaymentAmount && (
                  <p>
                    <strong>Final Payment Amount:</strong>{' '}
                    {order.FinalPaymentAmount.Amount}{' '}
                    {order.FinalPaymentAmount.Currency}
                  </p>
                )}
              </div>
              <div className="creditor-account">
                <h4>Creditor Account:</h4>
                <p>
                  <strong>Scheme Name:</strong> {order.CreditorAccount.SchemeName}
                </p>
                <p>
                  <strong>Identification:</strong>{' '}
                  {order.CreditorAccount.Identification}
                </p>
                {order.CreditorAccount.Name && (
                  <p>
                    <strong>Name:</strong> {order.CreditorAccount.Name}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No standing orders available.</p>
      )}
    </div>
  );
}
