import React, { useState } from 'react'
import footerLogo from "../../assets/footerLogo.png"
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PreviewModal = (props) => {

    const [profitLossNumPages, setProfitLossNumPages] = useState(null);
    const [balanceSheetNumPages, setBalanceSheetNumPages] = useState(null);
    const [cashFlowNumPages, setCashFlowNumPages] = useState(null);
    const [forecastedFinancialNumPages, setForecastedFinancialNumPages] = useState(null);
    const [kpiDisplayNumPages, setKpiDisplayNumPages] = useState(null);

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






    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen mt-24 ml-28 mb-5">
                <div className="fixed inset-0 transition-opacity bg-gray-500 opacity-75" onClick={props.onClose}></div>
                <div className="z-10 bg-white w-[210mm] h-5/6 rounded-lg shadow-xl">
                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col border-b-slate-700 border-4">
                        {/* <div className="justify-end flex align-middle">
                            <span className="  px-2 cursor-pointer bg-red-600 hover:bg-red-400 text-white font-bold rounded focus:outline-none focus:shadow-outline" onClick={props.onClose}>
                                x
                            </span>
                        </div> */}

                        <div className="section flex-1 justify-center flex">
                            <div className="flex items-center justify-center bg-slate-200 rounded-full w-96 h-96">
                                <img src={props.clientLogo} alt="company logo"></img>
                            </div>
                        </div>

                        <div className="section flex-1 justify-center flex-wrap">
                            <hr className="my-2 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                            <div className="flex justify-center">
                                <span className="font-medium text-2xl">{props.clientName} {capitalizeFirst(props.frequency)} Financial Report </span>
                            </div>
                            <div className="flex justify-center">
                                <span className="font-normal text-xl">{props.periodCovered}</span>
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
                                    file={props.profitLossUrl}
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
                                {props.profitLossAnalysis}
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
                                    file={props.balanceSheetFileUrl}
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
                                {props.balanceSheetAnalysis}
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
                                    file={props.cashFlowFileUrl}
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
                                {props.cashFlowAnalysis}
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
                                    file={props.kpiDisplayFileUrl}
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
                                    file={props.forecastedFinancialFileUrl}
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
                                {props.forecastedFinancialAnalysis}
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
                                {props.executiveAnalysis}
                            </p>

                        </div>
                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                        <div className="section mt-2 font-sans flex-1 justify-start">
                            <span className="font-medium ">Keep An Eye On</span>

                            <p className="bg-slate-50 p-2 max-h-[100px] overflow-y-auto">
                                {props.keepAnEyeOn}
                            </p>

                        </div>
                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                        <div className="section mt-2 font-sans flex-1 justify-start">
                            <span className="font-medium ">Strategic Opportunities</span>

                            <p className="bg-slate-50 p-2 max-h-[100px] overflow-y-auto">
                                {props.strategicOpportunities}
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
        </div >

    );
}

export default PreviewModal