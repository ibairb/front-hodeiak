import { React, useState } from 'react';
import './Login.scss';



 
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_4xqmytn', 'template_8rqs0gq', form.current, 'oM-tn6RM1FQ1xLWGO')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

  return (
    <>
      <form className='form'>
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
          <button type="submit" id="btn" onClick={Login}>Submit</button>
        </div>

      </form>

    </>

  )



export default sendEmail;