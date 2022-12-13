import "./Modal.css";
import React, { useEffect, useState } from "react";

function Modal({ setOpenModal }) {
const [username, setUserName] = useState('')


const handleSubmit = event => {
  event.preventDefault();
  setTimeout(setUserName(event.target.username.value),10000)
  
  console.log('useState 👉️', username)

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
            <input type="text" placeholder="Username" className="username" name='username'/>
            <input type="text" placeholder="Status" className="status"/>
            <input type="password" placeholder="Password" className="password"/>
            <input type="email" placeholder="email"/>
            <input type="phone number" placeholder="number"/>
            <input type="text" placeholder="Hour Cost" className="hourCost"/>
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