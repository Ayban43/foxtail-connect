import React, { useState } from 'react';
import Frequency from './Frequency';
import YearPicker from './YearPicker';
// import YearPicker from './YearPicker';
// import MonthYearPicker from './MonthYearPicker';
// import QuarterPicker from './QuarterPicker';

const PeriodCovered = () => {
  const [selectedFrequency, setSelectedFrequency] = useState('');

  const handleFrequencyChange = (event) => {
    setSelectedFrequency(event.target.value);
  };

  const renderPicker = () => {
    switch (selectedFrequency) {
      case 'annually':
        return <YearPicker />;
      case 'monthly':
        return "month";
      case 'quarterly':
        return "quarter";
      default:
        return null;
    }
  };

  return (
    <div>
      <Frequency onChange={handleFrequencyChange} />
      {renderPicker()}
    </div>
  );
};

export default PeriodCovered;
