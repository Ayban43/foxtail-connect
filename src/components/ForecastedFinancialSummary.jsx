import { useState } from "react";
import supabase from "../config/supabaseClient";
import { v4 as uuidv4 } from 'uuid'
import LoadingSpinner from "./LoadingSpinner";

const ForecastedFinancialSummary = ({ forecastedFinancialFileUrl, onFileUpload , forecastedFinancialFileAnalysis, onInputValueChange }) => {

    const [formError, setFormError] = useState(null)
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    async function handleRemoveClick() {
        setLoading(true);
        const { error } = await supabase.storage
            .from('summary_files')
            .remove([forecastedFinancialFileUrl.replace(supabase.storageUrl + "/object/public/summary_files/", '')]);

        if (error) {
            console.error(error);
        } else {
            console.log("success")
            setFile(null);
            onFileUpload(null);
            setLoading(false);
        }
    };

    async function handleFileInputChange(e) {
        setLoading(true);
        console.log("haha", e.target.files)
        const file = e.target.files[0];
        setFile(file);

        const { data, error } = await supabase.storage
            .from('summary_files')
            .upload("forecasted_financial/" + uuidv4(), file, { public: true });

        if (error) {
            console.error(error);
        } else {
            const { data: publicUrlData, error: publicUrlError } = await supabase.storage
                .from('summary_files')
                .getPublicUrl(data.path);
                console.log("data files",data);

            if (publicUrlError) {
                console.error(publicUrlError);
            } else {
                console.log(publicUrlData);
                onFileUpload(publicUrlData.publicUrl);
            }

            setLoading(false);
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
    };

    return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Forecasted Financials</h2>
      
          <div className="mb-4">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const file = e.dataTransfer.files[0];
                setFile(file);
                handleFileInputChange({ target: { files: [file] } });
              }}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {loading ? (
                  <>
                    <LoadingSpinner />
                  </>
                ) : (
                  <>
                    {forecastedFinancialFileUrl ? (
                      <>
                        <img className="max-h-52" src={forecastedFinancialFileUrl} alt="Uploaded File" />
                      </>
                    ) : (
                      <>
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </>
                    )}
                  </>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => handleFileInputChange(e)}
              />
            </label>
      
            {forecastedFinancialFileUrl && (
              <div className="mt-2 flex items-center justify-center">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors focus:outline-none"
                  onClick={handleRemoveClick}
                >
                  Delete File
                </button>
              </div>
            )}
          </div>
      
          <div className="mb-4">
            <label htmlFor="swift-analysis" className="block font-medium mb-2">
              Swift Analysis
            </label>
            <textarea
              id="swift-analysis"
              className="border border-gray-400 rounded w-full p-2"
              rows={4}
              value={forecastedFinancialFileAnalysis}
              onChange={onInputValueChange}
              placeholder="Enter text"
            />
          </div>
        </div>
      );

};

export default ForecastedFinancialSummary
