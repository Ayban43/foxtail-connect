import React, { useState, useEffect } from 'react';
// import { Login, Dashboard } from './pages';
import { Dashboard } from './pages/Dashboard';
import { Client, Add, Edit } from './pages/Client';
import { Login } from './pages/Login';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ErrorPage } from './pages/Error/';
import Sidebar from './components/Sidebar';
import supabase from './config/supabaseClient';
import { FinancialSummary, AddFinancialSummary, EditFinancialSummary } from './pages/FinancialSummary';
import { FinancialSummaryClient, ViewFinancialSummaryClient } from './pages/FinancialSummaryClient';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { OnBoardingChecklist } from './pages/OnBoardingChecklist';

const App = () => {
  const navigate = useNavigate()

  const [token, setToken] = useState(false)
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSession, setUserSession] = useState(null);

  const [isSidebarVisible, setSidebarVisible] = useState(true);

  console.log("hide slider", isSidebarVisible)

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    async function getUserData() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        const { user } = session
        setUserSession(user)
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('admin')
            .eq('id', user.id)
            .single();

          setIsAdmin(profile.admin);
        }
      }

      const authListener = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'SIGNED_IN') {
            setUserSession(session.user);
            supabase
              .from('profiles')
              .select('admin')
              .eq('id', session.user.id)
              .single()
              .then(({ data: profile, error }) => {
                setIsAdmin(profile.admin);
              });
          } else if (event === 'SIGNED_OUT') {
            setUserSession(null);
            setIsAdmin(false);
          }
        }
      );

      // Cleanup function to remove the listener
      return () => {
        authListener.unsubscribe();
      };

    }

    getUserData().then(() => {
      setLoading(false);
    });
  }, []);


  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Routes>
        {userSession && isAdmin === true ? (
          <>
            <Route path={'/'} element={
              <>
                <div className="flex">
                  <Sidebar isAdmin={isAdmin} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                  <div className={isSidebarVisible ? 'flex-grow ml-64' : 'flex-grow'}>
                    <Dashboard isAdmin={isAdmin} />
                  </div>
                </div>
              </>} />

            <Route path={'/client'} element={
              <>
                <div className="flex">
                  <Sidebar isAdmin={isAdmin} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                  <div className={isSidebarVisible ? 'flex-grow ml-64' : 'flex-grow'}>
                    <Client isAdmin={isAdmin} />
                  </div>
                </div>
              </>} />
            <Route path={'/client/add'} element={
              <>
                <div className="flex">
                  <Sidebar isAdmin={isAdmin} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                  <div className={isSidebarVisible ? 'flex-grow ml-64' : 'flex-grow'}>
                    <Add isAdmin={isAdmin} />
                  </div>
                </div>
              </>} />
            <Route path={'/client/edit/:id'} element={
              <>
                <div className="flex">
                  <Sidebar isAdmin={isAdmin} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                  <div className={isSidebarVisible ? 'flex-grow ml-64' : 'flex-grow'}>
                    <Edit isAdmin={isAdmin} />
                  </div>
                </div>
              </>} />
            <Route path={'/financial-summary/add'} element={
              <>
                <div className="flex">
                  <Sidebar isAdmin={isAdmin} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                  <div className={isSidebarVisible ? 'flex-grow ml-64' : 'flex-grow'}>
                    <AddFinancialSummary isAdmin={isAdmin} />
                  </div>
                </div>
              </>} />
            <Route path={'/financial-summary'} element={
              <>
                <div className="flex">
                  <Sidebar isAdmin={isAdmin} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                  <div className={isSidebarVisible ? 'flex-grow ml-64' : 'flex-grow'}>
                    <FinancialSummary isAdmin={isAdmin} />
                  </div>
                </div>
              </>} />
            <Route path={'/financial-summary/edit/:id'} element={
              <>
                <div className="flex">
                  <Sidebar isAdmin={isAdmin} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                  <div className={isSidebarVisible ? 'flex-grow ml-64' : 'flex-grow'}>
                    <EditFinancialSummary isAdmin={isAdmin} />
                  </div>
                </div>
              </>} />
          </>
        ) : userSession && isAdmin === false ? (
          <>
            <Route path={'/'} element={
              <>
                <div className="flex">
                  <Sidebar isAdmin={isAdmin} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                  <div className={isSidebarVisible ? 'flex-grow ml-64' : 'flex-grow'}>
                    <FinancialSummaryClient />
                  </div>
                </div>
              </>} />

            <Route path={'/financial-summary'} element={
              <>
                <div className="flex">
                  <Sidebar isAdmin={isAdmin} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                  <div className={isSidebarVisible ? 'flex-grow ml-64' : 'flex-grow'}>
                    <FinancialSummaryClient />
                  </div>
                </div>
              </>} />

            <Route path={'/on-boarding-checklist'} element={
              <>
                <div className="flex">
                  <Sidebar isAdmin={isAdmin} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                  <div className={isSidebarVisible ? 'flex-grow ml-64' : 'flex-grow'}>
                    <OnBoardingChecklist />
                  </div>
                </div>
              </>}

            />
            <Route path={'/financial-summary/:id'} element={
              <>
                <div className="flex">
                  <Sidebar isAdmin={isAdmin} toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
                  <div className={isSidebarVisible ? 'flex-grow ml-64' : 'flex-grow'}>
                    <ViewFinancialSummaryClient />
                  </div>
                </div>
              </>}
            />
          </>
        ) : (
          <>
            <Route path={'/'} element={<Login setIsAdmin={setIsAdmin} />} />
            <Route path={'/client'} element={<ErrorPage />} />
            <Route path={'/add-client'} element={<ErrorPage />} />
          </>
        )}
      </Routes>
    </div >
  );
}


export default App