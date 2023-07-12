import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import BankAccountStatements from './RenderDocument/BankAccountStatements';
import CreditCardStatements from './RenderDocument/CreditCardStatements';
import supabase from '../../config/supabaseClient';
import SummaryOfSales from './RenderDocument/SummaryOfSales';
import ExpenseSummary from './RenderDocument/ExpenseSummary';
import LatestTaxReturn from './RenderDocument/LatestTaxReturn';
import PropertyOrEquipmentTransaction from './RenderDocument/PropertyOrEquipmentTransaction';
import SummaryOfAccountsReceivable from './RenderDocument/SummaryOfAccountsReceivable';
import SummaryOfAccountsPayable from './RenderDocument/SummaryOfAccountsPayable';
import DebtInformation from './RenderDocument/DebtInformation';
import PayrollData from './RenderDocument/PayrollData';
import InventoryReport from './RenderDocument/InventoryReport';

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
  const [selectClicked, setSelectClicked] = useState(false);


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
          return <CreditCardStatements userData={userData} />;
        case 'Summary of Sales and Cash/Check Receipts':
          return <SummaryOfSales userData={userData} />;
        case 'Expense Summary':
          return <ExpenseSummary userData={userData} />;
        case 'Latest Tax Return':
          return <LatestTaxReturn userData={userData} />;
        case 'Documents Related to Property or Equipment Transactions':
          return <PropertyOrEquipmentTransaction userData={userData} />;
        case 'Summary of Accounts Receivable':
          return <SummaryOfAccountsReceivable userData={userData} />;
        case 'Summary of Accounts Payable':
          return <SummaryOfAccountsPayable userData={userData} />;
        case 'Debt Information':
          return <DebtInformation userData={userData} />;
        case 'Payroll Data':
          return <PayrollData userData={userData} />;
        case 'Inventory Report':
          return <InventoryReport userData={userData} />;
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
        const { data, error } = await supabase
          .from('clients')
          .select('bank_account_statement, credit_card_statement , summary_of_sales_and_cash_check_receipt , expense_summary , latest_tax_return , documents_related_to_property_or_equipment_transaction , summary_of_accounts_receivable , summary_of_accounts_payable , debt_information , payroll_data , inventory_report , summary_of_sales_and_cash_check_receipt ')
          .eq('email', userData.email);
        if (error) {
          throw new Error(error.message);
        }

        const colorsMap = new Map();
        data.forEach((client) => {
          colorsMap.set('Bank Account Statements', getColorFromValue(client.bank_account_statement));
          colorsMap.set('Credit Card Statements', getColorFromValue(client.credit_card_statement));
          colorsMap.set('Summary of Sales and Cash/Check Receipts', getColorFromValue(client.summary_of_sales_and_cash_check_receipt));
          // Add other mappings for additional document types based on their respective columns
          colorsMap.set('Expense Summary', getColorFromValue(client.expense_summary));
          colorsMap.set('Latest Tax Return', getColorFromValue(client.latest_tax_return));
          colorsMap.set('Documents Related to Property or Equipment Transactions', getColorFromValue(client.documents_related_to_property_or_equipment_transaction));
          colorsMap.set('Summary of Accounts Receivable', getColorFromValue(client.summary_of_accounts_receivable));
          colorsMap.set('Summary of Accounts Payable', getColorFromValue(client.summary_of_accounts_payable));
          colorsMap.set('Debt Information', getColorFromValue(client.debt_information));
          colorsMap.set('Payroll Data', getColorFromValue(client.payroll_data));
          colorsMap.set('Inventory Report', getColorFromValue(client.inventory_report));
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

    if (selectClicked) {
      fetchDocumentTypeColors();
      setSelectClicked(false); // Reset the selectClicked state
    }
  }, [selectClicked]);

  const handleSelectClick = () => {
    setSelectClicked(true);
  };

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
        onFocus={handleSelectClick}
        className='p-3'
      />
      {renderComponent()}
    </>

  );
};

export default SelectComponent;
