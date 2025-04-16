import React from 'react';
import Link from 'next/link';

import { signup } from './action';
import Register from './RegisterForm'
const page = () => {
    return (
        // <form action={signup}>
        //     <div className="flex flex-col justify-center items-center gap-4 h-screen">
        //         <input
        //             required
        //             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //             name="name"
        //             placeholder="Name"
        //             type="text"
        //         />
        //         <input
        //             required
        //             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //             name="email"
        //             placeholder="Email"
        //             type="email"
        //         />
        //         <input
        //             required
        //             className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //             name="password"
        //             placeholder="Password"
        //             type="password"
        //         />
        //         <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-white transition-colors" type="submit">
        //             Signup
        //         </button>
        //         <div>
        //             Already have an account?
        //             <Link className="ml-2 text-blue-500" href="/signin">
        //                 Sign in
        //             </Link>
        //         </div>
        //     </div>
        // </form>
        <Register />
    );
};

export default page;
