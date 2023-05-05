import React, { useState, useEffect } from 'react';
import { Login, Dashboard, Client, AddClient } from './pages';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Sidebar from './components/Sidebar';
import supabase from './config/supabaseClient';
import FinancialSummary from './pages/FinancialSummary';
import LoadingSpinner from './components/LoadingSpinner';
import AddFinancialSummary from './pages/AddFinancialSummary';

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
            <Route path={'/'} element={<><Sidebar  isAdmin={isAdmin} /><Dashboard isAdmin={isAdmin} /></>} />
            <Route path={'/client'} element={<><Sidebar  isAdmin={isAdmin} /><Client  isAdmin={isAdmin}/></>} />
            <Route path={'/client/add'} element={<><Sidebar  isAdmin={isAdmin} /><AddClient isAdmin={isAdmin} /></>} />
            <Route path={'/financial-summary/add'} element={<><Sidebar  isAdmin={isAdmin} /><AddFinancialSummary isAdmin={isAdmin} /></>} />
            <Route path={'/financial-summary'} element={<><Sidebar isAdmin={isAdmin} /><FinancialSummary  isAdmin={isAdmin} /></>} />
          </>
        ) : userSession && isAdmin === false ? (
          <>
            <Route path={'/'} element={<><Sidebar isAdmin={isAdmin} /><FinancialSummary  /></>} />
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