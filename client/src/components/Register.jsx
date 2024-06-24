import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MistakeBanner from './MistakeBanner';

const Register = () => {
  const [handleMistakes, setMistakes] = useState({
    doesEmailExist: false,
    passwordMismatch: false,
    serverError: false
  });

  const [registration, setRegistrationData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRegistrationData({
      ...registration,
      [name]: value
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registration)
      });
      if (response.ok) {
        setRegistrationData({
          firstname: '',
          lastname: '',
          phone: '',
          email: '',
          password: '',
          cpassword: ''
        });
        // Storing the token in local storage
        const reg_data = await response.json()
        localStorage.setItem('token',reg_data.Token)
        navigate('/login');
      } else {
        const errorData = await response.json();
        switch (errorData.mess) {
          case 'email exist':
            setMistakes({
              doesEmailExist: true,
              passwordMismatch: false,
              serverError: false
            });
            break;
          case 'password mismatch':
            setMistakes({
              doesEmailExist: false,
              passwordMismatch: true,
              serverError: false
            });
            break;
          default:
            setMistakes({
              doesEmailExist: false,
              passwordMismatch: false,
              serverError: true
            });
            break;
        }
      }
    } catch (error) {
      setMistakes({
        doesEmailExist: false,
        passwordMismatch: false,
        serverError: true
      });
    }
  };

  const resetMistakes = () => {
    setMistakes({
      doesEmailExist: false,
      passwordMismatch: false,
      serverError: false
    });
  };

  return (
    <>
      {(handleMistakes.doesEmailExist || handleMistakes.passwordMismatch || handleMistakes.serverError) && (
        <MistakeBanner
          message={handleMistakes.doesEmailExist ? "This email already exists" : handleMistakes.passwordMismatch ? "Passwords do not match" : "Something went wrong! Please try again later"}
          onClose={resetMistakes}
        />
      )}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
        <div className="sm:w-full w-[97%] my-5 max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg transform transition-all hover:shadow-xl hover:scale-105">
          <h1 className="text-3xl font-extrabold text-center text-gray-900">Register</h1>
          <form onSubmit={handleForm} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" id="firstname" autoComplete="off" value={registration.firstname} onChange={handleInput} required name="firstname" className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="e.g. John" />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" id="lastname" name="lastname" value={registration.lastname} onChange={handleInput} required className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="e.g. Doe" />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (Without +91)</label>
              <input type="tel" id="phone" name="phone" value={registration.phone} onChange={handleInput} required className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" placeholder="e.g. 7002567854" />
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${handleMistakes.doesEmailExist ? 'text-red-600' : 'text-gray-700'}`}>Email</label>
              <input type="email" id="email" name="email" value={registration.email} onChange={handleInput} required className={`w-full px-3 py-2 mt-1 border rounded-md ${handleMistakes.doesEmailExist ? 'border-red-600' : 'focus:ring-indigo-500 focus:border-indigo-500'} transition-colors`} placeholder="e.g. johndoe@gmail.com" />
              {handleMistakes.doesEmailExist && <p className="mt-2 text-sm text-red-600">This email already exists</p>}
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${handleMistakes.passwordMismatch ? 'text-red-600' : 'text-gray-700'}`}>Password</label>
              <input type="password" id="password" name="password" value={registration.password} onChange={handleInput} required className={`w-full px-3 py-2 mt-1 border rounded-md ${handleMistakes.passwordMismatch ? 'border-red-600' : 'focus:ring-indigo-500 focus:border-indigo-500'} transition-colors`} />
            </div>
            <div>
              <label htmlFor="cpassword" className={`block text-sm font-medium ${handleMistakes.passwordMismatch ? 'text-red-600' : 'text-gray-700'}`}>Confirm Password</label>
              <input type="password" id="cpassword" name="cpassword" value={registration.cpassword} onChange={handleInput} required className={`w-full px-3 py-2 mt-1 border rounded-md ${handleMistakes.passwordMismatch ? 'border-red-600' : 'focus:ring-indigo-500 focus:border-indigo-500'} transition-colors`} />
              {handleMistakes.passwordMismatch && <p className="mt-2 text-sm text-red-600">Passwords do not match</p>}
            </div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Register</button>
          </form>
          <div className="text-sm text-center text-gray-600">
            <p>
              Already have an account? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
