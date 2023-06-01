import React, { useState, useEffect } from 'react'
import { getClients } from '../../queries/getClients'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import ClientSelector from '../../components/Forms/ClientSelector';
import supabase from '../../config/supabaseClient';
import Frequency from '../../components/Forms/Frequency';
import YearPicker from '../../components/Forms/YearPicker';
import MonthPicker from '../../components/Forms/MonthPicker';
import QuarterPicker from '../../components/Forms/QuarterPicker';
import PreviewModal from './PreviewModal';

import ProfitLossSummary from './Tabs/ProfitLossSummary';
import BalanceSheetSummary from './Tabs/BalanceSheetSummary';
import CashFlowSummary from './Tabs/CashFlowSummary';
import ExecutiveSummary from './Tabs/ExecutiveSummary';
import KpiDisplaySummary from './Tabs/KpiDisplay';
import ForecastedFinancialSummary from './Tabs/ForecastedFinancialSummary';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import FinancialSummary from './FinancialSummary';
import Toast from '../../components/UI/Toast';

const EditFinancialSummary = () => {
    const navigate = useNavigate()
    const [clients, setClients] = useState([]);
    const [selectedC, setSelectedC] = useState("")
    const [selectedClient, setSelectedClient] = useState(selectedC || null);
    const [frequency, setFrequency] = useState('');
    const [selectedAnnual, setSelectedAnnual] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState('');
    const [periodCovered, setPeriodCovered] = useState('');
    const [selectedQuarter, setSelectedQuarter] = useState('');
    const [selectedQuarterYear, setSelectedQuarterYear] = useState('');
    const [activeTab, setActiveTab] = useState("profit-loss");

    const [profitLossFileUrl, setProfitLossFileUrl] = useState("");
    const [profitLossAnalysis, setProfitLossAnalysis] = useState("");
    const [balanceSheetFileUrl, setBalanceSheetFileUrl] = useState("");
    const [balanceSheetAnalysis, setBalanceSheetAnalysis] = useState("");
    const [cashFlowFileUrl, setCashFlowsFileUrl] = useState("");
    const [cashFlowAnalysis, setCashFlowsAnalysis] = useState("");
    const [forecastedFinancialFileUrl, setForecastedFinancialFileUrl] = useState("");
    const [forecastedFinancialAnalysis, setForecastedFinancialAnalysis] = useState("");

    const [executiveAnalysis, setExecutiveAnalysis] = useState("");
    const [keepAnEyeOn, setKeepAnEyeOn] = useState("");
    const [strategicOpportunities, setStrategicOpportunities] = useState("");

    const [kpiDisplayFileUrl, setKpiDisplayFileUrl] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [financialSummary, setFinancialSummary] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const added = queryParams.get('added');
    const { id } = useParams();

    console.log("hello", selectedClient)

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchFinancialSummary = async () => {
            setIsLoading(true);

            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                const { user } = session;

                if (user) {
                    const loggedInUserEmail = user.email;

                    const { data: financialSummary, error: financialSummaryError } = await supabase
                        .from('financial_summary')
                        .select()
                        .eq('id', id)
                        .single();

                    if (financialSummaryError) {
                        console.log(financialSummaryError);
                        setIsLoading(false);
                        return;
                    }
                    setFinancialSummary(financialSummary)
                    if (financialSummary) {
                        const { data: client, error: clientError } = await supabase
                            .from('clients')
                            .select()
                            .eq('email', financialSummary.email)
                            .single();

                        if (clientError) {
                            console.log(clientError);
                            setIsLoading(false);
                            return;
                        }

                        if (client) {
                            setSelectedClient(client);
                            setSelectedC(client);
                        }

                        setFrequency(financialSummary.frequency)
                        setSelectedAnnual(financialSummary.period_covered)
                        setProfitLossFileUrl(financialSummary.profit_loss_file_url)
                        setProfitLossAnalysis(financialSummary.profit_loss_analysis)
                        setBalanceSheetFileUrl(financialSummary.balance_sheet_file_url)
                        setBalanceSheetAnalysis(financialSummary.balance_sheet_analysis)
                        setCashFlowsFileUrl(financialSummary.cash_flow_file_url)
                        setCashFlowsAnalysis(financialSummary.cash_flow_analysis)
                        setKpiDisplayFileUrl(financialSummary.kpi_display_file_url)
                        setForecastedFinancialFileUrl(financialSummary.forecasted_financial_file_url)
                        setForecastedFinancialAnalysis(financialSummary.forecasted_financial_analysis)
                        setKeepAnEyeOn(financialSummary.keep_an_eye_on)
                        setExecutiveAnalysis(financialSummary.executive_analysis)
                        setStrategicOpportunities(financialSummary.strategic_opportunities)
                        if (financialSummary.period_covered && financialSummary.frequency) {
                            if (financialSummary.frequency === "Monthly") {
                                const [month, year] = financialSummary.period_covered.split(', ');
                                setSelectedMonth(month);
                                setSelectedYear(year);
                            } else if (financialSummary.frequency === "Quarterly") {
                                const [quarter, quarterYear] = financialSummary.period_covered.split(', ');
                                setSelectedQuarter(quarter);
                                setSelectedQuarterYear(quarterYear);
                            }
                        }
                    }

                    setIsLoading(false);
                }
            }
        };

        fetchFinancialSummary();
    }, []);

    // TABSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

    const handleProfitLossFileUpload = (url) => {
        setProfitLossFileUrl(url);
    };

    const handleProfitLossAnalysis = (e) => {
        setProfitLossAnalysis(e.target.value);
    };

    const handleBalanceSheetFileUpload = (url) => {
        setBalanceSheetFileUrl(url);
    };

    const handleBalanceSheetAnalysis = (e) => {
        setBalanceSheetAnalysis(e.target.value);
    };

    const handleCashFlowFileUpload = (url) => {
        setCashFlowsFileUrl(url);
    };

    const handleCashFlowAnalysis = (e) => {
        setCashFlowsAnalysis(e.target.value);
    };

    const handleForecastedFinancialFileUpload = (url) => {
        setForecastedFinancialFileUrl(url);
    };

    const handleForecastedFinancialAnalysis = (e) => {
        setForecastedFinancialAnalysis(e.target.value);
    };

    const handleExecutiveAnalysis = (e) => {
        setExecutiveAnalysis(e.target.value);
    };

    const handleKeepAnEyeOn = (e) => {
        setKeepAnEyeOn(e.target.value);
    };

    const handleStrategicOpportunities = (e) => {
        setStrategicOpportunities(e.target.value);
    };

    const handleKpiDisplayFileUpload = (url) => {
        setKpiDisplayFileUrl(url);
    };

    // ---------------------------------------------

    // MODAL

    function handlePreviewClick() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    // ----------------------------------------------

    const handleClientSelect = (client) => {
        setSelectedClient(client);
    };

    async function addFormDataToSupabase(formData) {
        try {

            const { data, error } = await supabase
                .from('financial_summary')
                .update(formData)
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            } else {
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
                localStorage.setItem('formSubmitted', 'true');
            }


        } catch (error) {
            console.error('Error updating record to database:', error.message);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Create a new object with the form data
        const formData = {
            email: selectedClient.email,
            period_covered: periodCovered,
            profit_loss_file_url: profitLossFileUrl,
            profit_loss_analysis: profitLossAnalysis,
            balance_sheet_file_url: balanceSheetFileUrl,
            balance_sheet_analysis: balanceSheetAnalysis,
            cash_flow_file_url: cashFlowFileUrl,
            cash_flow_analysis: cashFlowAnalysis,
            forecasted_financial_file_url: forecastedFinancialFileUrl,
            forecasted_financial_analysis: forecastedFinancialAnalysis,
            executive_analysis: executiveAnalysis,
            keep_an_eye_on: keepAnEyeOn,
            strategic_opportunities: strategicOpportunities,
            kpi_display_file_url: kpiDisplayFileUrl
        };

        // Add the form data to Supabase
        addFormDataToSupabase(formData);
    }


    useEffect(() => {
        async function getchClients() {
            const clients = await getClients();
            setClients(clients);
        }
        getchClients();
    }, []);

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleFrequencyChange = (event) => {
        setFrequency(event.target.value);
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    const handleAnnualChange = (year) => {
        setSelectedAnnual(year);
    };

    const handleMonthChange = (month, year) => {
        setSelectedMonth(month);
        setSelectedYear(year);
    };

    const handleQuarterChange = (quarter, year) => {
        setSelectedQuarter(quarter);
        setSelectedQuarterYear(year);
    };

    useEffect(() => {
        if (frequency === "Annual") {
            setPeriodCovered(selectedAnnual);
        } else if (frequency === "Monthly") {
            const monthlyText = selectedMonth + ", " + selectedYear;
            setPeriodCovered(monthlyText);
        } else if (frequency === "Quarterly") {
            const quarterText = selectedQuarter + ", " + selectedQuarterYear
            setPeriodCovered(quarterText)
        }
    }, [frequency, selectedAnnual, selectedMonth, selectedYear, selectedQuarter, selectedQuarterYear]);

    return (
        <>
            <div className="ml-64 p-5 pt-24 bg-slate-100">
                {showToast && <Toast message="Changes has been saved!" />}
                <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white ">
                                <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Financial Summary</a>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Edit</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                {isLoading ?
                    <LoadingSpinner />
                    :

                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <div className="relative w-full h-full px-4 md:h-auto">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                                <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                                    <h3 className="text-xl font-semibold dark:text-white">
                                        Edit Financial Summary
                                    </h3>
                                </div>

                                <div className="p-6 space-y-6">

                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-6 p-5">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client</label>
                                            <ClientSelector clients={clients} selectedC={selectedC} onClientSelect={handleClientSelect} />
                                        </div>

                                        <div className="display flex gap-5 col-span-6 sm:col-span-6">

                                            <div className="w-full p-5 bg-slate-100 rounded-lg">
                                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Report Frequency</label>
                                                <Frequency frequency={frequency} onChange={(e) => setFrequency(e.target.value)} />
                                            </div>

                                            <div className="w-full p-5 bg-slate-100 rounded-lg">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Period Covered:</label>
                                                {frequency === 'Annual' && (
                                                    <YearPicker selectedAnnual={selectedAnnual} onChange={handleAnnualChange} />
                                                )}

                                                {frequency === 'Quarterly' && (
                                                    <QuarterPicker
                                                        selectedQ={selectedQuarter}
                                                        selectedQy={selectedQuarterYear}
                                                        onChange={handleQuarterChange} />
                                                )}

                                                {frequency === 'Monthly' && (
                                                    <MonthPicker
                                                        selectedY={selectedYear}
                                                        selectedM={selectedMonth}
                                                        onChange={handleMonthChange}
                                                    />
                                                )}
                                            </div>

                                        </div>

                                    </div>

                                    {/* TABSSSSSSSSSSSS */}

                                    <div className="border-b bg-slate-50">
                                        <div className="flex items-center bg-gray-800 text-white justify-between">
                                            <button
                                                className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "profit-loss" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200 ,t"
                                                    }`}
                                                onClick={() => handleTabClick("profit-loss")}
                                            >
                                                Profit &amp; Loss Statement
                                            </button>
                                            <button
                                                className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "balance-sheet" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                                    }`}
                                                onClick={() => handleTabClick("balance-sheet")}
                                            >
                                                Balance Sheet
                                            </button>
                                            <button
                                                className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "cash-flows" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                                    }`}
                                                onClick={() => handleTabClick("cash-flows")}
                                            >
                                                Statement of Cash Flows
                                            </button>
                                            <button
                                                className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "kpi" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                                    }`}
                                                onClick={() => handleTabClick("kpi")}
                                            >
                                                KPI Display
                                            </button>
                                            <button
                                                className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "forecasted-financial" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                                    }`}
                                                onClick={() => handleTabClick("forecasted-financial")}
                                            >
                                                Forecasted Financials
                                            </button>
                                            <button
                                                className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "executive" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                                    }`}
                                                onClick={() => handleTabClick("executive")}
                                            >
                                                Executive Summary
                                            </button>
                                        </div>

                                        <div className="p-4">
                                            {activeTab === "profit-loss" && <ProfitLossSummary profitLossFileUrl={profitLossFileUrl} onFileUpload={handleProfitLossFileUpload} onInputValueChange={handleProfitLossAnalysis} profitLossAnalysis={profitLossAnalysis} />}
                                            {activeTab === "balance-sheet" && <BalanceSheetSummary balanceSheetFileUrl={balanceSheetFileUrl} onFileUpload={handleBalanceSheetFileUpload} onInputValueChange={handleBalanceSheetAnalysis} balanceSheetFileAnalysis={balanceSheetAnalysis} />}
                                            {activeTab === "cash-flows" && <CashFlowSummary cashFlowFileUrl={cashFlowFileUrl} onFileUpload={handleCashFlowFileUpload} onInputValueChange={handleCashFlowAnalysis} cashFlowAnalysis={cashFlowAnalysis} />}
                                            {activeTab === "forecasted-financial" && <ForecastedFinancialSummary forecastedFinancialFileUrl={forecastedFinancialFileUrl} onFileUpload={handleForecastedFinancialFileUpload} onInputValueChange={handleForecastedFinancialAnalysis} forecastedFinancialAnalysis={forecastedFinancialAnalysis} />}
                                            {activeTab === "executive" && <ExecutiveSummary onInputValueExecutiveChange={handleExecutiveAnalysis} onInputValueKeepAnEyeOnChange={handleKeepAnEyeOn} onInputValueStrategicOpportunitiesChange={handleStrategicOpportunities} executiveAnalysis={executiveAnalysis} keepAnEyeOn={keepAnEyeOn} strategicOpportunities={strategicOpportunities} />}
                                            {activeTab === "kpi" && <KpiDisplaySummary kpiDisplayFileUrl={kpiDisplayFileUrl} onFileUpload={handleKpiDisplayFileUpload} />}

                                        </div>
                                    </div>


                                </div>

                                <div className="flex gap-5 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                                    <button onClick={handlePreviewClick} className="text-white block w-1/2 px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm sm:w-auto text-center dark:focus:ring-blue-900">Preview</button>
                                    <button onClick={handleSubmit} className="text-white block w-1/2 px-3 py-2 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm sm:w-auto text-center dark:focus:ring-blue-900">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                }

            </div>
            {showModal && (
                <PreviewModal
                    /* Add more props to pass in more state values */
                    clientLogo={selectedClient.logoUrl}
                    clientName={selectedClient.business_name}
                    frequency={frequency}
                    periodCovered={periodCovered}
                    profitLossUrl={profitLossFileUrl}
                    profitLossAnalysis={profitLossAnalysis}
                    balanceSheetFileUrl={balanceSheetFileUrl}
                    balanceSheetAnalysis={balanceSheetAnalysis}
                    cashFlowFileUrl={cashFlowFileUrl}
                    cashFlowAnalysis={cashFlowAnalysis}
                    executiveAnalysis={executiveAnalysis}
                    keepAnEyeOn={keepAnEyeOn}
                    strategicOpportunities={strategicOpportunities}
                    forecastedFinancialFileUrl={forecastedFinancialFileUrl}
                    kpiDisplayFileUrl={kpiDisplayFileUrl}
                    forecastedFinancialAnalysis={forecastedFinancialAnalysis}
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}

export default EditFinancialSummary