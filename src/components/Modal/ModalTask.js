import "./ModalTask.css";
import React, { useState } from "react";

function ModalTask({ setOpenModal }) {
const [title, setTitle] = useState('')


const handleSubmit = event => {
  event.preventDefault();
  setTitle(event.target.title.value)
  
  console.log('useState 👉️', title)

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
          <h1>Fill below fields to create a new task</h1>
        </div>
        <div className="body">
          <form className="form" onSubmit={handleSubmit} >
            <input type="text" placeholder="Title" className="title" name='title'/>
            <span></span>
            <span></span>
            <input type="text" placeholder="Description" className="description"/>
            <button type='submit' className="btn" id="continue">Continue</button>
            <span></span>
            <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="btn"
          >
            Cancel
          </button>
          </form>
        </div>
        <div className="footer">
          
        </div>
      </div>
    </div>
  );
}

export default ModalTask;