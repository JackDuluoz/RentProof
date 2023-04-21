import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { DataBaseContext } from "../../providers/DataBaseProvider";
import './Register.scss'

const Register = () => {

  const { setUsers } = useContext(DataBaseContext);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const user = {
      'name': name,
      'email': email,
      'password': password,
    }

    axios.post('http://localhost:8001/users/register', user)
      .then((response) => {
        const userObject = response.data.user
        ReactSession.set("id", userObject.id);
        ReactSession.set("role", userObject.role);
        ReactSession.set("name", userObject.name);
        setUsers(prev => [...prev, userObject])
        history.push('/')
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }

  return (
    <div className="wrapper" id="register-wrapper">
      <h2 className="title">Register</h2>
      <form className="registration-form" onSubmit={handleSubmit}>        
        <div className="inputfield">
          <label>Name</label>
          <input
            type="text" 
            className="input"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            />
        </div>
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
          <input type="submit" value="Register" className="btn"/>
        </div>   
      </form>
    </div> 
  )
}

export default Register;