import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
        { name: 'Services', url: '/services' },
        { name: 'Contact', url: '/contact' },
    ];

    return (
        <div className='bg-gray-800 text-white'>
            <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
                <div className='flex items-center'>
                    <img src={logo} alt="SalonScheduler" className='h-10 w-10 mr-2' />
                    <h1 className='text-2xl font-bold'>SalonScheduler</h1>
                </div>
                <nav className='hidden md:flex'>
                    <ul className='flex space-x-8'>
                        {menuItems.map((item) => (
                            <li className='relative group' key={item.name}>
                                <a
                                    href={item.url}
                                    className='px-5 py-2 text-lg transition duration-300 ease-in-out transform group-hover:scale-105'
                                >
                                    {item.name}
                                </a>
                                <span className='absolute left-0 bottom-0 w-full h-1 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left'></span>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className='hidden md:flex space-x-4'>
                    <a href='/login' className='bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition duration-300'>
                        Log In
                    </a>
                    <a href='/register' className='bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition duration-300'>
                        Register
                    </a>
                </div>
                <div className='md:hidden'>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className='text-white focus:outline-none'
                    >
                        {menuOpen ? <FaTimes className='w-6 h-6' /> : <FaBars className='w-6 h-6' />}
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className='md:hidden bg-gray-700'>
                    <ul className='flex flex-col items-center space-y-4 py-4'>
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <a href={item.url} className='text-lg'>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                        <li className='py-2'>
                            <a href='/login' className='bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition duration-300'>
                                Log In
                            </a>
                        </li>
                        <li className='py-2'>
                            <a href='/register' className='bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition duration-300'>
                                Register
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
