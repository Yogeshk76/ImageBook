import React, {useState, useEffect, use} from 'react'
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login, logout} from './store/authSlice';
import {Header} from './components'
import {Footer} from './components'
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      }else {
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);

    if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          TODO : <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App
