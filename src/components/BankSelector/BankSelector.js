import React, { useState } from "react";
import "./BankSelector.css";
import { useNavigate } from "react-router-dom";

const BankSelector = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleBankSelection = (bank) => {
    setSelectedBank(bank);
  };

  const handleSubmit = async () => {
    if (!selectedBank) {
      setResponseMessage("Please select a bank before submitting.");
      return;
    } else {
        console.log(selectedBank)
      navigate('/accounts', {state: {'bank_name': selectedBank}})
    }
  };

  return (
    <div className="container">
      <h2>Select Your Bank</h2>
      <div className="button-container">
        <button
          className={selectedBank === "NatWest" ? "button selected" : "button"}
          onClick={() => handleBankSelection("NatWest")}
        >
          NatWest
        </button>
        <button
          className={selectedBank === "RBS" ? "button selected" : "button"}
          onClick={() => handleBankSelection("RBS")}
        >
          RBS
        </button>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      {responseMessage && <p className="response">{responseMessage}</p>}
    </div>
  );
};

export default BankSelector;
