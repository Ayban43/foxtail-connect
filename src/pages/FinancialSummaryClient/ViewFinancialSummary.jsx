import React, { useState, useEffect } from 'react'
import supabase from '../../config/supabaseClient'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { useLocation, useParams } from 'react-router-dom';
import footerLogo from "../../assets/footerLogo.png"
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const ViewFinancialSummaryClient = () => {
    const [financialSummary, setFinancialSummary] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    //const [userSession, setUserSession] = useState(false)

    const [profitLossNumPages, setProfitLossNumPages] = useState(null);
    const [balanceSheetNumPages, setBalanceSheetNumPages] = useState(null);
    const [cashFlowNumPages, setCashFlowNumPages] = useState(null);
    const [forecastedFinancialNumPages, setForecastedFinancialNumPages] = useState(null);
    const [kpiDisplayNumPages, setKpiDisplayNumPages] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const added = queryParams.get('added');
    const { id } = useParams();

    const [companyLogo, setCompanyLogo] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [periodCovered, setPeriodCovered] = useState("");
    const [profitLossUrl, setProfitLossUrl] = useState("");
    const [profitLossAnalysis, setProfitLossAnalysis] = useState("");
    const [balanceSheetUrl, setBalanceSheetUrl] = useState("");
    const [balanceSheetAnalysis, setBalanceSheetAnalysis] = useState("");
    const [cashFlowUrl, setCashFlowUrl] = useState("");
    const [cashFlowAnalysis, setCashFlowAnalysis] = useState("");
    const [forecastedFinancialUrl, setForecastedFinancialUrl] = useState("");
    const [forecastedFinancialAnalysis, setForecastedFinancialAnalysis] = useState("");
    const [kpiDisplayUrl, setKpiDisplayUrl] = useState("");
    const [executiveAnalysis, setExecutiveAnalysis] = useState("");
    const [keepAnEyeOn, setKeepAnEyeOn] = useState("");
    const [strategicOpportunities, setStrategicOpportunities] = useState("");

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    //PRofit loss -----------------------------------------

    const profitLossOnDocumentLoadSuccess = ({ numPages }) => {
        setProfitLossNumPages(numPages);
    };

    const [profitLossCurrentPage, setProfitLossCurrentPage] = useState(1);

    const profitLossGoToNextPage = () => {
        if (profitLossCurrentPage < profitLossNumPages) {
            setProfitLossCurrentPage(profitLossCurrentPage + 1);
        }
    };

    const profitLossGoToPreviousPage = () => {
        if (profitLossCurrentPage > 1) {
            setProfitLossCurrentPage(profitLossCurrentPage - 1);
        }
    };

    //Balance Sheet -----------------------------------------

    const balanceSheetOnDocumentLoadSuccess = ({ numPages }) => {
        setBalanceSheetNumPages(numPages);
    };

    const [balanceSheetCurrentPage, setBalanceSheetCurrentPage] = useState(1);

    const balanceSheetGoToNextPage = () => {
        if (balanceSheetCurrentPage < balanceSheetNumPages) {
            setBalanceSheetCurrentPage(balanceSheetCurrentPage + 1);
        }
    };

    const balanceSheetGoToPreviousPage = () => {
        if (balanceSheetCurrentPage > 1) {
            setBalanceSheetCurrentPage(balanceSheetCurrentPage - 1);
        }
    };

    //Cash Flow -----------------------------------------

    const cashFlowOnDocumentLoadSuccess = ({ numPages }) => {
        setCashFlowNumPages(numPages);
    };

    const [cashFlowCurrentPage, setCashFlowCurrentPage] = useState(1);

    const cashFlowGoToNextPage = () => {
        if (cashFlowCurrentPage < cashFlowNumPages) {
            setCashFlowCurrentPage(cashFlowCurrentPage + 1);
        }
    };

    const cashFlowGoToPreviousPage = () => {
        if (cashFlowCurrentPage > 1) {
            setCashFlowCurrentPage(cashFlowCurrentPage - 1);
        }
    };

    //Forecasted Financial-----------------------------------------

    const forecastedFinancialOnDocumentLoadSuccess = ({ numPages }) => {
        setForecastedFinancialNumPages(numPages);
    };

    const [forecastedFinancialCurrentPage, setForecastedFinancialCurrentPage] = useState(1);

    const forecastedFinancialGoToNextPage = () => {
        if (forecastedFinancialCurrentPage < forecastedFinancialNumPages) {
            setForecastedFinancialCurrentPage(forecastedFinancialCurrentPage + 1);
        }
    };

    const forecastedFinancialGoToPreviousPage = () => {
        if (forecastedFinancialCurrentPage > 1) {
            setForecastedFinancialCurrentPage(forecastedFinancialCurrentPage - 1);
        }
    };

    //KPI Display-----------------------------------------

    const kpiDisplayOnDocumentLoadSuccess = ({ numPages }) => {
        setKpiDisplayNumPages(numPages);
    };

    const [kpiDisplayCurrentPage, setKpiDisplayCurrentPage] = useState(1);

    const kpiDisplayGoToNextPage = () => {
        if (kpiDisplayCurrentPage < kpiDisplayNumPages) {
            setKpiDisplayCurrentPage(kpiDisplayCurrentPage + 1);
        }
    };

    const kpiDisplayGoToPreviousPage = () => {
        if (kpiDisplayCurrentPage > 1) {
            setKpiDisplayCurrentPage(kpiDisplayCurrentPage - 1);
        }
    };

    useEffect(() => {
        const fetchSummary = async () => {
            setIsLoading(true);

            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session) {
                const { user } = session;
                // setUserSession(user);

                if (user) {
                    const loggedInUserEmail = user.email;

                    const { data: summary, error: summaryError } = await supabase
                        .from('financial_summary')
                        .select()
                        .eq('id', id)
                        .single();

                    if (summaryError) {
                        setFinancialSummary(null);
                        console.log(summaryError);
                        setIsLoading(false);
                        return;
                    }

                    const { data: client, error: clientError } = await supabase
                        .from('clients')
                        .select()
                        .eq('email', summary.email)
                        .single();

                    if (clientError) {
                        setFinancialSummary(null);
                        console.log(clientError);
                        setIsLoading(false);
                        return;
                    }

                    const summaryWithClient = { ...summary, client };

                    setFinancialSummary(summaryWithClient);
                    setIsLoading(false);
                    if (summaryWithClient) {
                        setBusinessName(summaryWithClient.client.business_name)
                        setCompanyLogo(summaryWithClient.client.logoUrl)
                        setPeriodCovered(summaryWithClient.period_covered)
                        setProfitLossUrl(summary.profit_loss_file_url)
                        setBalanceSheetUrl(summary.balance_sheet_file_url)
                        setCashFlowUrl(summary.cash_flow_file_url)
                        setForecastedFinancialUrl(summary.forecasted_financial_file_url)
                        setKpiDisplayUrl(summary.kpi_display_file_url)
                        setExecutiveAnalysis(summary.executive_analysis)
                        setKeepAnEyeOn(summary.keep_an_eye_on)
                        setStrategicOpportunities(summary.strategic_opportunities)

                    }
                }
            }
        };

        fetchSummary();
    }, []);


    console.log(financialSummary)

    return (
        <>
            <div className="ml-64 p-5 pt-24 h-screen bg-slate-100">
                <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">View</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">

                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">View Financial Summary</h1>
                    <div className="flex items-center justify-end ml-auto space-x-2 sm:space-x-3 mb-5">
                        <a href="#" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                            <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path></svg>
                            Export
                        </a>
                    </div>

                    {isLoading ? <LoadingSpinner /> :
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <div className="flex items-center justify-center min-h-screen mt-24 ml-28 mb-5">
                                {/* <div className="fixed inset-0 transition-opacity bg-gray-500 opacity-75"></div> */}
                                <div className="z-10 bg-white w-[210mm] h-5/6 rounded-lg shadow-xl">
                                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col border-b-slate-700 border-4">

                                        <div className="section flex-1 justify-center flex">
                                            <div className="flex items-center justify-center bg-slate-200 rounded-full w-96 h-96">
                                                <img src={companyLogo} alt="company logo"></img>
                                            </div>
                                        </div>

                                        <div className="section flex-1 justify-center flex-wrap">
                                            <hr className="my-2 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                                            <div className="flex justify-center">
                                                <span className="font-medium text-2xl">{businessName} {capitalizeFirst("")} Financial Report </span>
                                            </div>
                                            <div className="flex justify-center">
                                                <span className="font-normal text-xl">{periodCovered}</span>
                                            </div>
                                            <hr className="my-2 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                                        </div>

                                        <div className="flex justify-start items-end">
                                            <img className="w-20" src={footerLogo}></img>
                                        </div>
                                    </div>

                                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col  border-b-slate-700 border-4">
                                        <h2 className="text-xl font-semibold">Profit & Loss Statement</h2>
                                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                                        <div className="section flex-1 mt-2 font-sans flex justify-center">
                                            <div>
                                                <Document
                                                    file={profitLossUrl}
                                                    onLoadSuccess={profitLossOnDocumentLoadSuccess}

                                                >
                                                    {profitLossNumPages && <Page pageNumber={profitLossCurrentPage} renderTextLayer={false} height={800} />}
                                                </Document>
                                                <div className="flex justify-between text-xs text-orange-700">
                                                    {profitLossCurrentPage > 1 && (
                                                        <span onClick={profitLossGoToPreviousPage} className="cursor-pointer flex border-b-2 border-orange-700">

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                                                            </svg>
                                                            Previous Page
                                                        </span>
                                                    )}
                                                    {profitLossCurrentPage < profitLossNumPages && (
                                                        <span onClick={profitLossGoToNextPage} className="cursor-pointer flex border-b-2 border-orange-700">
                                                            Next Page
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                                            </svg>

                                                        </span>
                                                    )}

                                                    <p className="flex justify-center">Current Page: {profitLossCurrentPage} / {profitLossNumPages}</p>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="section mt-2 font-sans flex-1 justify-start text-sm">
                                            <span className="font-medium ">Swift Analysis</span>

                                            <p className="bg-slate-50 p-2 max-h-[100px] overflow-y-auto">
                                                {profitLossAnalysis}
                                            </p>

                                        </div>
                                        <hr className="my-2 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                                        <div className="flex justify-start items-end">
                                            <img className="w-20" src={footerLogo}></img>
                                        </div>
                                    </div>


                                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col  border-b-slate-700 border-4">
                                        <h2 className="text-xl font-semibold">Balance Sheet</h2>
                                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                                        <div className="section flex-1 mt-2 font-sans flex justify-center">
                                            <div>
                                                <Document
                                                    file={balanceSheetUrl}
                                                    onLoadSuccess={balanceSheetOnDocumentLoadSuccess}
                                                >
                                                    {balanceSheetNumPages && <Page pageNumber={balanceSheetCurrentPage} renderTextLayer={false} height={800} />}
                                                </Document>
                                                <div className="flex justify-between text-xs text-orange-700">
                                                    {balanceSheetCurrentPage > 1 && (
                                                        <span onClick={balanceSheetGoToPreviousPage} className="cursor-pointer flex border-b-2 border-orange-700 ">

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                                                            </svg>
                                                            Previous Page
                                                        </span>
                                                    )}
                                                    {balanceSheetCurrentPage < balanceSheetNumPages && (
                                                        <span onClick={balanceSheetGoToNextPage} className="cursor-pointer flex border-b-2 border-orange-700">
                                                            Next Page
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                                            </svg>

                                                        </span>
                                                    )}

                                                    <p className="flex justify-center">Current Page: {balanceSheetCurrentPage} / {balanceSheetNumPages}</p>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="section mt-2 font-sans flex-1 justify-start">
                                            <span className="font-medium ">Swift Analysis</span>

                                            <p className="bg-slate-50 p-2 max-h-[100px] overflow-y-auto">
                                                {balanceSheetAnalysis}
                                            </p>

                                        </div>
                                        <hr className="my-2 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                                        <div className="flex justify-start items-end">
                                            <img className="w-20" src={footerLogo}></img>
                                        </div>
                                    </div>

                                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col  border-b-slate-700 border-4">
                                        <h2 className="text-xl font-semibold">Statement of Cash Flows</h2>
                                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                                        <div className="section flex-1 mt-2 font-sans flex justify-center">
                                            <div>
                                                <Document
                                                    file={cashFlowUrl}
                                                    onLoadSuccess={cashFlowOnDocumentLoadSuccess}
                                                >
                                                    {cashFlowNumPages && <Page pageNumber={cashFlowCurrentPage} renderTextLayer={false} height={800} />}
                                                </Document>
                                                <div className="flex justify-between text-xs text-orange-700">
                                                    {cashFlowCurrentPage > 1 && (
                                                        <span onClick={cashFlowGoToPreviousPage} className="cursor-pointer flex border-b-2 border-orange-700 ">

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                                                            </svg>
                                                            Previous Page
                                                        </span>
                                                    )}
                                                    {cashFlowCurrentPage < cashFlowNumPages && (
                                                        <span onClick={cashFlowGoToNextPage} className="cursor-pointer flex border-b-2 border-orange-700">
                                                            Next Page
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                                            </svg>

                                                        </span>
                                                    )}

                                                    <p className="flex justify-center">Current Page: {cashFlowCurrentPage} / {cashFlowNumPages}</p>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="section mt-2 font-sans flex-1 justify-start">
                                            <span className="font-medium ">Swift Analysis</span>

                                            <p className="bg-slate-50 p-2 max-h-[100px] overflow-y-auto">
                                                {cashFlowAnalysis}
                                            </p>

                                        </div>
                                        <hr className="my-2 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                                        <div className="flex justify-start items-end">
                                            <img className="w-20" src={footerLogo}></img>
                                        </div>
                                    </div>

                                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col justify-betwee  border-b-slate-700 border-4">
                                        <h2 className="text-xl font-semibold">KPI Display</h2>
                                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                                        <div className="section flex-1 mt-2 font-sans flex justify-center">
                                            <div>
                                                <Document
                                                    file={kpiDisplayUrl}
                                                    onLoadSuccess={kpiDisplayOnDocumentLoadSuccess}
                                                >
                                                    {kpiDisplayNumPages && <Page pageNumber={kpiDisplayCurrentPage} renderTextLayer={false} height={800} />}
                                                </Document>
                                                <div className="flex justify-between text-xs text-orange-700">
                                                    {kpiDisplayCurrentPage > 1 && (
                                                        <span onClick={kpiDisplayGoToPreviousPage} className="cursor-pointer flex border-b-2 border-orange-700 ">

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                                                            </svg>
                                                            Previous Page
                                                        </span>
                                                    )}
                                                    {kpiDisplayCurrentPage < kpiDisplayNumPages && (
                                                        <span onClick={kpiDisplayGoToNextPage} className="cursor-pointer flex border-b-2 border-orange-700">
                                                            Next Page
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                                            </svg>

                                                        </span>
                                                    )}

                                                    <p className="flex justify-center">Current Page: {kpiDisplayCurrentPage} / {kpiDisplayNumPages}</p>
                                                </div>

                                            </div>
                                        </div>

                                        <hr className="my-2 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                                        <div className="flex justify-start items-end">
                                            <img className="w-20" src={footerLogo}></img>
                                        </div>
                                    </div>

                                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col justify-betwee  border-b-slate-700 border-4">
                                        <h2 className="text-xl font-semibold">Forecasted Financials</h2>
                                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                                        <div className="section flex-1 mt-2 font-sans flex justify-center">
                                            <div>
                                                <Document
                                                    file={forecastedFinancialUrl}
                                                    onLoadSuccess={forecastedFinancialOnDocumentLoadSuccess}
                                                >
                                                    {forecastedFinancialNumPages && <Page pageNumber={forecastedFinancialCurrentPage} renderTextLayer={false} height={800} />}
                                                </Document>
                                                <div className="flex justify-between text-xs text-orange-700">
                                                    {forecastedFinancialCurrentPage > 1 && (
                                                        <span onClick={forecastedFinancialGoToPreviousPage} className="cursor-pointer flex border-b-2 border-orange-700 ">

                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                                                            </svg>
                                                            Previous Page
                                                        </span>
                                                    )}
                                                    {forecastedFinancialCurrentPage < forecastedFinancialNumPages && (
                                                        <span onClick={forecastedFinancialGoToNextPage} className="cursor-pointer flex border-b-2 border-orange-700">
                                                            Next Page
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                                            </svg>

                                                        </span>
                                                    )}

                                                    <p className="flex justify-center">Current Page: {forecastedFinancialCurrentPage} / {forecastedFinancialNumPages}</p>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="section mt-2 font-sans flex-1 justify-start">
                                            <span className="font-medium ">Swift Analysis</span>

                                            <p className="bg-slate-50 p-2 max-h-[100px] overflow-y-auto">
                                                {forecastedFinancialAnalysis}
                                            </p>

                                        </div>
                                        <hr className="my-2 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                                        <div className="flex justify-start items-end">
                                            <img className="w-20" src={footerLogo}></img>
                                        </div>
                                    </div>

                                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col justify-betwee  border-b-slate-700 border-4">
                                        <h2 className="text-xl font-semibold">Executive Summary</h2>
                                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                                        <div className="section mt-10 font-sans flex-1 justify-start">
                                            <span className="font-medium ">Analysis</span>

                                            <p className="bg-slate-50 p-2 max-h-[100px] overflow-y-auto">
                                                {executiveAnalysis}
                                            </p>

                                        </div>
                                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                                        <div className="section mt-2 font-sans flex-1 justify-start">
                                            <span className="font-medium ">Keep An Eye On</span>

                                            <p className="bg-slate-50 p-2 max-h-[100px] overflow-y-auto">
                                                {keepAnEyeOn}
                                            </p>

                                        </div>
                                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                                        <div className="section mt-2 font-sans flex-1 justify-start">
                                            <span className="font-medium ">Strategic Opportunities</span>

                                            <p className="bg-slate-50 p-2 max-h-[100px] overflow-y-auto">
                                                {strategicOpportunities}
                                            </p>

                                        </div>
                                        <hr className="my-2 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                                        <div className="flex justify-start items-end">
                                            <img className="w-20" src={footerLogo}></img>
                                        </div>
                                    </div>


                                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col justify-betwee  border-b-slate-700 border-4">
                                        <h2 className="text-xl font-semibold">Additional Resources</h2>
                                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                                        <div className="section mt-10 font-sans flex-1 justify-start">
                                            <span className="font-medium underline">Live Report Review</span>
                                            <br></br>
                                            <span className="">
                                                Click <a className="text-blue-600 underline" href="#">here</a> to schedule a live, 30-minute review of this report
                                            </span>
                                        </div>
                                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                                        <div className="section mt-2 font-sans flex-1 justify-start">
                                            <span className="font-medium underline">Video Library</span>
                                            <br></br>
                                            <span className="">
                                                Click <a className="text-blue-600 underline" href="#">here</a> to visit our video library, which includes 3-minute explanations on the financial statements
                                                and KPI’s produced in this report.
                                            </span>

                                        </div>
                                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                                        <div className="section mt-2 font-sans flex-1 justify-start">
                                            <span className="font-medium underline">Financial Blog</span>
                                            <br></br>
                                            <span className="">
                                                Click <a className="text-blue-600 underline" href="#">here</a> to visit our blog, updated regularly with notes on business, growth, and finance.
                                            </span>

                                        </div>
                                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                                        <div className="section mt-2 font-sans flex-1 justify-start">
                                            <span className="font-medium underline">Referral Program</span>
                                            <br></br>
                                            <span className="">
                                                Click <a className="text-blue-600 underline" href="#">here</a> to refer a business that could use our services. If your referral joins the Foxtail team and
                                                remains a client for two months, you get $500!
                                            </span>

                                        </div>
                                        <hr className="my-2 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                                        <div className="flex justify-start items-end">
                                            <img className="w-20" src={footerLogo}></img>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }

                </div>

            </div>
        </>
    )
}

export default ViewFinancialSummaryClient