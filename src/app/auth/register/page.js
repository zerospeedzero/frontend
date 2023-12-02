'use client'
// pages/register.js
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter}  from 'next/navigation'
import Spinner from '@/components/Spinner';

const Register = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState({
    parentFirstName: '',
    parentLastName: '',
    children: [{ childFirstName: '', childLastName: '' }],
    email: '',
    password: '',
    confirmPassword: '',
  });
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    },100)
  },[])
  const handleChange = (field, value, index = null, subField = null) => {
    if (index !== null) {
      const newChildren = [...formData.children];
      newChildren[index] = { ...newChildren[index], [field]: value };
      setFormData({ ...formData, children: newChildren });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleAddChild = () => {
    setFormData({
      ...formData,
      children: [...formData.children, { childFirstName: '', childLastName: '' }],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if password is the same as confirmPassword
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password and confirm password must be the same!', {
        position: 'bottom-left',
        autoClose: 2000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: formData.parentFirstName + ' ' + formData.parentLastName,
        username: formData.parentFirstName + ' ' + formData.parentLastName,
        parent: {
          firstName: formData.parentFirstName,
          lastName: formData.parentLastName,
        },
        children: formData.children.map((child) => ({
          firstName: child.childFirstName,
          lastName: child.childLastName,
        })),
        email: formData.email,
        password: formData.password,
      })
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error.message , {
        position: 'bottom-left',
        autoClose: 2000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      router.push('/auth/waitApproved')
    }    
  };

  return (
    <>
      {isLoading ? <Spinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Panel */}
          <form className="p-8" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold mb-4">Hello Parent</h1>
            <p className="text-gray-600 mb-8">Enter your credentials to create your account</p>
    
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="w-full">
                <label htmlFor="parentFirstName" className="block text-sm font-medium text-gray-700">
                  Parent First name
                </label>
                <input
                  type="text"
                  id="parentFirstName"
                  name="parentFirstName"
                  required
                  value={formData.parentFirstName}
                  onChange={(e) => handleChange('parentFirstName', e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
    
              <div className="w-full">
                <label htmlFor="parentLastName" className="block text-sm font-medium text-gray-700">
                  Parent Last name
                </label>
                <input
                  type="text"
                  id="parentLastName"
                  name="parentLastName"
                  required
                  value={formData.parentLastName}
                  onChange={(e) => handleChange('parentLastName', e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            </div>
    
            {formData.children.map((child, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                <div className="w-full">
                  <label htmlFor={`childFirstName${index}`} className="block text-sm font-medium text-gray-700">
                    Child First name
                  </label>
                  <input
                    type="text"
                    id={`childFirstName${index}`}
                    name={`childFirstName${index}`}
                    required
                    value={child.childFirstName}
                    onChange={(e) => handleChange('childFirstName', e.target.value, index)}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
    
                <div className="w-full">
                  <label htmlFor={`childLastName${index}`} className="block text-sm font-medium text-gray-700">
                    Child Last name
                  </label>
                  <input
                    type="text"
                    id={`childLastName${index}`}
                    name={`childLastName${index}`}
                    required
                    value={child.childLastName}
                    onChange={(e) => handleChange('childLastName', e.target.value, index)}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
              </div>
            ))}
    
            <button onClick={handleAddChild} className="w-full bg-p2  text-black p-2 rounded mb-4">
              Add Child
            </button>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="w-full col-span-2">
                <label htmlFor="email" className=" block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
    
              <div className="w-full col-span-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            </div>
    
            <div className="w-full mb-4 col-span-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="mt-1 mb-4 p-2 border rounded w-full"
              />
              <span className='text-xs'>Requires at least 8 characters with at least one number, one lowercase letter, and one uppercase letter</span>
            </div>
    
            <input type="submit" className="w-full mt-4 bg-p1/80  text-white p-2 rounded mb-4" value="Create"/>
              {/* Create
            </input> */}
    
            <p>
              Already have an account?{' '}
              <a href="/auth/login" className="text-s1">
                Login
              </a>
            </p>
            {/* <div className='flex flex-col justify-center items-center mt-8 h-[30%]'>
              <img src='/images/logo.png' alt='Logo' className='h-[50%]' />
            </div> */}
          <ToastContainer />
          </form>
    
          {/* Right Panel - Desktop Only */}
          <div className="hidden md:block bg-cover bg-center">
            <img src='/images/register.jpg' alt='Registration Image' className='h-screen  bg-no-repeat' />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
