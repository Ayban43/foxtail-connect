import React, { useState, useEffect } from 'react'
import { getClients } from '../queries/getClients'
import SelectInput from '../components/SelectInput';
import Selector from '../components/Selector';
import supabase from '../config/supabaseClient';
import Frequency from '../components/Frequency';
import PeriodCovered from '../components/PeriodCovered';
import YearPicker from '../components/YearPicker';
import MonthPicker from '../components/MonthPicker';
import QuarterPicker from '../components/QuarterPicker';
import Tab from '../components/Tab';


const AddFinancialSummary = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [frequency, setFrequency] = useState('');
    const [selectedAnnual, setSelectedAnnual] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState('');
    const [periodCovered, setPeriodCovered] = useState('');
    const [selectedQuarter, setSelectedQuarter] = useState('');
    const [selectedQuarterYear, setSelectedQuarterYear] = useState('');

    const handleClientSelect = (clientEmail) => {
        setSelectedClient(clientEmail);
    };

    async function addFormDataToSupabase(formData) {
        try {
            // Insert a new record into the "forms" table
            const { data, error } = await supabase.from('financial_summary').insert(formData);

            if (error) {
                throw error;
            }

            console.log('New record added to Supabase:', data);
        } catch (error) {
            console.error('Error adding record to Supabase:', error.message);
        }
    }


    function handleSubmit(event) {
        event.preventDefault();

        // Create a new object with the form data
        const formData = {
            email: selectedClient.email,
            period_covered: periodCovered
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
        if (frequency === "annually") {
            setPeriodCovered(selectedAnnual);
        } else if (frequency === "monthly") {
            const monthlyText = selectedMonth + ", " + selectedYear;
            setPeriodCovered(monthlyText);
        } else if (frequency === "quarterly") {
            const quarterText = selectedQuarter + ", " + selectedQuarterYear
            setPeriodCovered(quarterText)
        }
    }, [frequency, selectedAnnual, selectedMonth, selectedYear, selectedQuarter, selectedQuarterYear]);


    console.log(selectedQuarter, selectedQuarterYear)

    return (
        <>
            <div className="ml-64 p-5 pt-24 bg-slate-100">
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
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Add</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="relative w-full h-full px-4 md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                            <form onSubmit={handleSubmit}>
                                <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                                    <h3 className="text-xl font-semibold dark:text-white">
                                        Add Financial Summary
                                    </h3>
                                </div>

                                <div className="p-6 space-y-6">

                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-6">
                                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client</label>
                                            <Selector clients={clients} onClientSelect={handleClientSelect} />
                                        </div>

                                        <div className="display flex gap-5 col-span-6 sm:col-span-6">

                                            <div className="w-full p-5">
                                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Report Frequency</label>
                                                <Frequency onChange={(e) => setFrequency(e.target.value)} />
                                            </div>

                                            <div className="w-full p-5 bg-slate-100 rounded-lg">
                                                {frequency === 'annually' && (
                                                    <div className="">
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Period Covered:</label>
                                                        <YearPicker defaultYear={selectedAnnual} onChange={handleAnnualChange} />
                                                    </div>
                                                )}

                                                {frequency === 'quarterly' && (
                                                    <div className="">
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Period Covered:</label>
                                                        <QuarterPicker onChange={handleQuarterChange} />
                                                    </div>
                                                )}

                                                {frequency === 'monthly' && (
                                                    <div className="">
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Period Covered:</label>
                                                        <MonthPicker
                                                            defaultYear={selectedYear}
                                                            defaultMonth={selectedMonth}
                                                            onChange={handleMonthChange}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                    </div>

                                    <div className="relative w-full">
                                        <Tab tabTitle="Tab 1" />
                                        <Tab tabTitle="Tab 2" />
                                        <Tab tabTitle="Tab 3" />
                                        <Tab tabTitle="Tab 4" />
                                        <Tab tabTitle="Tab 5" />

                                        {/* <ul class="flex border-b border-gray-200 text-center">
                                            <li class="flex-1">
                                                <a className="relative block border-t border-l border-r border-gray-200 bg-white p-4 text-sm font-medium" href="" >
                                                    <span class="absolute inset-x-0 -bottom-px h-px w-full bg-white"></span>
                                                    Settings
                                                </a>
                                            </li>
 
                                            <li class="flex-1">
                                                <a className="relative block border-t border-l border-r border-gray-200 bg-white p-4 text-sm font-medium" href="" >
                                                    <span class="absolute inset-x-0 -bottom-px h-px w-full bg-white"></span>
                                                    Settings
                                                </a>
                                            </li>

                                            <li class="flex-1">
                                                <a className="relative block border-t border-l border-r border-gray-200 bg-white p-4 text-sm font-medium" href="" >
                                                    <span class="absolute inset-x-0 -bottom-px h-px w-full bg-white"></span>
                                                    Settings
                                                </a>
                                            </li>

                                            <li class="flex-1">
                                                <a className="relative block border-t border-l border-r border-gray-200 bg-white p-4 text-sm font-medium" href="" >
                                                    <span class="absolute inset-x-0 -bottom-px h-px w-full bg-white"></span>
                                                    Settings
                                                </a>
                                            </li>
                                        </ul> */}
                                    </div>

                                    {/* <div className="bg-slate-100 col-span-6 sm:col-span-2 border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                                        <div className="pb-2">
                                            <h3 className="text-xl font-normal text-gray-700 dark:text-white w-full border-b border-b-black">
                                                Profit & Loss Statement
                                            </h3>
                                        </div>

                                        <div className="pb-2">
                                            <label htmlFor="biography" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload File</label>
                                            <div className="flex items-center justify-center w-full">
                                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400"> PDF , PNG, JPG </p>
                                                    </div>
                                                    <input id="dropzone-file" type="file" className="hidden" />
                                                </label>
                                            </div>
                                        </div>

                                        <div className="pb-2">
                                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Swift Analysis</label>
                                            <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter text..."></textarea>
                                        </div>
                                    </div> */}
                                </div>

                                <div className="flex gap-5 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                                    <button className="text-white block w-1/2 px-3 py-2 bg-orange-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm sm:w-auto text-center dark:focus:ring-blue-900">Preview</button>
                                    <button className="text-white block w-1/2 px-3 py-2 bg-green-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm sm:w-auto text-center dark:focus:ring-blue-900">Publish</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddFinancialSummary