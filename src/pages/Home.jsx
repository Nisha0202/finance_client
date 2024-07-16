import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='h-screen-100 max-w-sm mx-auto flex justify-center items-center gap-4 md:gap-6'>    
           <Link to={'/login'} className="btn btn-sm flex-1 md:btn-md bg-blue-500  text-white py-2 px-4 rounded">Log In</Link>
           <Link to={'/registration'} className="btn btn-sm flex-1  md:btn-md bg-blue-500  text-white py-2 px-4 rounded">Registration</Link>
 
    </div>
  );
}

