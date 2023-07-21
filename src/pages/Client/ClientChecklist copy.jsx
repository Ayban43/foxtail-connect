import React, { useState, useEffect } from 'react'
import supabase from '../../config/supabaseClient'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import Toast from '../../components/UI/Toast'
import Select from 'react-select';
import FileSelector from './FileSelector'


const ClientChecklist = ({ isAdmin }) => {
    const [businessName, setBusinessName] = useState('')
    const [contactName, setContactName] = useState('')
    const [email, setEmail] = useState('')
    const [formError, setFormError] = useState(null)
    const [file, setFile] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shouldSubmitForm, setShouldSubmitForm] = useState(false);
    const [checklist, setChecklist] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);

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
                            checklistItems.push({ key: 'bank_account_statement', label: 'Bank Account Statements', value: status });
                        }

                        if (client.credit_card_statement) {
                            const status = client.credit_card_statement === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ key: 'credit_card_statement', label: 'Credit Card Statements', value: status });
                        }

                        if (client.summary_of_sales_and_cash_check_receipt) {
                            const status = client.summary_of_sales_and_cash_check_receipt === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ key: 'summary_of_sales_and_cash_check_receipt', label: 'Summary of Sales and Cash/Check Receipts', value: status });
                        }

                        if (client.expense_sumamry) {
                            const status = client.expense_sumamry === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ key: 'expense_sumamry', label: 'Expense Sumamry', value: status });
                        }

                        if (client.latest_tax_return) {
                            const status = client.latest_tax_return === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ key: 'latest_tax_return', label: 'Latest Tax Return', value: status });
                        }

                        if (client.documents_related_to_property_or_equipment_transaction) {
                            const status = client.documents_related_to_property_or_equipment_transaction === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ key: 'documents_related_to_property_or_equipment_transaction', label: 'Documents Related to Property or Equipment Transactions', value: status });
                        }

                        if (client.summary_of_accounts_receivable) {
                            const status = client.summary_of_accounts_receivable === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ key: 'summary_of_accounts_receivable', label: 'Summary of Account Receivable', value: status });
                        }

                        if (client.summary_of_accounts_payable) {
                            const status = client.summary_of_accounts_payable === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ key: 'summary_of_accounts_payable', label: 'Summary of Account Payable', value: status });
                        }

                        if (client.debt_information) {
                            const status = client.debt_information === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ key: 'debt_information', label: 'Debt Information', value: status });
                        }

                        if (client.payroll_data) {
                            const status = client.payroll_data === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ key: 'payroll_data', label: 'Payroll Data', value: status });
                        }

                        if (client.inventory_report) {
                            const status = client.inventory_report === 'Complete' ? 'Complete' : 'Open';
                            checklistItems.push({ key: 'inventory_report', label: 'Inventory Report', value: status });
                        }

                        setChecklist(checklistItems);
                        setBusinessName(client.business_name);
                        setContactName(client.contact_name);
                        setEmail(client.email);
                        setLogoUrl(client.logoUrl);
                        setIsLoading(false);
                    }
                }
            }
        };

        fetchClient();
    }, []);


    // An example options array with your checklist data
    const selectAllOption = { value: 'all', label: 'Select All' };
    const options = [selectAllOption, ...Object.keys(checklist)
        .filter(key => ['Open', 'Complete'].includes(checklist[key].value))
        .map(key => {
            const statusClass = checklist[key].value === 'Open' ? 'bg-yellow-300 text-yellow-900' : 'bg-green-300 text-green-900';
            return { value: key, label: checklist[key].label, className: statusClass, status: checklist[key].value };
        })];


    // Handle the change event when options are selected
    const handleSelectChange = selectedOptions => {
        if (selectedOptions.some(option => option.value === 'all')) {
            // If 'Select All' is selected, set all options as selected except 'Select All'
            setSelectedOptions(options.filter(option => option.value !== 'all'));
        } else {
            setSelectedOptions(selectedOptions);
        }
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

    console.log(checklist)
    return (
        <>
            <div className="p-5 pt-24 h-screen bg-slate-100">
                <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                <Link to="../client" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Clients
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">On-boarding Checklist</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="relative w-full h-full px-4 md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                            <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                                <h3 className="text-xl font-semibold dark:text-white">
                                    Client's On-boarding Checklist
                                </h3>
                            </div>
                            {isLoading ?
                                <LoadingSpinner />
                                :
                                <>
                                    <div className="p-6 space-y-6">
                                        <FileSelector isAdmin={isAdmin} />
                                    </div>
                                </>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientChecklist