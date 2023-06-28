import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../../config/supabaseClient'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { useLocation } from 'react-router-dom';
import Toast from '../../components/UI/Toast'
import publishedSvg from '../../assets/published.svg';
import unpublishedSvg from '../../assets/unpublished.svg';
import FInancialSummaryPdf from './FInancialSummaryPdf';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const FinancialSummary = () => {
    const [financialSummary, setFinancialSummary] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [rowIdToDelete, setRowIdToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalPublished, setShowModalPublished] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [publishedStatus, setPublishedStatus] = useState({}); // Initialize the published status object
    const [initialLoad, setInitialLoad] = useState(true);
    const [rowIdToPublished, setRowIdToPublished] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const added = queryParams.get('added');

    const [isLoadingStatus, setIsLoadingStatus] = useState(true);

    useEffect(() => {
        const fetchSummaries = async () => {
            setIsLoading(true);

            const { data: summaries, error: summaryError } = await supabase
                .from('financial_summary')
                .select()
                .order('id', { ascending: false });

            if (summaryError) {
                setFinancialSummary(null);
                console.log(summaryError);
                setIsLoading(false);
                return;
            }

            const emails = summaries.map((summary) => summary.email);

            const { data: clients, error: clientError } = await supabase
                .from('clients')
                .select()
                .in('email', emails);

            if (clientError) {
                setFinancialSummary(null);
                console.log(clientError);
                setIsLoading(false);
                return;
            }

            // Combine the financial summaries and clients based on the email
            const summariesWithClients = summaries.map((summary) => {
                const client = clients.find((client) => client.email === summary.email);
                return { ...summary, client };
            });

            setFinancialSummary(summariesWithClients);

            // Initialize the publishedStatus state
            const initialStatus = {};
            summariesWithClients.forEach((summary) => {
                initialStatus[summary.id] = summary.published;
            });
            setPublishedStatus(initialStatus);

            setIsLoading(false);
        };

        fetchSummaries();
    }, []);



    function handleDeleteClick(event) {
        const rowId = event.target.dataset.rowId;
        setRowIdToDelete(rowId);
        console.log('rowId', rowId)
        setShowModal(true);
        console.log('hello clicked')
    }

    function handlePublishClick(event) {
        const rowId = event.currentTarget.getAttribute("data-row-id");
        console.log('rowId', rowId);
        setRowIdToPublished(rowId);
        setShowModalPublished(true);
    }

    function handleConfirmDelete() {
        if (rowIdToDelete) {
            supabase
                .from('financial_summary')
                .delete()
                .eq('id', rowIdToDelete)
                .then(response => {
                    // Handle success
                    console.log('Row deleted successfully:', response);
                    document.querySelector(`[data-row-id="${rowIdToDelete}"]`).closest('tr').remove();
                })
                .catch(error => {
                    // Handle error
                    console.error('Error deleting row:', error);
                })
                .finally(() => {
                    setShowModal(false);
                });
        }
    }

    // Function to update the published status
    const updatePublishStatus = async () => {
        console.log('update button', rowIdToPublished)
        if (rowIdToPublished) {
            try {
                const { data, error } = await supabase
                    .from('financial_summary')
                    .update({ published: !publishedStatus[rowIdToPublished] })
                    .eq('id', rowIdToPublished)
                    .single();

                if (error) {
                    console.error('Error updating publish status:', error);
                    return;
                }

                console.log('Publish status updated successfully:', data);

                setPublishedStatus((prevStatus) => ({
                    ...prevStatus,
                    [rowIdToPublished]: !prevStatus[rowIdToPublished],
                }));

                setShowToast(true); // Set showToast to true after successful update
            } catch (error) {
                console.error('Error updating publish status:', error);
            } finally {
                setShowModalPublished(false);
            }

        }

    };

    //show toast
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false); // Set showToast to false after 2 seconds
            }, 1500);

            return () => {
                clearTimeout(timer); // Clear the timeout if the component unmounts before the timeout expires
            };
        }
    }, [showToast]);

    return (
        <>
            <div className="p-5 pt-24 h-screen bg-slate-100">
                {showToast && <Toast message="Published status updated!" />}
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
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">List</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">

                    {showModal && (
                        <div id="confirm-modal" tabIndex="-1" className="fixed z-50 p-4 -inset-x-10 flex items-center justify-center">
                            <div className="relative w-full h-full max-w-md md:h-auto">
                                <div className="relative bg-slate-100 rounded-lg shadow-xl dark:bg-gray-700">
                                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                        <svg onClick={() => setShowModal(false)} aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-6 text-center">
                                        <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this financial summary?</h3>
                                        <button onClick={handleConfirmDelete} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Yes, I'm sure
                                        </button>
                                        <button onClick={() => setShowModal(false)} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {showModalPublished && (
                        <div id="confirm-modal" tabIndex="-1" className="fixed z-50 p-4 -inset-x-10 flex items-center justify-center">
                            <div className="relative w-full h-full max-w-md md:h-auto">
                                <div className="relative bg-slate-100 rounded-lg shadow-xl dark:bg-gray-700">
                                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                        <svg onClick={() => setShowModalPublished(false)} aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="p-6 text-center">
                                        <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you update the published status?</h3>
                                        <button onClick={updatePublishStatus} data-modal-hide="popup-modal" type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Yes, I'm sure
                                        </button>
                                        <button onClick={() => setShowModalPublished(false)} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Financial Summary</h1>
                    <div className="flex items-center justify-end ml-auto space-x-2 sm:space-x-3 mb-5">
                        <Link to="/financial-summary/add">
                            <span data-modal-toggle="add-user-modal" className="inline-flex items-center text-white w-1/2 px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm sm:w-auto text-center dark:focus:ring-blue-900">
                                <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add Financial Summary
                            </span>
                        </Link>
                        <PDFDownloadLink document={<FInancialSummaryPdf financialSummary={financialSummary} />} fileName="financial_summaries.pdf">
                            {({ blob, url, loading, error }) => (loading ? "Loading. . ." : <span className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                                <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path></svg>
                                Export
                            </span>)}
                        </PDFDownloadLink>
                    </div>

                    {isLoading ? <LoadingSpinner /> :
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-t border-b">
                                    <tr>
                                        <th scope="col" className="p-4 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Client
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Period Covered
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date Created
                                        </th>

                                        <th scope="col" className="px-6 py-3 flex justify-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {financialSummary.map((info, ind) => {

                                        const client = info.client;

                                        return (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={ind}>
                                                <td className="p-4">
                                                    <div className="flex items-center">
                                                        {ind + 1}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {client ? client.business_name : ''}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {info.period_covered}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {info.email}
                                                </td>
                                                <td className="px-2">
                                                    {new Date(info.created_at).toLocaleDateString('en-US') + " " + new Date(info.created_at).toLocaleTimeString('en-US')}
                                                </td>

                                                <td className="py-4 flex justify-center gap-3">
                                                    <Link to={"../financial-summary/edit/" + info.id}>
                                                        <span className="inline-flex items-center text-white w-1/2 px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm sm:w-auto text-center dark:focus:ring-blue-900">
                                                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                                            Edit
                                                        </span>
                                                    </Link>
                                                    <span onClick={handleDeleteClick} data-row-id={info.id} className="inline-flex items-center text-white hover:cursor-pointer w-1/2 px-3 py-2 bg-red-600 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm sm:w-auto text-center dark:focus:ring-blue-900">
                                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                        Delete
                                                    </span>

                                                    <span
                                                        onClick={handlePublishClick}
                                                        data-row-id={info.id}
                                                        className={`inline-flex items-center text-white hover:cursor-pointer w-1/2 px-3 py-2 ${(info.published && !isLoadingStatus) || publishedStatus[info.id]
                                                            ? 'bg-green-500'
                                                            : 'bg-orange-600'
                                                            } focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm sm:w-auto text-center dark:focus:ring-blue-900`}
                                                    >
                                                        {((info.published && !isLoadingStatus) || publishedStatus[info.id]) && !isLoading ? (
                                                            <div className="mr-2 flex gap-2">
                                                                <img src={publishedSvg} alt="Published" width="15" height="15" />
                                                                <span>Published{info.published}</span>
                                                            </div>
                                                        ) : (
                                                            <div className="mr-2 flex gap-2">
                                                                <img src={unpublishedSvg} alt="Unpublished" width="15" height="15" />
                                                                <span>Published</span>
                                                            </div>
                                                        )}
                                                    </span>


                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    }

                </div>

            </div>
        </>
    )
}

export default FinancialSummary