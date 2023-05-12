import { useState , useEffect } from "react";
import supabase from "../config/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import LoadingSpinner from "./LoadingSpinner";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CashFlowSummary = ({
  cashFlowFileUrl,
  onFileUpload,
  cashFlowFileAnalysis,
  onInputValueChange,
}) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(null);

  async function handleRemoveClick() {
    setLoading(true);
    const { error } = await supabase.storage
      .from("summary_files")
      .remove([cashFlowFileUrl.replace(supabase.storageUrl + "/object/public/summary_files/", "")]);

    if (error) {
      console.error(error);
    } else {
      console.log("success");
      setFile(null);
      onFileUpload(null);
      setLoading(false);
    }
  }

  async function handleFileInputChange(e) {
    setLoading(true);
    const file = e.target.files[0];
    if (file.type !== "application/pdf") {
      console.log("Please select a PDF file");
      setLoading(false);
      return;
    }
    setFile(file);

    const { data, error } = await supabase.storage
      .from("summary_files")
      .upload("cash_flow/" + uuidv4(), file, { public: true });

    if (error) {
      console.error(error);
    } else {
      const { data: publicUrlData, error: publicUrlError } = await supabase.storage
        .from("summary_files")
        .getPublicUrl(data.path);
      console.log("data files", data);

      if (publicUrlError) {
        console.error(publicUrlError);
      } else {
        console.log(publicUrlData);
        onFileUpload(publicUrlData.publicUrl);
      }
    }
  }

  useEffect(() => {
    if (cashFlowFileUrl) {
      const getNumPages = async () => {
        try {
          const pdf = await fetch(cashFlowFileUrl);
          const pdfBlob = await pdf.blob();
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const pdfDocument = await pdfjs.getDocument(pdfUrl).promise;
          setNumPages(pdfDocument.numPages);
        } catch (error) {
          console.error("Failed to load PDF", error);
        } finally {
          setLoading(false);
        }
      };

      getNumPages();
    }
  }, [cashFlowFileUrl]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Statement of Cash Flows</h2>

      <div
        className="mb-4"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          setFile(file);
          handleFileInputChange({ target: { files: [file] } });
        }}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full p-5 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDragEnter={(e) => {
            e.preventDefault();
          }}
          onDragLeave={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            setFile(file);
            handleFileInputChange({ target: { files: [file] } });
          }}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {cashFlowFileUrl ? (
                <>
                  <div className="pdf-preview flex">
                    <Document
                      file={cashFlowFileUrl}
                      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                      className={"flex"}
                    >
                      {Array.from(new Array(numPages), (el, index) => (
                        <Page
                          key={index}
                          pageNumber={index + 1}
                          width={400}
                          renderTextLayer={false}
                        />
                      ))}
                    </Document>
                  </div>
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
                  <p className="text-xs text-gray-500 dark:text-gray-400">PDF File Only</p>
                </>
              )}
            </>
          )}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => handleFileInputChange(e)}
          />
        </label>

        {cashFlowFileUrl && (
          <div className="mt-2 flex items-center justify-center">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors focus:outline-none"
              onClick={handleRemoveClick}
              disabled={loading}
            >
              {loading ? "Loading File..." : "Delete File"}
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
          value={cashFlowFileAnalysis}
          onChange={onInputValueChange}
          placeholder="Enter text"
        />
      </div>
    </div>
  );
};

export default CashFlowSummary;

