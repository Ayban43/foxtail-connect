import React, { useState, useEffect } from 'react';

const QuarterPicker = ({ onChange, selectedQ, selectedQy }) => {
  const today = new Date();
  const [selectedQuarter, setSelectedQuarter] = useState(selectedQ || '');
  const [selectedYear, setSelectedYear] = useState(selectedQy || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quarter') {
      setSelectedQuarter(value);
    } else if (name === 'year') {
      setSelectedYear(parseInt(value));
    }
  };

  //   console.log("picker",selectedQuarter,selectedYear)


  useEffect(() => {
    if (selectedQuarter) {
      onChange(selectedQuarter, selectedYear);
    }
  }, [selectedQuarter]);

  useEffect(() => {
    if (selectedYear) {
      onChange(selectedQuarter, selectedYear);
    }
  }, [selectedYear]);

  const quarters = [
    { id: 1, name: 'Q1 - Jan to Mar' },
    { id: 2, name: 'Q2 - Apr to Jun' },
    { id: 3, name: 'Q3 - Jul to Sep' },
    { id: 4, name: 'Q4 - Oct to Dec' },
  ];

  const years = Array.from({ length: 6 }, (_, i) => today.getFullYear() - i);

  return (
    <div className="flex gap-4 text-center w-full justify-start">
      <div className="w-full">
        <select
          className="block w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          name="quarter"
          defaultValue={selectedQ}
          onChange={handleChange}
        >
          <option value="">Quarter</option>
          {quarters.map((quarter) => (
            <option key={quarter.id} value={quarter.name}>
              {quarter.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <select
          className="block w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          name="year"
          defaultValue={selectedQy}
          onChange={handleChange}
        >
          <option value="">Year</option>
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

export default QuarterPicker;
