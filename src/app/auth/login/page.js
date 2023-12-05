'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isAuth} from '@/lib/isAuth';

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  },[])
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    // }
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    if (result.ok) {
      if (formData.email == 'temp6666temp@gmail.com') {
        router.replace('/dashboard/admin');
        return;
      } else {
        router.replace('/dashboard/users/all');
        return;
      }
    } else {
      console.log('failed')
      toast.error('Login failure!!' , {
        position: 'bottom-left',
        autoClose: 2000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  };

  return (
    <>
    {isLoading ? <Spinner /> : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left Panel - Desktop Only */}
        <div className="hidden md:flex h-screen justify-center items-center bg-white ">
           <img src='/images/login1.png' alt='Registration Image' className='' />
        </div>      
        {/* Right Panel */}
        <form className="bg-p1 flex flex-col justify-center items-center text-white p-8" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold mb-4">WELCOME BACK</h1>
          <p className="mb-16">ENter your credentials to access your account</p>
  
          <div className="mb-8 min-w-[20rem]">
            <label htmlFor="email" className="block text-sm font-medium mb-4 ">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-1 text-black p-2 border rounded w-full"
            />
          </div>
          <div className="mb-8 min-w-[20rem]">
            <label htmlFor="password" className="block text-sm font-medium mb-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="mt-1 text-black p-2 border rounded w-full"
            />
          </div>
  
          <button  className="bg-p2 text-p1 min-w-[20rem] px-4 py-2 my-2 rounded mb-8">
            Login
          </button>
  
          <p className='text-p2'>
            Don't have an account?{' '}
            <a href="/auth/register" className="text-s1">
              <span className='underline'>Sign Up</span>
            </a>
          </p>
          {/* <div className='flex flex-col justify-center items-center mt-8 h-[30%]'>
            <img src='/images/logo.png' alt='Logo' className='h-[50%]' />
          </div> */}
        </form>
        <ToastContainer/>
      </div>

    )}
    </>
  );
};

export default Login;
