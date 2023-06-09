import React, { useState, useEffect } from 'react'
import { getClients } from '../../queries/getClients'
import { useNavigate } from 'react-router-dom'
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

const AddFinancialSummary = () => {
    const navigate = useNavigate()
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
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

    const [executiveAnalysis, setExecutiveAnalaysis] = useState("");
    const [keepAnEyeOn, setKeepAnEyeOn] = useState("");
    const [strategicOpportunities, setStrategicOpportunities] = useState("");

    const [kpiDisplayFileUrl, setKpiDisplayFileUrl] = useState("");

    const [showModal, setShowModal] = useState(false);


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    console.log(frequency)

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
        setExecutiveAnalaysis(e.target.value);
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
            // Insert a new record into the "forms" table
            const { data, error } = await supabase.from('financial_summary').insert(formData);

            if (error) {
                throw error;
            }

            navigate('/financial-summary?added=true');


        } catch (error) {
            console.error('Error adding record to Supabase:', error.message);
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
            kpi_display_file_url: kpiDisplayFileUrl,
            frequency: frequency
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
            <div className="p-5 pt-24 bg-slate-100">

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
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Add</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="relative w-full h-full px-4 md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                            <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                                <h3 className="text-xl font-semibold dark:text-white">
                                    Add Financial Summary
                                </h3>
                            </div>

                            <div className="p-6 space-y-6">

                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-6 p-5">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client</label>
                                        <ClientSelector clients={clients} onClientSelect={handleClientSelect} />
                                    </div>

                                    <div className="display flex gap-5 col-span-6 sm:col-span-6">

                                        <div className="w-full p-5 bg-slate-100 rounded-lg">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Report Frequency</label>
                                            <Frequency frequency={frequency} onChange={(e) => setFrequency(e.target.value)} />
                                        </div>

                                        <div className="w-full p-5 bg-slate-100 rounded-lg">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Period Covered:</label>
                                            {frequency === 'Annual' && (
                                                <YearPicker defaultYear={selectedAnnual} onChange={handleAnnualChange} />
                                            )}

                                            {frequency === 'Quarterly' && (
                                                <QuarterPicker onChange={handleQuarterChange} />
                                            )}

                                            {frequency === 'Monthly' && (
                                                <MonthPicker
                                                    defaultYear={selectedYear}
                                                    defaultMonth={selectedMonth}
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
                                <button onClick={handlePreviewClick} className="text-white block w-1/2 px-3 py-2 bg-orange-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm sm:w-auto text-center dark:focus:ring-blue-900">Preview</button>
                                <button onClick={handleSubmit} className="text-white block w-1/2 px-3 py-2 bg-green-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm sm:w-auto text-center dark:focus:ring-blue-900">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <PreviewModal
                    /* Add more props to pass in more state values */
                    clientLogo={selectedClient.logo}
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

export default AddFinancialSummary