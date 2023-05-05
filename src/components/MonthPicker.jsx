import React, { useState, useEffect } from 'react';

const MonthPicker = ({ onChange }) => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'month') {
      setSelectedMonth(value);
    } else if (name === 'year') {
      setSelectedYear(parseInt(value));
    }
  };

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      onChange(selectedMonth, selectedYear);
    }
  }, [selectedMonth, selectedYear]);

  const years = Array.from({length: 6}, (_, i) => today.getFullYear() - i);

  const months = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' },
  ];

  return (
    <div className="flex gap-4 text-center w-full justify-start">
      <div className="flex w-full">
        <select
          className="block w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          name="month"
          value={selectedMonth}
          onChange={handleChange}
        >
          <option value="" disabled >Month</option>
          {months.map((month) => (
            <option key={month.id} value={month.name}>
              {month.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full">
        <select
          className="block w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          name="year"
          value={selectedYear}
          onChange={handleChange}
        >
          <option value="" disabled>Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MonthPicker;
