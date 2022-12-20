import "./Modal.css";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import { Password } from "@mui/icons-material";

function Modal({ setOpenModal }) {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState('user')
  const [hourCost, setHourCost] = useState('')
  const [phone, setPhone] = useState('')
  const unique_id = uuid();

  function addNewUser() {
    let newUser = {
      id: unique_id,
      username: username,
      email: email,
      password: password,
      image: '',
      status: status,
      hourCost: hourCost,
      phone: phone,
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    };
    fetch('http://localhost:8000/users/create', requestOptions)
      .then(response => response.json())
      .then(data => {
        setUserName("")
        setEmail("")
        setHourCost("")
        setStatus("")
        setPassword("")
        window.location.reload(false);
      });
  }

  function handleUsername(e){
    setUserName(e.target.value)
  }

  function handlePassword(e){
    setPassword(e.target.value)
  }

  function handleEmail(e){
    setEmail(e.target.value)
  }

  function handleHourCost(e){
    setHourCost(e.target.value)
  }

  function handleStatus(e){
    setStatus(e.target.value)
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Fill below fields to create a new user </h1>
        </div>
        <div className="body">
          <div className="form">
            <input type="text" placeholder="Username" className="username" name='username' onChange={handleUsername} value={username}/>
            <input type="password" placeholder="Password" className="password" name="password" onChange={handlePassword} value={password}/>
            <input type="email" placeholder="email" name="email" onChange={handleEmail} value={email}/>
            <input type="text" placeholder="Hour Cost" className="hourCost" name="hourCost" onChange={handleHourCost} value={hourCost}/>
            <select className='status' name="status" onChange={handleStatus} value={status}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button className="btn" id="continue" onClick={addNewUser}>Continue</button>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              className="btn"
            >
              Cancel
            </button>
            <span></span>
          </div>
        </div>
        <div className="footer">

        </div>
      </div>
    </div>
  );
}

export default Modal;