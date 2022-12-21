import "./Modal.css";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import { Password } from "@mui/icons-material";

function Modal({ setOpenModal }) {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState('')
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
      .then(data => console.log());
  }

  const handleSubmit = event => {
    event.preventDefault();
    addNewUser()
    setUserName("")
    setEmail("")
    setPassword("")
    setStatus("")
    setHourCost("")
    setPhone("")
    setOpenModal(false)
    window.location.reload(false);
  };


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
          <form className="form" onSubmit={handleSubmit} >
            <input type="text" placeholder="Username" className="username" name='username' value={username} onChange={(e)=>setUserName(e.target.value)} />
            <input type="text" placeholder="Status" className="status" name="status" value={status} onChange={(e)=>setStatus(e.target.value)} />
            <input type="password" placeholder="Password" className="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <input type="email" placeholder="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="Hour Cost" className="hourCost" name="hourCost" value={hourCost} onChange={(e)=>setHourCost(e.target.value)} />
            
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              className="btn"
            >
              Cancel
            </button>
            <span></span>
            <button type='submit' className="btn" id="continue">Continue</button>
          </form>
        </div>
        <div className="footer">

        </div>
      </div>
    </div>
  );
}

export default Modal;