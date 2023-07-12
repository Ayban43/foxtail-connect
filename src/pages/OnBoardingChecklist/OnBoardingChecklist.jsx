import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../../config/supabaseClient'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { useLocation } from 'react-router-dom';
import Toast from '../../components/UI/Toast'
import BankAccount from './Tabs/BankAccount';
import Options from './Options';
import FileSelector from './FileSelector';
import Selector from './FileSelector';


const OnBoardingChecklist = ({ userData }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [rowIdToDelete, setRowIdToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [userSession, setUserSession] = useState("")
    const [activeTab, setActiveTab] = useState("a");


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
                <div className="p-4 border bg-white min-h-[600px] border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">

                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">On-boarding Checklist</h1>

                    {isLoading ? <LoadingSpinner /> :
                        <div className="border-b mt-5 flex justify-center">
                            <div className="w-full" >
                                <FileSelector userData={userData} />
                            </div>
                        </div>
                    }

                </div>

            </div>
        </>
    )
}

export default OnBoardingChecklist