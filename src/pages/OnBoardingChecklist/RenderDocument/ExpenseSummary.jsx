import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import supabase from '../../../config/supabaseClient';
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as PdfSvg } from '../../../assets/pdf-svg.svg'
import { ReactComponent as XlsSvg } from '../../../assets/xls-svg.svg'
import { ReactComponent as ImgSvg } from '../../../assets/img-svg.svg'
import { ReactComponent as UnknownSvg } from '../../../assets/unknown-svg.svg'
import { ReactComponent as TrashSvg } from '../../../assets/trash-svg.svg'
import Options from '../Options';

const ExpenseSummary = ({ userData }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [documentUrl, setDocumentUrl] = useState(false);
    const [documentFiles, setDocumentFiles] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = async (event) => {
        const selectedOptionValue = event.target.value;
        setSelectedOption(selectedOptionValue);

        const { data, error } = await supabase
            .from('clients')
            .update({ expense_summary: selectedOptionValue })
            .eq('email', userData.email);

        if (error) {
            console.error('Error updating row:', error);
        } else {
            console.log('Row updated successfully:', data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('clients')
                .select('expense_summary')
                .eq('email', userData.email)
                .single();

            if (error) {
                console.error('Error fetching data:', error);
            } else if (data) {
                setSelectedOption(data.expense_summary);
            }
        };

        fetchData();
    }, []);

    async function handleFileInputChange(e) {
        setLoading(true);
        const file = e.target.files[0];
        setFile(file);

        const { data, error } = await supabase.storage
            .from('on_boarding_checklist')
            .upload(userData.email + '/expense_summary/' + file.name, file, { public: true });

        if (error) {
            console.error(error);
        } else {
            setLoading(false);
            fetchFiles();
        }
    }

    useEffect(() => {
        fetchFiles();
    }, []);

    async function fetchFiles() {
        const { data, error } = await supabase.storage
            .from('on_boarding_checklist')
            .list(userData.email + '/expense_summary/');

        if (error) {
            console.error(error);
        } else {
            setDocumentFiles(data);
        }
    }

    // Function to handle file deletion
    const handleDeleteFile = async (fileId, fileN) => {
        try {
            const fileName = `${userData.email}/expense_summary/${fileN}`;
            const { data, error } = await supabase.storage.from('on_boarding_checklist').remove([fileName]);

            if (error) {
                throw new Error(error.message);
            }
            // Remove the deleted file from the documentFiles state
            setDocumentFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
        } catch (error) {
            console.error('Error deleting file:', error.message);
        }
    };

    return (
        <div>
            <div className='p-4'>
                <div className="p-4 bg-orange-100 my-2 rounded-lg">
                    <h1 className="font-bold text-2xl py-2"> Expense Summary </h1>
                    <div className="text-gray-600">
                        (A complete record of all business expense transactions including information such as amount, date, product/service, payee, business use/purpose, etc.)
                    </div>
                </div>
            </div>


            <div className='p-4'>
                <h2 className="text-base font-semibold mb-2">Choose what's applicable:</h2>
                <Options selectedOption={selectedOption} onChange={handleOptionChange} />
            </div>


            <div className="p-4 rounded-lg">
                <label htmlFor="biography" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Upload File: </label>
                <div className="flex items-center justify-center w-full"
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        setFile(file);
                        handleFileInputChange({ target: { files: [file] } });
                    }}>
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full p-5 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"

                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {loading ? (
                                <>
                                    <LoadingSpinner />
                                </>
                            ) : (
                                <>
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
                                            <span className="font-semibold">(One file at a time) Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG , PDF or XLS
                                        </p>
                                    </>
                                </>
                            )}


                        </div>
                        <input onChange={(e) => handleFileInputChange(e)} id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
            </div>

            <div className="p-4">
                <h2 className="text-base font-semibold pb-2">Uploaded Files:</h2>
                {documentFiles?.length === 0 ? (
                    <p>No files uploaded yet.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-w-0">
                        {documentFiles?.map((file) => (

                            <li
                                key={file.id}
                                className="transition ease-in-out delay-75 grid grid-rows-6 px-4 pb-4 pt-2 max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 cursor-pointer"
                            >
                                <div className="grid grid-cols-9 justify-center gap-2 p-1 text-base font-semibold tracking-tight text-gray-900 dark:text-white min-w-0">

                                    {file?.name.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
                                        <ImgSvg width={20} height={20} />
                                    ) : file?.name.endsWith('.pdf') ? (
                                        <PdfSvg width={20} height={20} />
                                    ) : file?.name.endsWith('.xls') || file?.name.endsWith('.xlsx') ? (
                                        <XlsSvg width={20} height={20} />
                                    ) : (
                                        <UnknownSvg width={20} height={20} />
                                    )}

                                    <p className='line-clamp-1 place-content-start col-span-7'>{file?.name}</p>

                                    <span
                                        className=" text-red-500 hover:text-red-700 justify-self-end transition ease-in-out delay-75 cursor-pointer hover:scale-110"
                                        onClick={() => handleDeleteFile(file.id, file.name)}
                                    >
                                        <TrashSvg width={20} height={20} />
                                    </span>

                                </div>
                                <div className="flex justify-center items-center w-full bg-white row-span-5 rounded-lg"
                                    onClick={() => {
                                        const fileUrl = `https://jpmefbzznkiwbnscdrvn.supabase.co/storage/v1/object/public/on_boarding_checklist/${userData.email}/expense_summary/${file.name}`;
                                        window.open(fileUrl, '_blank');
                                    }}
                                >
                                    {file?.name.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
                                        <img
                                            className="max-h-52"
                                            src={`https://jpmefbzznkiwbnscdrvn.supabase.co/storage/v1/object/public/on_boarding_checklist/${userData.email + "/expense_summary/" + file.name}`}
                                            alt={file.name}
                                        />
                                    ) : file?.name.endsWith('.pdf') ? (
                                        <PdfSvg />
                                    ) : file?.name.endsWith('.xls') || file?.name.endsWith('.xlsx') ? (
                                        <XlsSvg />
                                    ) : (
                                        <UnknownSvg />
                                    )}

                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>


        </div >
    )
}

export default ExpenseSummary