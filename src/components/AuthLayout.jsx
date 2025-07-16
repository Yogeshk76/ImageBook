import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Protected({children, authentication = true}){

  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if(authentication && authStatus !== authentication) {
      navigate("/login");
    }
    else if(!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);
  return loader ? <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div> : <>{children}</>;
}

