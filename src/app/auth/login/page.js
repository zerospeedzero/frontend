'use client'
// pages/auth/signin.js
// import { signIn } from 'next-auth/react';

// export default function SignIn() {
//   return (
//     <div>
//       <button onClick={() => signIn()}>Sign in with Strapi</button>
//     </div>
//   );
// }
// pages/login.js
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/`, {
    // const response = await fetch(`http://localhost:3000/api/auth/credentials`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ 
    //     identifier: formData.email,
    //     password: formData.password,
    //   })
    // });
    // const data = await response.json();
    // console.log(data)
    // if (data.error) {
    //   toast.error(data.error.message , {
    //     position: 'bottom-left',
    //     autoClose: 2000, // milliseconds
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   })
    // } else {
    //   router.push('/')
    // }
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    if (result.ok) {
      router.replace('/');
      return;
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Panel - Desktop Only */}
        <div className="hidden md:block bg-cover bg-center">
           <img src='/images/login.png' alt='Registration Image' className='h-screen  bg-no-repeat' />
        </div>      
        {/* Right Panel */}
        <form className="p-8" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
          <p className="text-gray-600 mb-8">Log in to your account</p>
  
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
  
          <button  className="bg-p1/80 text-white px-4 py-2 my-2 rounded mb-4">
            Login
          </button>
  
          <p>
            Don't have an account?{' '}
            <a href="/auth/register" className="text-s1">
              Register
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
