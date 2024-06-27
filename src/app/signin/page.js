'use client';

import Footer from '../components/footer';
import Nav from '../components/nav';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function submit(e) {
    console.log('in submit');
    console.log(email, password, 'chjhgh');
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://api.realworld.io/api/users/login',
        {
          user: {
            email: email,
            password: password,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response, 'res');
      localStorage.setItem('token', response.data.user.token);
      router.push('/');
    } catch (err) {
      console.log(err, 'error');
    }
  }

  function handleOnChange(e) {
    if (e.target.name === 'email') {
      console.log(e.target.value, 'email');
      setEmail(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }
  

  return (
    <>
      <Nav />
      <div className="signin">
        <h2>Sign in</h2>
        <Link className="signin_para" href="/signup">
          <li>Need an account?</li>
        </Link>
        <form className="submit" onSubmit={submit}>
          <div className="input-box">
            <input
              name="email"
              className="input-text"
              type="email"
              placeholder="Email"
              onChange={handleOnChange}
            />
            <input
              name="password"
              className="input-text"
              type="password"
              placeholder="Password"
              onChange={handleOnChange}
            />
            <div className="button">
              <button className="reg_btn" type="submit">
                Sign in
              </button>
            </div>
          </div>
          <Footer />
        </form>
      </div>
    </>
  );
}
