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
            <Route path={'/'} element={<><Sidebar isAdmin={isAdmin} /><Dashboard isAdmin={isAdmin} /></>} />
            <Route path={'/client'} element={<><Sidebar isAdmin={isAdmin} /><Client isAdmin={isAdmin} /></>} />
            <Route path={'/client/add'} element={<><Sidebar isAdmin={isAdmin} /><Add isAdmin={isAdmin} /></>} />
            <Route path={'/client/edit/:id'} element={<><Sidebar isAdmin={isAdmin} /><Edit isAdmin={isAdmin} /></>} />
            <Route path={'/financial-summary/add'} element={<><Sidebar isAdmin={isAdmin} /><AddFinancialSummary isAdmin={isAdmin} /></>} />
            <Route path={'/financial-summary'} element={<><Sidebar isAdmin={isAdmin} /><FinancialSummary isAdmin={isAdmin} /></>} />
            <Route path={'/financial-summary/edit/:id'} element={<><Sidebar isAdmin={isAdmin} /><EditFinancialSummary isAdmin={isAdmin} /></>} />
          </>
        ) : userSession && isAdmin === false ? (
          <>
            <Route path={'/'} element={<><Sidebar isAdmin={isAdmin} /><FinancialSummaryClient /></>} />
            <Route path={'/financial-summary'} element={<><Sidebar isAdmin={isAdmin} /><FinancialSummaryClient /></>} />
            <Route path={'/on-boarding-checklist'} element={<><Sidebar isAdmin={isAdmin} /><OnBoardingChecklist /></>} />
            <Route path={'/financial-summary/:id'} element={<><Sidebar isAdmin={isAdmin} /><ViewFinancialSummaryClient /></>} />
          </>
        ) : (
          <>
            <Route path={'/'} element={<Login setIsAdmin={setIsAdmin} />} />
            <Route path={'/client'} element={<ErrorPage />} />
            <Route path={'/add-client'} element={<ErrorPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}


export default App