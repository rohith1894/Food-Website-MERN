import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let [error, setError] = useState("");
  const navigate = useNavigate();

  const VerifyUser = (newUser) => {
    axios.post('http://localhost:4000/api/loginuser', newUser)
    .then((response) => {
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("username", newUser.username);
          navigate('/');
      } else {
          setError(response.data.message);
      }
  })
  .catch((err) => {
      setError(err.message);
  });
  }
  return (
    <div className='add-user'>
      {error.length !== 0 && (<p className="text-danger display-3 text-center">{error}</p>)}
      <p className="display-3 text-center">Login</p>
      <form className='mx-auto' onSubmit={handleSubmit(VerifyUser)} style={{ width: "400px", margin: "0 auto" }}>
        <div className='mb-3'>
          <label htmlFor='username'>Username</label>
          <input type="text" id="username" className="form-control" {...register("username", { required: true })} />
          {errors.username?.type === "required" && (<p className="text-danger fw-bold fs-5">* Username is required</p>)}
          <label htmlFor='password'>Password</label>
          <input type="password" id="password" className="form-control" {...register("password", { required: true })} />
          {errors.password?.type === "required" && (<p className="text-danger fw-bold fs-5">* Password is required</p>)}
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login