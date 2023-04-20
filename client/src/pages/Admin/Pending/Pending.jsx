import React from "react";
import '../Admin.scss'
import { ReactSession } from 'react-client-session';
import { useHistory } from "react-router-dom";
import Submissions from "./Submissions";

const Pending = () => {
  
  const history = useHistory()
  const userRole = ReactSession.get("role");

  if (userRole !== 'admin') {
    history.push('/')
  }

  return (
    <div className="pending-prices">
        <Submissions />
    </div>    
  )
}

export default Pending;