import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Transactions.css';
import { useLocation } from 'react-router-dom';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bankName = queryParams.get("bank");

  // Function to fetch transactions
  const getTransactions = (bank) => {
    const accountId = localStorage.getItem('accountId');
    const access_token = localStorage.getItem('access_token');

    axios
      .get(`http://127.0.0.1:8000/accounts/${accountId}/transactions`, {
        params: { access_token, bank },
      })
      .then((response) => {
        // Extract transaction data
        const transactionData = response.data?.Data?.Transaction || [];
        setTransactions(transactionData);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch transaction data.');
      });
  };

  // Fetch data on component mount
  useEffect(() => {
    getTransactions(bankName);
  }, [bankName]);

  return (
    <div className="transactions-container">
      <h1 className="heading-main">Transaction History</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : transactions.length > 0 ? (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Transaction Info</th>
              <th>Balance (Type)</th>
              <th>Balance (Amount)</th>
              <th>Balance (Currency)</th>
              <th>Proprietary Code</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.TransactionId}</td>
                <td>{transaction.CreditDebitIndicator}</td>
                <td>{transaction.Status}</td>
                <td>
                  {new Date(transaction.BookingDateTime).toLocaleString()}
                </td>
                <td>{transaction.Amount?.Amount}</td>
                <td>{transaction.Amount?.Currency}</td>
                <td>
                  {transaction.TransactionInformation || 'No Information'}
                </td>
                <td>{transaction.Balance?.Type}</td>
                <td>{transaction.Balance?.Amount?.Amount}</td>
                <td>{transaction.Balance?.Amount?.Currency}</td>
                <td>
                  {transaction.ProprietaryBankTransactionCode?.Code || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading transactions...</p>
      )}
    </div>
  );
}
