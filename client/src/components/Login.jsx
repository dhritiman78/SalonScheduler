import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MistakeBanner from './MistakeBanner';

const Login = () => {
  const [handleMistakes, setMistakes] = useState({
    doesUserExist: true,
    isPasswordWrong: false,
    serverError: false
  });

  const [Login, setLoginData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginData({
      ...Login,
      [name]: value
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Login)
      });
      if (response.ok) {
        setLoginData({
          email: '',
          password: ''
        });
        const login_data = await response.json()
        localStorage.setItem('token',login_data.Token)
        alert('Login Successful!');
        // navigate('/register')
      } else {
        const err_data = await response.json();
        switch (err_data.mess) {
          case 'user does not exist':
            setMistakes({
              doesUserExist: false,
              isPasswordWrong: false,
              serverError: false
            });
            break;
          case 'wrong password':
            setMistakes({
              doesUserExist: true,
              isPasswordWrong: true,
              serverError: false
            });
            break;
          default:
            setMistakes({
              doesUserExist: true,
              isPasswordWrong: false,
              serverError: true
            });
            break;
        }
      }
    } catch (error) {
      setMistakes({
        doesUserExist: true,
        isPasswordWrong: false,
        serverError: true
      });
    }
  };

  const resetMistakes = () => {
    setMistakes({
      doesUserExist: true,
      isPasswordWrong: false,
      serverError: false
    });
  };

  return (
    <>
      {(!handleMistakes.doesUserExist || handleMistakes.isPasswordWrong || handleMistakes.serverError) && (
        <MistakeBanner
          message={!handleMistakes.doesUserExist ? "This user does not exist!" : handleMistakes.isPasswordWrong ? "Incorrect password!" : "Something went wrong! Please try again later"}
          onClose={resetMistakes}
        />
      )}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
        <div className="sm:w-full w-[97%] my-5 max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg transform transition-all hover:shadow-xl hover:scale-105">
          <h1 className="text-3xl font-extrabold text-center text-gray-900">Login</h1>
          <form onSubmit={handleForm} className="space-y-6">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${!handleMistakes.doesUserExist ? 'text-red-600' : 'text-gray-700'}`}>Email</label>
              <input type="email" id="email" name="email" value={Login.email} onChange={handleInput} required className={`w-full px-3 py-2 mt-1 border rounded-md ${!handleMistakes.doesUserExist ? 'border-red-600' : 'focus:ring-indigo-500 focus:border-indigo-500'} transition-colors`} placeholder="e.g. johndoe@gmail.com" />
              {!handleMistakes.doesUserExist && <p className="mt-2 text-sm text-red-600">This user does not exist</p>}
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${handleMistakes.isPasswordWrong ? 'text-red-600' : 'text-gray-700'}`}>Password</label>
              <input type="password" id="password" name="password" value={Login.password} onChange={handleInput} required className={`w-full px-3 py-2 mt-1 border rounded-md ${handleMistakes.isPasswordWrong ? 'border-red-600' : 'focus:ring-indigo-500 focus:border-indigo-500'} transition-colors`} />
              {handleMistakes.isPasswordWrong && <p className="mt-2 text-sm text-red-600">Incorrect password</p>}
            </div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Login</button>
          </form>
          <div className="text-sm text-center text-gray-600">
            <p>
              Do not have an account? <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">Register</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
