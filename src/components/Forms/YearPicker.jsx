import React, { useState } from "react";

const YearPicker = ({ onChange, selectedAnnual }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const years = [];
  const currentYear = new Date().getFullYear();

  for (let i = currentYear - 5; i <= currentYear; i++) {
    years.push(i);
  }

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setSelectedYear(selectedYear);
    onChange(selectedYear);
  };

  // console.log('year', periodCovered)

  return (
    <div className="flex">
      <select
        className="block w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
        defaultValue={selectedAnnual}
        onChange={handleYearChange}
      >
        <option value="" disabled>
          Year
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearPicker;
