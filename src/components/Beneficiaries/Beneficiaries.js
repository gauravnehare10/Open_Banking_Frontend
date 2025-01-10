import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Beneficiaries.css';
import { useLocation } from 'react-router-dom';

export default function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bankName = queryParams.get("bank");

  const fetchBeneficiaries = (bank) => {
    const accountId = localStorage.getItem('accountId');
    const access_token = localStorage.getItem('access_token');

    axios
      .get(`http://127.0.0.1:8000/accounts/${accountId}/beneficiaries`, {
        params: { access_token, bank },
      })
      .then((response) => {
        console.log(response.data)
        setBeneficiaries(response.data?.Data?.Beneficiary || []);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch beneficiaries.');
      });
  };

  useEffect(() => {
    fetchBeneficiaries(bankName);
  }, [bankName]);

  return (
    <div className="beneficiaries-container">
      <h1 className="heading-main">Beneficiaries</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : beneficiaries.length > 0 ? (
        <div className="beneficiaries-list">
          {beneficiaries.map((beneficiary, index) => (
            <div className="beneficiary-card" key={index}>
              <h3>Beneficiary {index + 1}</h3>
              <p>
                <strong>Account ID:</strong> {beneficiary.AccountId}
              </p>
              <p>
                <strong>Beneficiary ID:</strong> {beneficiary.BeneficiaryId}
              </p>
              <p>
                <strong>Beneficiary Type:</strong> {beneficiary.BeneficiaryType}
              </p>
              {beneficiary.CreditorAgent && (
                <div>
                  <h4>Creditor Agent</h4>
                  <p>
                    <strong>Scheme Name:</strong>{' '}
                    {beneficiary.CreditorAgent.SchemeName}
                  </p>
                  <p>
                    <strong>Identification:</strong>{' '}
                    {beneficiary.CreditorAgent.Identification}
                  </p>
                  <p>
                    <strong>Name:</strong> {beneficiary.CreditorAgent.Name}
                  </p>
                </div>
              )}
              <h4>Creditor Account</h4>
              <p>
                <strong>Scheme Name:</strong>{' '}
                {beneficiary.CreditorAccount.SchemeName}
              </p>
              <p>
                <strong>Identification:</strong>{' '}
                {beneficiary.CreditorAccount.Identification}
              </p>
              {beneficiary.CreditorAccount.Name && (
                <p>
                  <strong>Name:</strong> {beneficiary.CreditorAccount.Name}
                </p>
              )}
              {beneficiary.Reference && (
                <p>
                  <strong>Reference:</strong> {beneficiary.Reference}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No beneficiaries found.</p>
      )}
    </div>
  );
}
