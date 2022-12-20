import "./ModalTask.css";
import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import { SecondModal } from "./SecondModal/SecondModal";

function ModalTask({ setOpenModal, obj, modalOpen}) {
  const [title,setTitle] = useState("");
  const [description, setDescription] = useState('');
  const[start,setStart]=useState(Date);
  const[end,setEnd]=useState(Date);
  const[user,setUser]=useState("");
  const [secondModalOpen, setSecondModalOpen] = useState(false)
  const unique_id = uuid();
 
  
  const [title,setTitle] = useState("")
 
  useEffect(()=>{
    
    
   
  },[obj])
  function horario() {
  let t = new Date('Wed Dec 21 2022 00:00:00 GMT+0100');
let t2 = new Date('Tue Dec 20 2022 00:00:00 GMT+0100');

let diferenciaEnMilisegundos = t - t2;

console.log('diferencia', diferenciaEnMilisegundos);

console.log('Diferencia en horas', diferenciaEnMilisegundos / 3600000)}
  
  function addProyect() {
    horario()
    let newObj = {
      id:unique_id,
      title:title,
      description:description,
      start:obj.start,
      end:obj.end,
      user:user
    }
    modalOpen.addEvent(newObj)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObj)
    };
    fetch('http://localhost:8000/tasks', requestOptions)
      .then(response => response.json())
      .then(data => console.log());
  }

  const handleSubmit = event => {
    event.preventDefault();
    setTitle(event.target.title.value)
    setDescription(event.target.description.value)
    
    addProyect()
    setOpenModal(false)
    event.target.reset();
  };


  return (
    <>
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
        <button className="btn" onClick={()=>{setSecondModalOpen(true)}} id="taskSelection">Select Task</button>
        <div className="body">
          <form className="form" onSubmit={handleSubmit} >
            
            <input type="text" placeholder="Title" className="title" name='title' value={title} onChange={(e)=>setTitle(e.target.value)} />
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
    {secondModalOpen && <SecondModal />}
    </>
  );
}

export default ModalTask;