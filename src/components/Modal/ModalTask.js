import "./ModalTask.css";
import React, { useEffect, useState } from "react";

function ModalTask({ setOpenModal, obj}) {
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
  useEffect(()=>{
    console.log(obj)
  },[obj])
  
  
  function addProyect() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    };
    fetch('http://localhost:8000/tasks', requestOptions)
      .then(response => response.json())
      .then(data => console.log());
  }


  const handleSubmit = event => {
    event.preventDefault();
    setTitle(event.target.title.value)
    setDescription(event.target.description.value)
    

    
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
            <input type="text" placeholder="Title" className="title" name='title' />
            <span></span>
            <span></span>
            <input type="text" placeholder="Description" className="description" name="description" />
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