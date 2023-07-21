import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import supabase from '../../config/supabaseClient';
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'



const FileSelector = ({ isAdmin, onSelectOptions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [checklist, setChecklist] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectAllOptionSelected, setSelectAllOptionSelected] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const added = queryParams.get('added');
    const { id } = useParams();

    useEffect(() => {
        const fetchClient = async () => {
            setIsLoading(true);

            const { data: { session } } = await supabase.auth.getSession();

            if (session && isAdmin === true) {
                const { user } = session;
                // setUserSession(user);

                if (user) {
                    const loggedInUserEmail = user.email;

                    const { data: client, error: clientError } = await supabase
                        .from('clients')
                        .select()
                        .eq('id', id)
                        .single();

                    if (clientError) {
                        //setFinancialSummary(null);
                        console.log(clientError);
                        setIsLoading(false);
                        return;
                    }

                    if (client) {
                        const checklistItems = [];

                        if (client.bank_account_statement) {
                            const status = client.bank_account_statement === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ dbName: 'bank_account_statement', label: 'Bank Account Statements', value: status });
                        }

                        if (client.credit_card_statement) {
                            const status = client.credit_card_statement === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ dbName: 'credit_card_statement', label: 'Credit Card Statements', value: status });
                        }

                        if (client.summary_of_sales_and_cash_check_receipt) {
                            const status = client.summary_of_sales_and_cash_check_receipt === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ dbName: 'summary_of_sales_and_cash_check_receipt', label: 'Summary of Sales and Cash/Check Receipts', value: status });
                        }

                        if (client.expense_sumamry) {
                            const status = client.expense_sumamry === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ dbName: 'expense_sumamry', label: 'Expense Sumamry', value: status });
                        }

                        if (client.latest_tax_return) {
                            const status = client.latest_tax_return === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ dbName: 'latest_tax_return', label: 'Latest Tax Return', value: status });
                        }

                        if (client.documents_related_to_property_or_equipment_transaction) {
                            const status = client.documents_related_to_property_or_equipment_transaction === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ dbName: 'documents_related_to_property_or_equipment_transaction', label: 'Documents Related to Property or Equipment Transactions', value: status });
                        }

                        if (client.summary_of_accounts_receivable) {
                            const status = client.summary_of_accounts_receivable === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ dbName: 'summary_of_accounts_receivable', label: 'Summary of Account Receivable', value: status });
                        }

                        if (client.summary_of_accounts_payable) {
                            const status = client.summary_of_accounts_payable === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ dbName: 'summary_of_accounts_payable', label: 'Summary of Account Payable', value: status });
                        }

                        if (client.debt_information) {
                            const status = client.debt_information === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ dbName: 'debt_information', label: 'Debt Information', value: status });
                        }

                        if (client.payroll_data) {
                            const status = client.payroll_data === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ dbName: 'payroll_data', label: 'Payroll Data', value: status });
                        }

                        if (client.inventory_report) {
                            const status = client.inventory_report === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ dbName: 'inventory_report', label: 'Inventory Report', value: status });
                        }

                        setChecklist(checklistItems);
                        setIsLoading(false);
                    }
                }
            }
        };

        fetchClient();
    }, []);

    useEffect(() => {
        onSelectOptions(selectedOptions);
    }, [selectedOptions, onSelectOptions]);

    // An example options array with your checklist data
    const options = Object.keys(checklist)
        .filter(key => ['Open', 'Complete'].includes(checklist[key].value))
        .map(key => {
            return { value: key, dbName: checklist[key].dbName, label: checklist[key].label, status: checklist[key].value };
        });


    // Handle the change event when options are selected
    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    // Custom styles for the Select component
    const customStyles = {
        option: (provided, state) => {
            // Handle border color based on option value
            const borderColor = state.data.value === 'all' ? 'orange' : (state.data.status === 'Complete' ? 'green' : 'yellow');

            return {
                ...provided,
                backgroundColor: state.isSelected ? '#6366F1' : state.isFocused ? '#F9FAFB' : 'white',
                color: state.isSelected ? 'white' : (state.data.value === 'all' ? 'orange' : 'black'),
                borderLeft: `10px solid ${borderColor}`,
            };
        },
        multiValue: (provided, state) => {
            const backgroundColor = state.data.status === 'Complete' ? '#ECF7F2' : '#f4f7cb';
            return {
                ...provided,
                backgroundColor,
            };
        },
        multiValueLabel: (provided, state) => ({
            ...provided,
            color: state.data.status === 'Complete' ? '#36B37E' : '#bbb155'
        }),
        multiValueRemove: (provided, state) => ({
            ...provided,
            color: state.data.status === 'Complete' ? '#36B37E' : '#bbb155',
            ':hover': {
                backgroundColor: state.data.status === 'Complete' ? '#2a8660' : '#8b822d',
                color: '#fff'
            },
        }),
    };


    return (
        <Select
            value={selectedOptions}
            onChange={handleSelectChange}
            options={options}
            isMulti
            styles={customStyles}
        />
    )
}

export default FileSelector