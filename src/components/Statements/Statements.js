import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Statements.css';
import { useLocation } from 'react-router-dom';

export default function Statements() {
  const [statements, setStatements] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bankName = queryParams.get("bank");

  // Function to fetch statements
  const fetchStatements = (bank) => {
    const accountId = localStorage.getItem('accountId');
    const access_token = localStorage.getItem('access_token');

    axios
      .get(`http://127.0.0.1:8000/accounts/${accountId}/statements`, {
        params: { access_token, bank },
      })
      .then((response) => {
        try {
          const data = JSON.parse(response.data?.detail);
          if (data.status === 403) {
            setError(data.message);
          } else {
            setStatements(response.data?.Data?.Statement || []);
          }
        } catch (e) {
          setError('Failed to parse server response.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch statements.');
      });
  };

  // Fetch statements on component mount
  useEffect(() => {
    fetchStatements(bankName);
  }, [bankName]);

  return (
    <div className="statements-container">
      <h1 className="heading-main">Statements</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : statements.length > 0 ? (
        <div className="statements-list">
          {statements.map((statement, index) => (
            <div className="statement-card" key={index}>
              <h3>Statement {index + 1}</h3>
              <p>
                <strong>Account ID:</strong> {statement.AccountId}
              </p>
              <p>
                <strong>Statement ID:</strong> {statement.StatementId}
              </p>
              <p>
                <strong>Start Date:</strong> {statement.StartDateTime}
              </p>
              <p>
                <strong>End Date:</strong> {statement.EndDateTime}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No statements available.</p>
      )}
    </div>
  );
}
