import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import BankAccountStatements from '../../pages/OnBoardingChecklist/RenderDocument/BankAccountStatements';
import CreditCardStatements from '../../pages/OnBoardingChecklist/RenderDocument/CreditCardStatements';
import supabase from '../../config/supabaseClient';

// #FF5630 #FFC400 #36B37E
const documentType = [
  { value: 'Bank Account Statements', label: 'Bank Account Statements' },
  { value: 'Credit Card Statements', label: 'Credit Card Statements' },
  { value: 'Summary of Sales and Cash/Check Receipts', label: 'Summary of Sales and Cash/Check Receipts' },
  { value: 'Expense Summary', label: 'Expense Summary' },
  { value: 'Latest Tax Return', label: 'Latest Tax Return' },
  { value: 'Documents Related to Property or Equipment Transactions', label: 'Documents Related to Property or Equipment Transactions' },
  { value: 'Summary of Accounts Receivable', label: 'Summary of Accounts Receivable' },
  { value: 'Summary of Accounts Payable', label: 'Summary of Accounts Payable' },
  { value: 'Debt Information', label: 'Debt Information' },
  { value: 'Payroll Data', label: 'Payroll Data' },
  { value: 'Inventory Report', label: 'Inventory Report' },
];

const SelectComponent = ({ userData }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState([]);


  const handleChange = (selected) => {
    setSelectedOption(selected);
  };

  const handleInputChange = (inputValue) => {
    const filtered = filteredOptions.filter((documentType) =>
      documentType.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  // Render the component based on the selected option
  const renderComponent = () => {
    if (selectedOption) {
      // Use a switch statement or if/else conditions to determine the component based on the selected value
      switch (selectedOption.value) {
        case 'Bank Account Statements':
          return <BankAccountStatements userData={userData} />;
        case 'Credit Card Statements':
          return <CreditCardStatements />;
        // Add more cases for other options and their corresponding components
        default:
          return null;
      }
    }
    return null;
  };

  useEffect(() => {
    // Fetch dynamic colors for document types from the client table in Supabase
    const fetchDocumentTypeColors = async () => {
      try {
        const { data, error } = await supabase.from('clients').select('bank_account_statement, credit_card_statement,summary_of_sales_and_cash_check_receipts ');
        if (error) {
          throw new Error(error.message);
        }
        const colorsMap = new Map();
        data.forEach((client) => {
          colorsMap.set('Bank Account Statements', getColorFromValue(client.bank_account_statement));
          colorsMap.set('Credit Card Statements', getColorFromValue(client.credit_card_statement));
          colorsMap.set('Summary of Sales and Cash/Check Receipts', getColorFromValue(client.summary_of_sales_and_cash_check_receipts));
          // Add other mappings for additional document types based on their respective columns
        });
        const updatedOptions = documentType.map((option) => ({
          ...option,
          color: colorsMap.get(option.value) || 'black', // Set the color from the client table or fallback to 'black'
        }));
        setFilteredOptions(updatedOptions);
      } catch (error) {
        console.error('Error fetching document type colors:', error);
      }
    };

    fetchDocumentTypeColors();
  }, []);

  // console.log(filteredOptions, "updated options")

  // Get color based on the client status
  const getColorFromValue = (status) => {
    switch (status) {
      case 'Not Applicable':
        return '#FF5630';
      case 'Open':
        return '#FFC400';
      case 'Complete':
        return '#36B37E';
      default:
        return '#000';
    }
  };

  // Custom styles for options
  const optionStyles = {
    option: (provided, state) => ({
      ...provided,
      borderLeft: "10px solid" + state.data.color, // Set font color based on the color property
      paddingLeft: state.data.color === 'black' ? '15px' : '5px', // Add margin only for black options

    }),
  };

  return (
    <>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={filteredOptions}
        isClearable
        onInputChange={handleInputChange}
        placeholder="Search for document type..."
        styles={optionStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
        })}
      />
      {renderComponent()}
    </>

  );
};

export default SelectComponent;
