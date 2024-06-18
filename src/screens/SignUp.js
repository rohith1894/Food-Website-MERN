import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let [error, setError] = useState('');
    const navigate = useNavigate();

    const AddNewUser = (newUser) => {
        axios.post('http://localhost:4000/api/createuser', newUser)
            .then((response) => {
                if (response.data.success) {
                    navigate('/loginuser');
                } else {
                    setError(response.data.message);
                }
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className='add-user'>
            {error && (<p className="text-danger display-3 text-center">{error}</p>)}
            <p className="display-3 text-center">Sign Up</p>
            <form className='mx-auto' onSubmit={handleSubmit(AddNewUser)} style={{ width: '400px', margin: '0 auto' }}>
                <div className='mb-3'>
                    <label htmlFor='username'>Username</label>
                    <input type="text" id="username" className="form-control" {...register('username', { required: true })} />
                    {errors.username?.type === 'required' && (<p className="text-danger fw-bold fs-5">* Username is required</p>)}

                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" className="form-control" {...register('password', { required: true })} />
                    {errors.password?.type === 'required' && (<p className="text-danger fw-bold fs-5">* Password is required</p>)}

                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email" className="form-control" {...register('email', { required: true })} />
                    {errors.email?.type === 'required' && (<p className="text-danger fw-bold fs-5">* Email is required</p>)}
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Register</button>
                    <Link to='/loginuser' className="btn btn-primary">Already a User</Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
