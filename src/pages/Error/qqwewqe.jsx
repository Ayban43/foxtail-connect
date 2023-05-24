import React, { useState } from "react";

const FinancialSummaryForm = () => {
  const [email, setEmail] = useState("");
  const [periodCovered, setPeriodCovered] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code here to submit the form data to your Supabase database
  };

  return (
    <form className="mt-72 ml-72" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="period-covered">Period Covered:</label>
        <input
          type="text"
          id="period-covered"
          value={periodCovered}
          onChange={(event) => setPeriodCovered(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FinancialSummaryForm;
