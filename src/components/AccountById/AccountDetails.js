import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AccountDetails.css';
import { Link, useLocation } from 'react-router-dom';

export default function AccountDetails() {
  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const bankName = location.state?.bank_name;

  // Function to fetch account details
  const getAccountDetails = (bank) => {
    const accountId = localStorage.getItem('accountId');
    const access_token = localStorage.getItem('access_token');

    axios
      .get(`http://127.0.0.1:8000/accounts/${accountId}`, {
        params: { access_token, bank },
      })
      .then((response) => {
        const accountData = response.data?.Data?.Account[0] || null;
        setAccountDetails(accountData);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch account details.');
      });
  };

  // Fetch account details on component mount
  useEffect(() => {
    getAccountDetails(bankName);
  }, [bankName]);

  return (
    <div className="account-details-container">
      <h1 className="heading-main">Account Details</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : accountDetails ? (
        <div className="account-details">
          <p><strong>Account ID:</strong> {accountDetails.AccountId}</p>
          <p><strong>Currency:</strong> {accountDetails.Currency}</p>
          <p><strong>Account Type:</strong> {accountDetails.AccountType}</p>
          <p><strong>Account Subtype:</strong> {accountDetails.AccountSubType}</p>
          <p><strong>Description:</strong> {accountDetails.Description}</p>
          <p><strong>Nickname:</strong> {accountDetails.Nickname}</p>
          <div className="account-info">
            <h2>Account Information</h2>
            {accountDetails.Account.map((acc, index) => (
              <div key={index} className="account-info-item">
                <p><strong>Scheme Name:</strong> {acc.SchemeName}</p>
                <p><strong>Identification:</strong> {acc.Identification}</p>
                <p><strong>Name:</strong> {acc.Name}</p>
              </div>
            ))}
          </div>
          <div className="links-container">
            <h2>Quick Links</h2>
            <ul className="links-list">
              <li>
                <Link to={`/transactions?bank=${bankName}`}>View Transactions</Link>
              </li>
              <li>
                <Link to={`/beneficiaries?bank=${bankName}`}>View Beneficiaries</Link>
              </li>
              <li>
                <Link to={`/balances?bank=${bankName}`}>View Balances</Link>
              </li>
              <li>
                <Link to={`/direct_debits?bank=${bankName}`}>View Direct Debits</Link>
              </li>
              <li>
                <Link to={`/standing_orders?bank=${bankName}`}>View Standing Orders</Link>
              </li>
              <li>
                <Link to={`/product?bank=${bankName}`}>View Products</Link>
              </li>
              <li>
                <Link to={`/scheduled_payments?bank=${bankName}`}>View Scheduled Payments</Link>
              </li>
              <li>
                <Link to={`/statements?bank=${bankName}`}>View Statements</Link>
              </li>
              <li>
                <Link to={`/offers?bank=${bankName}`}>View Offers</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading account details...</p>
      )}
    </div>
  );
}