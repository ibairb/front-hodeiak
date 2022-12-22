import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid'
import './Modal.scss'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function Modal({ setOpenModal }) {
  const [username, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [hourCost, setHourCost] = useState('')
  const [status, setStatus] = useState('')
  const [password, setPassword] = useState('')
  const [updateUser, setUpdateUser] = useState('')
  const unique_id = uuid();
  let lolemail = localStorage.getItem('email')
  useEffect(() => {

    fetch(`http://localhost:8000/users/${lolemail}`)
    .then(res=> res.json())
    .then(res => setUser(res))
    

  }, [])



  function Update() {

    let lolemail = localStorage.getItem('email')

    const updateUser = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    console.log(lolemail);
    fetch(`http://localhost:8000/users/${lolemail}`, updateUser)
      .then(response => setOpenModal(false))

  }




  return (
    <div className=" modal">
      <div className="modalContainerProfile">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="body-editar">
          <h1>Editar datos </h1>
        </div>
        {user && <div className="cuerpo">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              variant="standard"
              color="warning"
              InputProps={{
                readOnly: true,
              }}
              label="Email"
              margin="normal"
              placeholder="Email"
              className="Email"
              name='Email'
              value={user.email}
              sx={{
                '& > :not(style)': { mb: 1, width: '30ch' },
              }}
            />
            <TextField
              variant="standard"
              color="warning"
              focused
              required
              label="Name"
              margin="normal"
              placeholder="Username"
              className="username"
              name='username'
              value={user.username}
              onChange={(e)=>user.username = e.target.value}
              sx={{
                '& > :not(style)': { mb: 1, width: '30ch' },
              }}
            />
            <TextField
              variant="standard"
              color="warning"
              focused
              required
              label="Password"
              type="password"
              margin="normal"
              placeholder="Password"
              className="password"
              name='password'
              value={user.password}
              onChange={(e)=>user.password = e.target.value}
              sx={{
                '& > :not(style)': { mb: 1, width: '30ch' },
              }}
            />
            <TextField
              variant="standard"
              color="warning"
              focused
              required
              label="Hour Cost"
              type="number"
              margin="normal"
              placeholder="Hour Cost"
              className="hourCost"
              name='hourCost'
              value={user.hourCost}
              onChange={(e)=>user.hourCost = e.target.value}
              sx={{
                '& > :not(style)': { mb: 1, width: '30ch' },
              }}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                label="Status"
                value={user.status}
                InputProps={{
                  readOnly: true,
                }}
              >
                <MenuItem key={"user"} value={"user"}>{"user"}</MenuItem>
                <MenuItem key={"admin"} value={"admin"}>{"admin"}</MenuItem>
              </Select>
            </FormControl>
          </FormControl>
          <Stack direction="row" spacing={2}>
            <Button style={{
              backgroundColor: "rgba(241, 171, 32, 0.853)"
            }}
              variant="contained" startIcon={<CheckBoxIcon />} onClick={() => { Update(); setOpenModal(false) }} >
              Confirm
            </Button>
            <Button style={{
              backgroundColor: "rgba(241, 171, 32, 0.853)"
            }}
              variant="contained" startIcon={<CancelIcon />} onClick={() => setOpenModal(false)} >
              Cancel
            </Button>
          </Stack>

        </div>}
      </div>
    </div>
  );
}

export default Modal;