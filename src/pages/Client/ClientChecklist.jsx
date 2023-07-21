import React, { useState, useEffect } from 'react'
import supabase from '../../config/supabaseClient'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import Toast from '../../components/UI/Toast'
import Select from 'react-select';
import FileSelector from './FileSelector'
import { ReactComponent as PdfSvg } from '../../assets/pdf-svg.svg'
import { ReactComponent as XlsSvg } from '../../assets/xls-svg.svg'
import { ReactComponent as ImgSvg } from '../../assets/img-svg.svg'
import { ReactComponent as UnknownSvg } from '../../assets/unknown-svg.svg'
import { ReactComponent as DownloadSvg } from '../../assets/download-svg.svg'


const ClientChecklist = ({ isAdmin }) => {
    const [formError, setFormError] = useState(null)
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [client, setClient] = useState('');
    const [receivedOptions, setReceivedOptions] = useState([]);
    const [documentFiles, setDocumentFiles] = useState([]);


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const added = queryParams.get('added');
    const { id } = useParams();

    const handleSelectedOptions = (selectedOptions) => {
        setReceivedOptions(selectedOptions);
    };


    useEffect(() => {
        const fetchClient = async () => {
            setIsLoading(true);

            const { data: { session } } = await supabase.auth.getSession();

            if (session && isAdmin === true) {
                const { user } = session;
                // setUserSession(user);

                if (user) {
                    const loggedInUserEmail = user.email;

                    const { data: client, error: clientError } = await supabase
                        .from('clients')
                        .select()
                        .eq('id', id)
                        .single();

                    if (clientError) {
                        //setFinancialSummary(null);
                        console.log(clientError);
                        setIsLoading(false);
                        return;
                    }

                    if (client) {
                        setClient(client);
                        setIsLoading(false);
                    }
                }
            }
        };

        fetchClient();
    }, []);


    const clientEmail = client.email;

    const fetchFiles = async (dbName) => {
        const bucketName = 'on_boarding_checklist';
        const { data, error } = await supabase.storage.from(bucketName).list(`${clientEmail}/${dbName}/`);
        if (error) {
            console.error(error);
            return [];
        } else {
            return data;
        }
    };

    // useEffect(() => {
    //     async function fetchAllFiles() {
    //         if (receivedOptions.length === 0) {
    //             return; // No receivedOptions selected, nothing to fetch
    //         }

    //         try {
    //             const promises = receivedOptions.map((option) => fetchFiles(option.dbName));
    //             const results = await Promise.all(promises);

    //             // Merge all the results into a single array
    //             const allFiles = results.reduce((accumulator, currentValue) => {
    //                 return [...accumulator, ...currentValue];
    //             }, []);

    //             console.log(allFiles);
    //             setDocumentFiles(allFiles)
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }

    //     fetchAllFiles();
    // }, [receivedOptions, clientEmail, supabase]);

    useEffect(() => {
        async function fetchAllFiles() {
            if (receivedOptions.length === 0) {
                return; // No receivedOptions selected, nothing to fetch
            }

            try {
                const promises = receivedOptions.map(async (option) => {
                    const files = await fetchFiles(option.dbName);

                    // Add dbName property to each file
                    const filesWithDbName = files.map((file) => ({
                        ...file,
                        dbName: option.dbName,
                    }));

                    return filesWithDbName;
                });

                const results = await Promise.all(promises);

                // Merge all the results into a single array
                const allFiles = results.reduce((accumulator, currentValue) => {
                    return [...accumulator, ...currentValue];
                }, []);

                console.log(allFiles);
                setDocumentFiles(allFiles);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAllFiles();
    }, [receivedOptions, clientEmail, supabase]);

    // Function to handle file download
    const handleFileDownload = async (file) => {
        try {
            const { data, error } = await supabase
                .storage
                .from('on_boarding_checklist')
                .download(`${clientEmail}/${file.dbName}/${file.name}`);

            if (error) {
                console.error('Error downloading file:', error);
                return;
            }

            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.download = file.name; // Set the filename for download
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };


    console.log(documentFiles)


    return (
        <>
            <div className="p-5 pt-24 h-screen bg-slate-100">
                <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                <Link to="../client" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Clients
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">On-boarding Checklist</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {isLoading ?
                    <LoadingSpinner />
                    :
                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <div className="relative w-full h-full px-4 md:h-auto">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                                <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                                    <h3 className="text-xl font-semibold dark:text-white">
                                        {client.business_name}'s on-boarding checklist
                                    </h3>
                                </div>
                                <>
                                    <div className="p-6 space-y-6">
                                        <FileSelector isAdmin={isAdmin} onSelectOptions={handleSelectedOptions} />
                                        {documentFiles ?
                                            <div>
                                                Uploaded file/s:
                                            </div>
                                            :
                                            <div>
                                                No File u
                                            </div>
                                        }
                                        <hr></hr>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-w-0">
                                            {documentFiles?.map((file) => (

                                                <li
                                                    key={file.id}
                                                    className="transition ease-in-out delay-75 grid grid-rows-6 px-4 pb-4 pt-2 max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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

                                                        <div
                                                            className="flex items-center justify-center transition ease-in-out delay-75 cursor-pointer hover:scale-125"
                                                            onClick={() => handleFileDownload(file)} // Add the click handler to download the file
                                                        >
                                                            <DownloadSvg width={20} height={20} /> {/* Replace with your own download icon */}
                                                        </div>

                                                    </div>
                                                    <div className="flex justify-center items-center w-full bg-white row-span-5 rounded-lg transition-all ease-in delay-75 hover:cursor-pointer hover:scale-105"
                                                        onClick={() => {
                                                            const fileUrl = `https://jpmefbzznkiwbnscdrvn.supabase.co/storage/v1/object/public/on_boarding_checklist/${client.email}/${file.dbName}/${file.name}`;
                                                            window.open(fileUrl, '_blank');
                                                        }}
                                                    >
                                                        {file?.name.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
                                                            <img
                                                                className="max-h-52"
                                                                src={`https://jpmefbzznkiwbnscdrvn.supabase.co/storage/v1/object/public/on_boarding_checklist/${client.email + '/' + file.dbName + '/' + file.name}`}
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
                                    </div>
                                </>


                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default ClientChecklist