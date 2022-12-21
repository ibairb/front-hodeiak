import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid'
import './Modal.scss'

function Modal({ setOpenModal }) {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [updateUser, setUpdateUser] = useState('')
    const unique_id = uuid();
      
      
function Update() {

    let lolemail= localStorage.getItem('email')

    let user= {
        username: username,
        password: password,
      }

    console.log(user);

    const updateUser = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
      fetch(`http://localhost:8000/users/${lolemail}`, updateUser)
        .then(response => setOpenModal(false))
        console.log(user)
        
    }
  
  
    return (
      <div className="modalFondo">
        <div className="modallol">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="body">
            <h1>Editar datos </h1>
          </div>
          <div className="cuerpo">
              <input type="text" placeholder="Username" className="username" name='username' value={username} onChange={(e)=>setUserName(e.target.value)} />
              <input type="password" placeholder="Password" className="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              
              <button onClick={() => {setOpenModal(false)}} className="btn">Cancel</button>
              <button className="btn" id="update" onClick={Update}>Update</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Modal;