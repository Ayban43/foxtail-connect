import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../../config/supabaseClient'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { useLocation } from 'react-router-dom';
import Toast from '../../components/UI/Toast'
import BankAccount from './Tabs/BankAccount';
import Options from './Options';


const OnBoardingChecklist = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [rowIdToDelete, setRowIdToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [userSession, setUserSession] = useState("")
    const [activeTab, setActiveTab] = useState("a");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className="p-5 pt-24 h-screen bg-slate-100">
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
                                <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">On-Boarding Checklist</a>
                            </div>
                        </li>
                        {/* <li aria-current="page">
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">List</span>
                            </div>
                        </li> */}
                    </ol>
                </nav>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">

                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">On-boarding Checklist</h1>


                    {isLoading ? <LoadingSpinner /> :
                        <div className="border-b bg-slate-50 mt-5">
                            <div className="flex items-center bg-gray-800 text-white text-sm justify-between">
                                <button
                                    className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "a" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200 ,t"
                                        }`}
                                    onClick={() => handleTabClick("a")}
                                >
                                    Bank Account Statements
                                </button>
                                <button
                                    className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "b" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                        }`}
                                    onClick={() => handleTabClick("b")}
                                >
                                    Credit Card Statements
                                </button>
                                <button
                                    className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "c" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                        }`}
                                    onClick={() => handleTabClick("c")}
                                >
                                    Summary of Sales and Cash/Check Receipts
                                </button>
                                <button
                                    className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "d" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                        }`}
                                    onClick={() => handleTabClick("d")}
                                >
                                    Expense Summary
                                </button>
                                <button
                                    className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "e" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                        }`}
                                    onClick={() => handleTabClick("e")}
                                >
                                    Latest Tax Return
                                </button>
                                <button
                                    className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "f" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                        }`}
                                    onClick={() => handleTabClick("f")}
                                >
                                    Documents Related to Property or Equipment Transactions
                                </button>
                                <button
                                    className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "g" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                        }`}
                                    onClick={() => handleTabClick("g")}
                                >
                                    Summary of Accounts Receivable
                                </button>
                                <button
                                    className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "h" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                        }`}
                                    onClick={() => handleTabClick("h")}
                                >
                                    Summary of Accounts Payable
                                </button>
                                <button
                                    className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "i" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                        }`}
                                    onClick={() => handleTabClick("i")}
                                >
                                    Debt Information
                                </button>
                                <button
                                    className={`px-4 py-2 w-full border-b-4 b border-transparent mt-1 ${activeTab === "j" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                        }`}
                                    onClick={() => handleTabClick("j")}
                                >
                                    Payroll Data
                                </button>
                                <button
                                    className={`px-4 py-2 w-full border-b-4 border-r-1 b border-transparent mt-1 ${activeTab === "k" ? "bg-gray-300 font-bold rounded-t-sm border-b-4 border-orange-400 text-gray-700" : "hover:bg-gray-700 hover:border-b-4 hover:border-orange-200"
                                        }`}
                                    onClick={() => handleTabClick("k")}
                                >
                                    Inventory Report
                                </button>
                            </div>

                            <div className="p-4">
                                {activeTab === "a" && <BankAccount />}
                                {activeTab === "b" && <></>}
                                {activeTab === "c" && <></>}
                                {activeTab === "d-financial" && <></>}
                                {activeTab === "e" && <></>}
                                {activeTab === "f" && <></>}

                            </div>

                            <div className="flex gap-5 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                                <button className="text-white block w-1/2 px-3 py-2 bg-green-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm sm:w-auto text-center dark:focus:ring-blue-900">Save</button>
                            </div>
                        </div>
                    }

                </div>

            </div>
        </>
    )
}

export default OnBoardingChecklist