import React, { useContext, useState } from "react";
import { DataBaseContext } from "../../providers/DataBaseProvider";
import axios from "axios";
import { ReactSession } from 'react-client-session';
import { useHistory } from "react-router-dom";
import './Login.scss'

const Login = () => {  

  const { setUsers } = useContext(DataBaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const user = {
      'email': email,
      'password': password,
    }

    axios.post('http://localhost:8001/users/login', user)
      .then((response) => {
        const userObject = response.data.user
        ReactSession.set("id", userObject.id);
        ReactSession.set("role", userObject.role);
        ReactSession.set("name", userObject.name);
        setUsers(prev => [...prev])
        history.push('/')
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });    
  }

  return (
    <div className="wrapper" id="register-wrapper">
      <h2 className="title">Login</h2>
      <form className="registration-form" onSubmit={handleSubmit}>        
        <div className="inputfield">
          <label>Email</label>
            <input
              type="text" 
              className="input"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
        </div>
        <div className="inputfield">
          <label>Password</label>
            <input
              type="password"
              className="input"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
        </div>
        <div className="inputfield">
          <input type="submit" value="Login" className="btn"/>
        </div>        
      </form>
    </div>  
  )
}

export default Login;