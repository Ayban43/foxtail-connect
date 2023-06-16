import React, { useState, useEffect } from 'react'
import supabase from '../../config/supabaseClient'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { useLocation, useParams } from 'react-router-dom';
import footerLogo from "../../assets/footerLogo.png"
import { Document, Page, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import TitlePage from './documents/TitlePage';
import TableOfContents from './documents/TableOfContents';
import ProfitLossDocument from './documents/ProfitLoss';
import ProfitLoss from './documents/ProfitLoss';
import ProfitLossPDF from './documents/ProfitLoss';
import PdfToImageConverter from './PdfToImageConverter';
import PdfViewer from './PdfViewer';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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

    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pdfFile, setPdfFile] = useState(''); // State variable to store the PDF file URL or path


    const openModal = (fileUrl, pageNumber) => {
        setPdfFile(fileUrl);
        setCurrentPage(pageNumber);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setPdfFile('');
    };

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

    console.log(profitLossUrl)

    return (
        <>
            <div className='ml-64 mt-32 bg-red-100'>
                {profitLossUrl &&
                    <PdfViewer pdfUrl={profitLossUrl} />
                }

            </div>


        </>
    )
}

export default ViewFinancialSummaryClient