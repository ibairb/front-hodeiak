import "./Modal.css";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';

function Modal({ setOpenModal }) {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState('')
  const [hourCost, setHourCost] = useState('')
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
    }
    console.log(newUser)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    };
    fetch('http://localhost:8000/users', requestOptions)
      .then(response => response.json())
      .then(data => console.log());
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(event.target.username.value)
    console.log(event.target.email.value)
    console.log(event.target.password.value)
    console.log(event.target.status.value)
    console.log(event.target.hourCost.value)
    
    console.log('useState 👉️', username)
    
    addNewUser()
    event.target.reset();
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
            <input type="text" placeholder="Username" className="username" name='username' />
            <input type="text" placeholder="Status" className="status" name="status"/>
            <input type="password" placeholder="Password" className="password" name="password"/>
            <input type="email" placeholder="email" name="email"/>
            <input type="text" placeholder="Hour Cost" className="hourCost" name="hourCost"/>
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