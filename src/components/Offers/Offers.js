import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Offers.css';
import { useLocation } from 'react-router-dom';

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bankName = queryParams.get("bank");

  // Function to fetch offers
  const fetchOffers = (bank) => {
    const accountId = localStorage.getItem('accountId');
    const access_token = localStorage.getItem('access_token');

    axios
      .get(`http://127.0.0.1:8000/accounts/${accountId}/offers`, {
        params: { access_token, bank },
      })
      .then((response) => {
        try {
          const data = JSON.parse(response.data?.detail);
          if (data.status === 403) {
            setError(data.message);
          } else {
            setOffers(response.data?.Data?.Offer || []);
          }
        } catch (e) {
          setError('Failed to parse server response.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch offers.');
      });
  };

  // Fetch offers on component mount
  useEffect(() => {
    fetchOffers(bankName);
  }, [bankName]);

  return (
    <div className="offers-container">
      <h1 className="heading-main">Offers</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : offers.length > 0 ? (
        <div className="offers-list">
          {offers.map((offer, index) => (
            <div className="offer-card" key={index}>
              <h3>Offer {index + 1}</h3>
              <p>
                <strong>Offer ID:</strong> {offer.OfferId}
              </p>
              <p>
                <strong>Description:</strong> {offer.Description}
              </p>
              <p>
                <strong>Validity:</strong> {offer.Validity}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No offers available.</p>
      )}
    </div>
  );
}
