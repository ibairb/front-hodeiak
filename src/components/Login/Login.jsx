import { React, useState } from 'react';

const Login = () => {
  const [login, setLogin] = useState("false")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function Login(e) {
    e.preventDefault();
    var txtEmail = document.getElementById("txtEmail").value;
    var txtPas = document.getElementById("txtPas").value;

    fetch('http://localhost:8000/users')
      .then((res) => res.json())
      .then((res) => {
        res.map(element => {
          console.log(element.password)
          if (element.password == txtPas && element.email == txtEmail) {
            if(element.status == 'admin'){
            window.location.href='http://localhost:3000/users'}else {
              window.location.href='http://localhost:3000/tasks'
            }
          }
        })
      })
  }

  return (
    <form>
      <label>
        <p>Email</p>
        <input type="text" id="txtEmail" onChange={e => setEmail(e.target.value)} required />
      </label>
      <label>
        <p>Password</p>
        <input type="password" id="txtPas" onChange={e => setPassword(e.target.value)} required />
      </label>
      <div>
        <button type="submit" onClick={Login}>Submit</button>
      </div>

    </form>
  )

}

export default Login;