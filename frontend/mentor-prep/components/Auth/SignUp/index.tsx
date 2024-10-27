"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); // Initial state, dropdown is not selected

  const router = useRouter();
  const handleSignup = async (e: React.FormEvent) => {


    e.preventDefault();

    try {
        const response = await fetch('https://mentor-prep-rest-api.onrender.com/api/v1/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            username: username,
            password: password,
            email: email,
            role: role,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          router.replace("/")
          console.log('API Response:', data);
  
          // Reset the form after successful signup
          setName('');
          setUsername('');
          setPassword('');
          setEmail('');
          setRole('');
        } else {
          console.error('Sign Up failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error during Sign Up:', error);
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-2">
            Role:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </label>
          <div className='mb-2'>Already have an account? <Link className='text-blue-600' href={`/login`}>Login</Link></div>
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;