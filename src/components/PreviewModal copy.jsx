import React from 'react'
import footerLogo from "../footerLogo.png"

const PreviewModal = (props) => {

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
                            <hr className="my-5 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                            <div className="flex justify-center">
                                <span className="font-medium text-2xl">{props.clientName} {capitalizeFirst(props.frequency)} Financial Report </span>
                            </div>
                            <div className="flex justify-center">
                                <span className="font-normal text-xl">{props.periodCovered}</span>
                            </div>
                            <hr className="my-5 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                        </div>

                        <div className="flex justify-start items-end">
                            <img className="w-20" src={footerLogo}></img>
                        </div>
                    </div>

                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col  border-b-slate-700 border-4">
                        <h2 className="text-xl font-semibold">Table of Contents</h2>
                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                        <div className="section flex-1 mt-2 font-sans">
                            <p className="tracking-wide text-sm">
                                We, at Foxtail Financial LLC, want to extend our heartfelt congratulations to you on your commitment to
                                achieving financial health and success. Your dedication and perseverance have led to significant strides in
                                your business’s journey and we are proud to be a part of your team as you continue to grow.
                                <br></br>
                                <br></br>
                                As you delve into this financial report, we encourage you to keep an open mind, ask questions, and consider
                                the insights and recommendations provided herein. Together, we can work towards achieving your objectives
                                and securing a brighter future.

                            </p>
                            <br></br>
                            <div className="grid gap-1 mb-10">
                                <span className="text-sm">Warm regards, </span>
                                <span className="font-semibold text-3xl">Zack Goldglantz </span>
                                <span className="">CEO, Foxtail Financial LLC </span>
                            </div>

                            <div className="grid gap-1 text-lg font-medium">
                                <span>p. 3 <span className="ml-2">Profit &amp; Loss Statement</span></span>
                                <span>p. 4 <span className="ml-2">Balance Sheet</span></span>
                                <span>p. 5 <span className="ml-2">Statement of Cash Flows</span></span>
                                <span>p. 6 <span className="ml-2">KPI Display</span></span>
                                <span>p. 7 <span className="ml-2">Forecasted Financials</span></span>
                                <span>p. 8 <span className="ml-2">Executive Summary</span></span>
                                <span>p. 9 <span className="ml-2">Additional Resources</span></span>
                            </div>
                        </div>
                        <hr className="my-5 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                        <div className="flex justify-start items-end">
                            <img className="w-20" src={footerLogo}></img>
                        </div>
                    </div>

                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col  border-b-slate-700 border-4">
                        <h2 className="text-xl font-semibold">Profit & Loss Statement</h2>
                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                        <div className="section flex-1 mt-2 font-sans flex justify-center">
                            <img className="max-h-[700px]" src={props.profitLossUrl}>
                            </img>
                        </div>
                        <div className="section mt-2 font-sans flex-1 justify-start">
                            <span className="font-medium ">Swift Analysis</span>

                            <p className="bg-slate-50 p-2 max-h-[150px] overflow-y-auto">
                                {props.profitLossAnalysis}
                            </p>

                        </div>
                        <hr className="my-5 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                        <div className="flex justify-start items-end">
                            <img className="w-20" src={footerLogo}></img>
                        </div>
                    </div>


                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col  border-b-slate-700 border-4">
                        <h2 className="text-xl font-semibold">Balance Sheet</h2>
                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                        <div className="section flex-1 mt-2 font-sans flex justify-center">
                            <img className="max-h-[700px]" src={props.balanceSheetFileUrl}>
                            </img>
                        </div>
                        <div className="section mt-2 font-sans flex-1 justify-start">
                            <span className="font-medium ">Swift Analysis</span>

                            <p className="bg-slate-50 p-2 max-h-[150px] overflow-y-auto">
                                {props.balanceSheetAnalysis}
                            </p>

                        </div>
                        <hr className="my-5 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                        <div className="flex justify-start items-end">
                            <img className="w-20" src={footerLogo}></img>
                        </div>
                    </div>

                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col  border-b-slate-700 border-4">
                        <h2 className="text-xl font-semibold">Statement of Cash Flows</h2>
                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                        <div className="section flex-1 mt-2 font-sans flex justify-center">
                            <img className="max-h-[700px]" src={props.cashFlowFileUrl}>
                            </img>
                        </div>
                        <div className="section mt-2 font-sans flex-1 justify-start">
                            <span className="font-medium ">Swift Analysis</span>

                            <p className="bg-slate-50 p-2 max-h-[150px] overflow-y-auto">
                                {props.cashFlowAnalysis}
                            </p>

                        </div>
                        <hr className="my-5 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                        <div className="flex justify-start items-end">
                            <img className="w-20" src={footerLogo}></img>
                        </div>
                    </div>

                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col justify-betwee  border-b-slate-700 border-4">
                        <h2 className="text-xl font-semibold">Forecasted Financials</h2>
                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                        <div className="section flex-1 mt-2 font-sans flex justify-center">
                            <img className="max-h-[700px]" src={props.forecastedFinancialFileUrl}>
                            </img>
                        </div>
                        <div className="section mt-2 font-sans flex-1 justify-start">
                            <span className="font-medium ">Swift Analysis</span>

                            <p className="bg-slate-50 p-2 max-h-[150px] overflow-y-auto">
                                {props.forecastedFinancialAnalysis}
                            </p>

                        </div>
                        <hr className="my-5 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                        <div className="flex justify-start items-end">
                            <img className="w-20" src={footerLogo}></img>
                        </div>
                    </div>

                    <div className="page h-[297mm] w-[210mm] p-6 flex flex-col justify-betwee  border-b-slate-700 border-4">
                        <h2 className="text-xl font-semibold">Executive Summary</h2>
                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                        <div className="section mt-10 font-sans flex-1 justify-start">
                            <span className="font-medium ">Analysis</span>

                            <p className="bg-slate-50 p-2 max-h-[150px] overflow-y-auto">
                                {props.executiveAnalysis}
                            </p>

                        </div>
                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                        <div className="section mt-2 font-sans flex-1 justify-start">
                            <span className="font-medium ">Keep An Eye On</span>

                            <p className="bg-slate-50 p-2 max-h-[150px] overflow-y-auto">
                                {props.keepAnEyeOn}
                            </p>

                        </div>
                        <hr className="h-0.5 border-t-0 bg-neutral-700 opacity-100 dark:opacity-50" />
                        <div className="section mt-2 font-sans flex-1 justify-start">
                            <span className="font-medium ">Strategic Opportunities</span>

                            <p className="bg-slate-50 p-2 max-h-[150px] overflow-y-auto">
                                {props.strategicOpportunities}
                            </p>

                        </div>
                        <hr className="my-5 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
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
                        <hr className="my-5 h-0.5 border-t-0 mx-5 bg-neutral-300 opacity-100 dark:opacity-50" />
                        <div className="flex justify-start items-end">
                            <img className="w-20" src={footerLogo}></img>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default PreviewModal