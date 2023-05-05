import React, { useState, useEffect } from 'react';
import { Login, Dashboard, Client, AddClient } from './pages';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Sidebar from './components/Sidebar';
import supabase from './config/supabaseClient';
import FinancialSummary from './pages/FinancialSummary';
import CreateFinancialSummary from './pages/CreateFinancialSummary';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  const navigate = useNavigate()

  const [token, setToken] = useState(false)
  // const [authListener, setAuthListener] = useState(null);
  const [isAdmin, setIsAdmin] = useState("");
  const [loading, setLoading] = useState(true);
  const [userSession, setUserSession] = useState(null);

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])

  useEffect(() => {
    async function getUserData() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const { user } = session

      // console.log(user.id)

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('admin')
          .eq('id', user.id)
          .single();

        setIsAdmin(profile.admin);
        setLoading(false);
      }
    }

    getUserData();
  }, []);

  useEffect(() => {
    async function getUserSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const { user } = session

      console.log(user)
    }

    getUserSession()
  }, []);

  return (
    <div>
      <Routes>
        {token && isAdmin ? (
          <>
            <Route path={'/'} element={<><Sidebar setToken={setToken} isAdmin={isAdmin} /><Dashboard token={token} isAdmin={isAdmin} /></>} />
            <Route path={'/client'} element={<><Sidebar setToken={setToken} isAdmin={isAdmin} /><Client token={token} /></>} />
            <Route path={'/add-client'} element={<><Sidebar setToken={setToken} isAdmin={isAdmin} /><AddClient token={token} /></>} />
            <Route path={'/create-financial-summary'} element={<><Sidebar setToken={setToken} isAdmin={isAdmin} /><CreateFinancialSummary token={token} /></>} />
            <Route path={'/financial-summary'} element={<><Sidebar setToken={setToken} isAdmin={isAdmin} /><FinancialSummary token={token} /></>} />
          </>
        ) : token && !isAdmin ? (

          <Route path={'/'} element={<><Sidebar setToken={setToken} isAdmin={isAdmin} /><FinancialSummary token={token} /></>} />
        ) :

          // navigate("/login")
          <>
            <Route path={'/'} element={<ErrorPage />} />
            <Route path={'/client'} element={<ErrorPage />} />
            <Route path={'/add-client'} element={<ErrorPage />} />
          </>

        }
        <Route path={'/login'} element={<Login setToken={setToken} isAdmin={isAdmin} />} />
      </Routes>


    </div>
  )
}

export default App