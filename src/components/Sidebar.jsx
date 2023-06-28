import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from "../assets/logo.png"
import profile from "../assets/profile.png"
import supabase from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import SidebarCloseButton from './UI/SidebarCloseButton';
import SidebarOpenButton from './UI/SidebarOpenButton';


const Sidebar = ({ setToken, isAdmin, toggleSidebar, isSidebarVisible }) => {
  const [showMenuDropDown, setShowMenuDropDown] = useState(false);
  // const [sidebarVisible, setSidebarVisible] = useState(true); // State variable for sidebar visibility

  const toggleDropdown = () => {
    setShowMenuDropDown(!showMenuDropDown);
  };

  const navigate = useNavigate()

  async function handleSignOut(e) {
    e.preventDefault()

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      navigate('/')
    } catch (error) {
      alert(error)
    } finally {

    }
  }


  return (
    <>
      <nav className="pt-3 fixed top-0 h-20 z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h1>{isAdmin}</h1>
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start align-middle">
              <a href="#" className="flex ml-2 mr-2">
                <img src={logo} className="h-8 mr-3" alt="Foxtail Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white text-gray-700">Foxtail Connect</span>
              </a>
              <span
                onClick={toggleSidebar}
                className="text-gray-500 transition duration-200 cursor-pointer hover:opacity-60 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {isSidebarVisible ? <SidebarCloseButton /> : <SidebarOpenButton />}
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button onClick={toggleDropdown} type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src={profile} alt="user photo"></img>
                  </button>
                  {showMenuDropDown &&

                    <div className="z-50 absolute right-0 mt-2 w-56 origin-top-right text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                      <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">Foxtail Financial</span>

                      </div>
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <Link to="../edit-profile">
                          <li className="divide-y divide-gray-100 rounded-lg">
                            <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit Profile</span>
                          </li>
                        </Link>
                        <li>
                          <span onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white hover:cursor-pointer">Sign out</span>
                        </li>
                      </ul>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>


      {isAdmin ?
        isSidebarVisible && (
          <aside id="sidebar" className={`
          fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-500 lg:flex transition-width
          ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}
        `} aria-label="Sidebar">
            <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  <nav>
                    <ul className="pb-2 space-y-2">
                      <li>
                        <NavLink
                          exact={true.toString()}
                          to="/"
                          className={({ isActive }) =>
                            "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-orange-100 group dark:text-gray-200 dark:hover:bg-gray-700" + (isActive ? "text-blue-700 font-semibold bg-orange-200" : "")
                          }
                        >
                          <svg className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                          <span className="ml-3">Dashboard</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          exact={true.toString()}
                          to="/client"
                          className={({ isActive }) =>
                            "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-orange-100 group dark:text-gray-200 dark:hover:bg-gray-700" + (isActive ? "text-blue-700 font-semibold bg-orange-200" : "")
                          }
                        >
                          <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                          <span className="ml-3">Clients</span>
                        </NavLink>
                      </li >
                      <li>
                        <NavLink
                          exact={true.toString()}
                          to="/financial-summary"
                          className={({ isActive }) =>
                            "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-orange-100 group dark:text-gray-200 dark:hover:bg-gray-700" + (isActive ? "text-blue-700 font-semibold bg-orange-200" : "")
                          }
                        >
                          <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                          <span className="ml-3">Financial Summary</span>
                        </NavLink>
                      </li >
                      <li>
                        <Link to="#" className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ">
                          <svg className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span className="ml-3">Settings</span>
                        </Link>
                      </li >
                    </ul >
                    <div className="pt-2 space-y-2">
                      <a href="#" className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
                        <span className="ml-3">KPI Database</span>
                      </a>
                      <a href="#" className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                        <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                        <span className="ml-3">TBA</span>
                      </a>
                      <a href="#" className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                        <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                        <span className="ml-3">TBA</span>
                      </a>
                      <a href="#" className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                        <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"></path></svg>
                        <span className="ml-3">TBA</span>
                      </a>
                    </div>
                  </nav>
                </div >
              </div >
            </div >
            <div className="border-t absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full font-normal italic text-gray-700 lg:flex bg-slate-100 dark:bg-gray-800 z-20">
              by Foxtail Financial
            </div>
          </aside >
        )
        :
        isSidebarVisible && (
          //NOT ADMIN ----------------------------------------------------------------------------------------------
          <aside
            id="sidebar"
            className={`
            fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-500 lg:flex transition-width
            ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}
          `}
            aria-label="Sidebar"
          >
            <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  <ul className="pb-2 space-y-2">
                    <li>
                      <NavLink
                        exact={true.toString()}
                        to="/financial-summary"
                        className={({ isActive }) =>
                          "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-orange-100 group dark:text-gray-200 dark:hover:bg-gray-700" + (isActive ? "text-blue-700 font-semibold bg-orange-200" : "")
                        }
                      >
                        <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                        <span className="ml-3">Financial Summary</span>
                      </NavLink>
                    </li >
                    <li>
                      <NavLink
                        exact={true.toString()}
                        to="/on-boarding-checklist"
                        className={({ isActive }) =>
                          "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-orange-100 group dark:text-gray-200 dark:hover:bg-gray-700" + (isActive ? "text-blue-700 font-semibold bg-orange-200" : "")
                        }
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#6e6a6a" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                        </svg>
                        <span className="ml-3">On-boarding Checklist</span>
                      </NavLink>
                    </li >
                  </ul >
                </div >
              </div >
            </div >
            <div className="border-t absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full font-normal italic text-gray-700 lg:flex bg-slate-100 dark:bg-gray-800 z-20">
              by Foxtail Financial
            </div>
          </aside >
        )
      }
      <div className="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90" id="sidebarBackdrop"></div>
    </>

  );
};

export default Sidebar;