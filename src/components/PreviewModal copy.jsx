import React from 'react'

const PreviewModal = (props) => {

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 transition-opacity bg-gray-500 opacity-75"></div>
                <div className="z-10 bg-white min-w-[700px] max-w-[700px] h-128 flex flex-col rounded-lg shadow-xl">
                    <div className="p-6 flex justify-center items-center">
                        <h2 className="text-xl font-semibold mb-4"></h2>
                        <div className="flex items-center justify-center bg-slate-200 rounded-full w-96 h-96">
                            <img src={props.clientLogo} alt="company logo"></img>
                        </div>
                    </div>
                    <hr className="my-5 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                    <div className="flex items-center justify-center">
                        <span className="font-medium text-2xl">{props.clientName} {capitalizeFirst(props.frequency)} Financial Report </span>
                    </div>
                    <div className="flex items-center justify-center">
                        <span className="font-normal text-xl">{props.periodCovered}</span>
                    </div>
                    <hr className="my-5 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                    <div className="h-[calc(100%-7rem)]">
                        <div className="p-4 flex-wrap">
                            Table of Contents
                            We, at Foxtail Financial LLC, want to extend our heartfelt congratulations to you on your commitment to
                            achieving financial health and success. Your dedication and perseverance have led to significant strides in
                            your business’s journey and we are proud to be a part of your team as you continue to grow.
                            As you delve into this financial report, we encourage you to keep an open mind, ask questions, and consider
                            the insights and recommendations provided herein. Together, we can work towards achieving your objectives
                            and securing a brighter future.
                            Warm regards,
                            Zack Goldglantz
                            Zack Goldglantz
                            CEO, Foxtail Financial LLC

                            p. 3 Profit &amp; Loss Statement
                            p. 4 Balance Sheet
                            p. 5 Statement of Cash Flows
                            p. 6 KPI Display
                            p. 7 Forecasted Financials
                            p. 8 Executive Summary
                            p. 9 Additional Resources
                        </div>
                        <div className="p-4">
                            {/* Page 2 content here */}
                            Table of Contents
                            We, at Foxtail Financial LLC, want to extend our heartfelt congratulations to you on your commitment to
                            achieving financial health and success. Your dedication and perseverance have led to significant strides in
                            your business’s journey and we are proud to be a part of your team as you continue to grow.
                            As you delve into this financial report, we encourage you to keep an open mind, ask questions, and consider
                            the insights and recommendations provided herein. Together, we can work towards achieving your objectives
                            and securing a brighter future.
                            Warm regards,
                            Zack Goldglantz
                            Zack Goldglantz
                            CEO, Foxtail Financial LLC

                            p. 3 Profit &amp; Loss Statement
                            p. 4 Balance Sheet
                            p. 5 Statement of Cash Flows
                            p. 6 KPI Display
                            p. 7 Forecasted Financials
                            p. 8 Executive Summary
                            p. 9 Additional Resources
                        </div>
                        {/* Add more pages as needed */}
                    </div>
                    <div className="p-4 flex justify-end">
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>





    );
}

export default PreviewModal