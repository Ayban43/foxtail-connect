import React, { useState, useEffect } from 'react'
import supabase from '../../config/supabaseClient'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { useLocation, useParams, Link } from 'react-router-dom';
import footerLogo from "../../assets/footerLogo.png"
import { Document, Page, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import TitlePage from './documents/TitlePage';
import TableOfContents from './documents/TableOfContents';
import ProfitLossDocument from './documents/ProfitLoss';
import ProfitLoss from './documents/ProfitLoss';
import ProfitLossPDF from './documents/ProfitLoss';
import BalanceSheet from './documents/BalanceSheet';
import CashFlow from './documents/CashFlow';
import KpiDisplay from './documents/KpiDisplay';
import ForecastedFinancial from './documents/ForecastedFinancial';
import ExecutiveSummary from './documents/ExecutiveSummary';
import AdditionalResources from './documents/AdditionalResources';


// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewFinancialSummaryClient = () => {
    const [financialSummary, setFinancialSummary] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    //const [userSession, setUserSession] = useState(false)

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const added = queryParams.get('added');
    const { id } = useParams();

    const [companyLogo, setCompanyLogo] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [periodCovered, setPeriodCovered] = useState("");
    const [frequency, setFrequency] = useState("");
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

    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pdfFile, setPdfFile] = useState(''); // State variable to store the PDF file URL or path


    const Loading = () => {
        return <div>Loading...</div>; // Replace with your own loading component
    };

    const openModal = (fileUrl, pageNumber) => {
        setPdfFile(fileUrl);
        setCurrentPage(pageNumber);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setPdfFile('');
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

                    if (summaryWithClient) {
                        setBusinessName(summaryWithClient.client.business_name)
                        setCompanyLogo(summaryWithClient.client.logoUrl)
                        setPeriodCovered(summaryWithClient.period_covered)
                        setFrequency(summaryWithClient.frequency)
                        setProfitLossUrl(summary.profit_loss_file_url)
                        setProfitLossAnalysis(summary.profit_loss_analysis)
                        setBalanceSheetUrl(summary.balance_sheet_file_url)
                        setBalanceSheetAnalysis(summary.balance_sheet_analysis)
                        setCashFlowUrl(summary.cash_flow_file_url)
                        setCashFlowAnalysis(summary.cash_flow_analysis)
                        setForecastedFinancialUrl(summary.forecasted_financial_file_url)
                        setForecastedFinancialAnalysis(summary.forecasted_financial_analysis)
                        setKpiDisplayUrl(summary.kpi_display_file_url)
                        setExecutiveAnalysis(summary.executive_analysis)
                        setKeepAnEyeOn(summary.keep_an_eye_on)
                        setStrategicOpportunities(summary.strategic_opportunities)
                        setIsLoading(false);
                    }
                }
            }
        };

        fetchSummary();
    }, []);

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
        },
        pdf: {
            flex: 1,
            width: '100%',
            height: '100%',
            border: 'none',
        },
    });

    return (
        <>
            <div className="p-5 pt-24 h-screen bg-slate-100">
                {modalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg"></div>
                        <div className="modal-container bg-white p-4 rounded-md shadow-md">
                            <button
                                className="absolute top-2 right-2 p-2 bg-gray-300 rounded-full"
                                onClick={closeModal}
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className="pdf-container">
                                <Document file={pdfFile}>
                                    <Page
                                        pageNumber={currentPage}
                                        renderTextLayer={false}
                                        height={window.innerHeight * 0.90}
                                    />
                                </Document>
                            </div>
                        </div>
                    </div>
                )}

                <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Dashboard
                            </a>
                        </li>
                        <Link to="/financial-summary/">
                            <li>
                                <div className="flex items-center">
                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Financial Summary</a>
                                </div>
                            </li>
                        </Link>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>

                                <span className="mx-2 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">View</span>
                                <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">Please be patient, as the loading process may take some time.</span>
                                <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">To view the actual file, you can click (CTRL + left-click) on the image or PDF, and it will open in a new tab.</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className=" bg-gray-600 border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">

                    {/* <h1 className="text-xl font-semibold text-white sm:text-2xl dark:text-white">View Financial Summary</h1>
                    <div className="flex items-center justify-end ml-auto space-x-2 sm:space-x-3 mb-5">
                        <a href="#" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                            <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path></svg>
                            Export
                        </a>
                    </div> */}


                    {/* <ProfitLoss profitLossUrl={profitLossUrl} footerLogo={footerLogo} /> */}
                    {/* <PdfToImageRenderer pdfUrl={profitLossUrl} /> */}

                    {isLoading ? <LoadingSpinner /> :

                        <PDFViewer style={{ width: '100%', height: '80vh' }}>
                            <Document>
                                <TitlePage
                                    companyLogo={companyLogo}
                                    businessName={businessName}
                                    periodCovered={periodCovered}
                                    frequency={frequency}
                                    footerLogo={footerLogo}
                                />
                                <TableOfContents
                                    footerLogo={footerLogo}
                                />

                                {profitLossUrl &&
                                    <ProfitLoss profitLossUrl={profitLossUrl} footerLogo={footerLogo} profitLossAnalysis={profitLossAnalysis} />
                                }

                                {balanceSheetUrl &&
                                    <BalanceSheet balanceSheetUrl={balanceSheetUrl} footerLogo={footerLogo} balanceSheetAnalysis={balanceSheetAnalysis} />
                                }

                                {cashFlowUrl &&
                                    <CashFlow cashFlowUrl={cashFlowUrl} footerLogo={footerLogo} cashFlowAnalysis={cashFlowAnalysis} />
                                }

                                {kpiDisplayUrl &&
                                    <KpiDisplay kpiDisplayUrl={kpiDisplayUrl} footerLogo={footerLogo} />
                                }

                                {forecastedFinancialUrl &&
                                    <ForecastedFinancial forecastedFinancialUrl={forecastedFinancialUrl} footerLogo={footerLogo} forecastedFinancialAnalysis={forecastedFinancialAnalysis} />
                                }

                                <ExecutiveSummary
                                    footerLogo={footerLogo}
                                    executiveAnalysis={executiveAnalysis}
                                    keepAnEyeOn={keepAnEyeOn}
                                    strategicOpportunities={strategicOpportunities}
                                />

                                <AdditionalResources
                                    footerLogo={footerLogo}
                                />

                            </Document>

                        </PDFViewer>
                    }

                </div>

            </div>
        </>
    )
}

export default ViewFinancialSummaryClient