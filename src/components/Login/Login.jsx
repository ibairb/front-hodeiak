import { React, useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function Login(e) {
    e.preventDefault();
    var txtEmail = document.getElementById("txtEmail").value;
    var txtPas = document.getElementById("txtPas").value;

    localStorage.setItem('email', txtEmail);

    fetch(`http://localhost:8000/users/${txtEmail}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert("error")
        } else {
          localStorage.setItem('status', res.status)
          if (res.password == txtPas) {
            if (res.status === 'user') {
              window.location.href = 'http://localhost:3000/profile'
            } else {
              window.location.href = 'http://localhost:3000/users'
            }
          } else {
            alert('usuario o contraseña incorrecta')
          }
        }
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
      <br></br>
      <div>
        <button type="submit" onClick={Login}>Submit</button>
      </div>

    </form>
  )

}

export default Login;