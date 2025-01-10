import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Balances.css';
import { useLocation } from 'react-router-dom';

export default function Balances() {
  const [balances, setBalances] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bankName = queryParams.get("bank");

  const fetchBalances = (bank) => {
    const accountId = localStorage.getItem('accountId');
    const access_token = localStorage.getItem('access_token');

    axios
      .get(`http://127.0.0.1:8000/accounts/${accountId}/balances`, {
        params: { access_token, bank },
      })
      .then((response) => {
        setBalances(response.data?.Data?.Balance || []);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch balance details.');
      });
  };

  useEffect(() => {
    fetchBalances(bankName);
  }, [bankName]);

  return (
    <div className="balances-container">
      <h1 className="heading-main">Account Balances</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : balances.length > 0 ? (
        <div className="balances-list">
          {balances.map((balance, index) => (
            <div className="balance-card" key={index}>
              <h3>Balance {index + 1}</h3>
              <p>
                <strong>Account ID:</strong> {balance.AccountId}
              </p>
              <p>
                <strong>Credit/Debit Indicator:</strong> {balance.CreditDebitIndicator}
              </p>
              <p>
                <strong>Balance Type:</strong> {balance.Type}
              </p>
              <p>
                <strong>Date and Time:</strong> {new Date(balance.DateTime).toLocaleString()}
              </p>
              <div className="amount-details">
                <h4>Amount</h4>
                <p>
                  <strong>Amount:</strong> {balance.Amount.Amount} {balance.Amount.Currency}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No balance data available.</p>
      )}
    </div>
  );
}
