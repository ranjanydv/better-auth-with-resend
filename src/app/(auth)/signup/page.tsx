import React from 'react';
import { signup } from './action';
import Link from 'next/link';
const page = () => {
    return (
        <form action={signup}>
            <div className="flex flex-col justify-center items-center gap-4 h-screen">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-white transition-colors">
                    Signup
                </button>
                <div>
                    Already have an account?
                    <Link className='ml-2 text-blue-500' href="/signin">Sign in</Link>
                </div>
            </div>
        </form>
    );
};

export default page;
