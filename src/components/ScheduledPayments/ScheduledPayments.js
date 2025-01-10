import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ScheduledPayments.css';
import { useLocation } from 'react-router-dom';

export default function ScheduledPayments() {
  const [scheduledPayments, setScheduledPayments] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bankName = queryParams.get("bank");

  // Function to fetch scheduled payments
  const fetchScheduledPayments = (bank) => {
    const accountId = localStorage.getItem('accountId');
    const access_token = localStorage.getItem('access_token');

    axios
      .get(`http://127.0.0.1:8000/accounts/${accountId}/scheduled-payments`, {
        params: { access_token, bank },
      })
      .then((response) => {
        setScheduledPayments(response.data?.Data?.ScheduledPayment || []);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch scheduled payments.');
      });
  };

  // Fetch scheduled payments on component mount
  useEffect(() => {
    fetchScheduledPayments(bankName);
  }, [bankName]);

  return (
    <div className="scheduled-payments-container">
      <h1 className="heading-main">Scheduled Payments</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : scheduledPayments.length > 0 ? (
        <div className="scheduled-payments-list">
          {scheduledPayments.map((payment, index) => (
            <div className="scheduled-payment-card" key={index}>
              <h3>Scheduled Payment {index + 1}</h3>
              <p>
                <strong>Account ID:</strong> {payment.AccountId}
              </p>
              <p>
                <strong>Scheduled Payment ID:</strong> {payment.ScheduledPaymentId}
              </p>
              <p>
                <strong>Instructed Amount:</strong> {payment.InstructedAmount?.Amount}{' '}
                {payment.InstructedAmount?.Currency}
              </p>
              <p>
                <strong>Creditor Account:</strong> {payment.CreditorAccount?.Name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No scheduled payments available.</p>
      )}
    </div>
  );
}
