import React from "react";
import "./Modal.css";

function Modal({ setOpenModal }) {
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
          <form action="POST" className="form">
            <input type="text" placeholder="Username" className="username"/>
            <input type="password" placeholder="Password" className="password"/>
            <input type="email" placeholder="email"/>
            <input type="phone number" placeholder="number"/>
            <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="btn"
          >
            Cancel
          </button>
          <span></span>
          <button className="btn" id="continue">Continue</button>
          </form>
        </div>
        <div className="footer">
          
        </div>
      </div>
    </div>
  );
}

export default Modal;