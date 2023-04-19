import React from "react";
import '../Admin.scss'
import { ReactSession } from 'react-client-session';
import { useHistory } from "react-router-dom";
import SubmissionList from "./SubmissionList";

const Pending = () => {
  
  const history = useHistory()
  const userRole = ReactSession.get("role");

  if (userRole !== 'admin') {
    history.push('/')
  }

  return (
    <div className="pending-prices">
        <SubmissionList />
    </div>    
  )
}

export default Pending;