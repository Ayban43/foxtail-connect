import React, { useState, useEffect } from 'react'
import supabase from '../../config/supabaseClient'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import Toast from '../../components/UI/Toast'


const Edit = () => {
    const [businessName, setBusinessName] = useState('')
    const [contactName, setContactName] = useState('')
    const [email, setEmail] = useState('')
    const [formError, setFormError] = useState(null)
    const [file, setFile] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shouldSubmitForm, setShouldSubmitForm] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const added = queryParams.get('added');
    const { id } = useParams();

    useEffect(() => {
        const fetchClient = async () => {
            setIsLoading(true);

            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session) {
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
                        console.log(client)
                        setBusinessName(client.business_name)
                        setContactName(client.contact_name)
                        setEmail(client.email)
                        setLogoUrl(client.logoUrl)
                        setIsLoading(false);
                    }
                }
            }
        };

        fetchClient();
    }, []);

    const handleSubmit = async (e) => {
        const client = {
            business_name: businessName,
            contact_name: contactName,
            email: email,
            logoUrl: logoUrl,
        };

        try {
            const { data, error } = await supabase
                .from('clients')
                .update(client)
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error inserting client:', error);
            } else {
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
                localStorage.setItem('formSubmitted', 'true');
            }
        } catch (error) {
            console.error('Error during insertion:', error);
        }
    };

    async function handleFileInputChange(e) {
        setLoading(true);
        const file = e.target.files[0];
        setFile(file);

        // Remove the current image from the database and Supabase bucket
        if (logoUrl) {
            try {

                const filename = logoUrl.substring(logoUrl.lastIndexOf('/') + 1);

                const { data, error } = await supabase
                    .storage
                    .from('images')
                    .remove(['company_logo/' + filename]);

                if (error) {
                    console.error('Error removing item:', error);
                    // Handle the error appropriately
                } else {
                    console.log('Item removed successfully');
                    // Handle the successful removal
                }
            } catch (error) {
                console.error('Error occurred:', error);
                // Handle any unexpected errors
            }
        }

        const { data, error } = await supabase.storage
            .from('images')
            .upload("company_logo/" + uuidv4(), file, { public: true });

        if (error) {
            console.error(error);
        } else {
            const { data: publicUrlData, error: publicUrlError } = await supabase.storage
                .from('images')
                .getPublicUrl(data.path);

            if (publicUrlError) {
                console.error(publicUrlError);
            } else {
                console.log(publicUrlData);
                setLogoUrl(publicUrlData.publicUrl);
                setLoading(false);
            }
            setLoading(false);
        }
        setShouldSubmitForm(true);
    }

    useEffect(() => {
        const isFormSubmitted = localStorage.getItem('formSubmitted');

        if (isFormSubmitted) {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                localStorage.removeItem('formSubmitted');
            }, 3000);
        }
    }, []);

    useEffect(() => {
        if (shouldSubmitForm) {
            handleSubmit();
            setShouldSubmitForm(false);
        }
    }, [shouldSubmitForm]);

    return (
        <>
            <div className="p-5 pt-24 h-screen bg-slate-100">
                {showToast && <Toast message="Changes has been saved!" />}
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
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Edit</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <div className="relative w-full h-full px-4 md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                            <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                                <h3 className="text-xl font-semibold dark:text-white">
                                    Edit Client
                                </h3>
                            </div>
                            {isLoading ?
                                <LoadingSpinner />
                                :
                                <>
                                    <div className="p-6 space-y-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-6">
                                                <label htmlFor="business-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business Name</label>
                                                <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} id="business-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                                                    {/* <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none" placeholder=" " required /> */}
                                                </input>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="contact-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business Contact Name</label>
                                                <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} id="contact-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>

                                                </input>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email <span className="text-xs text-gray-400">(Cannot be edited)<span /></span></label>
                                                <input disabled type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                                                </input>
                                            </div>
                                            <div className="col-span-6">
                                                <label htmlFor="biography" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Logo</label>
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
                                                        onDragEnter={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                        onDragLeave={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                    // onDrop={(e) => {
                                                    //     e.preventDefault();
                                                    //     const file = e.dataTransfer.files[0];
                                                    //     setFile(file);
                                                    //     handleFileInputChange({ target: { files: [file] } });
                                                    // }}
                                                    >
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            {loading ? (
                                                                <>
                                                                    <LoadingSpinner />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {logoUrl ? (
                                                                        <img className="max-h-52" src={logoUrl} alt="Company logo" />
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
                                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                                            </p>
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}


                                                        </div>
                                                        <input onChange={handleFileInputChange} id="dropzone-file" type="file" className="hidden" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                                        <button onClick={handleSubmit} className="text-white block w-1/2 px-3 disabled:bg-gray-400 py-2 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm sm:w-auto text-center dark:focus:ring-blue-900">Save Changes</button>
                                    </div>
                                </>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit