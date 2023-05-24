import { useState } from "react";

const ExecutiveSummary = ({ executiveAnalysis, keepAnEyeOn, strategicOpportunities, onInputValueExecutiveChange, onInputValueKeepAnEyeOnChange, onInputValueStrategicOpportunitiesChange }) => {

    const [loading, setLoading] = useState(false);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>

            <div className="mb-4">
                <label htmlFor="swift-analysis" className="block font-medium mb-2">
                    Analysis
                </label>
                <textarea
                    id="swift-analysis"
                    className="border border-gray-400 rounded w-full p-2"
                    rows={4}
                    value={executiveAnalysis}
                    onChange={onInputValueExecutiveChange}
                    placeholder="Enter text"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="swift-analysis" className="block font-medium mb-2">
                    Keep an Eye On
                </label>
                <textarea
                    id="swift-analysis"
                    className="border border-gray-400 rounded w-full p-2"
                    rows={4}
                    value={keepAnEyeOn}
                    onChange={onInputValueKeepAnEyeOnChange}
                    placeholder="Enter text"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="swift-analysis" className="block font-medium mb-2">
                    Strategic Opportunities
                </label>
                <textarea
                    id="swift-analysis"
                    className="border border-gray-400 rounded w-full p-2"
                    rows={4}
                    value={strategicOpportunities}
                    onChange={onInputValueStrategicOpportunitiesChange}
                    placeholder="Enter text"
                />
            </div>
        </div>
    );

};

export default ExecutiveSummary
