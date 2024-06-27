'use client';

import Footer from '../components/footer';
import Nav from '../components/nav';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function submit(e) {
    console.log('in submit');
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://api.realworld.io/api/users',
        {
          user: {
            username: username,
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
      console.log(response);
      router.push('/signin');
    } catch (err) {
      console.log(err, 'error');
    }
  }

  function handleOnChange(e) {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    }
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  return (
    <>
      <Nav />
      <div className="signup">
        <h2>Sign up</h2>
        <Link className="signup_para" href="/signin">
          <li>Have an account?</li>
        </Link>
        <form className="submit" onSubmit={submit}>
          <div className="input-box">
            {/* <div className="input-info"> */}
            <input
              className="input-text"
              type="text"
              placeholder="Username"
              onChange={handleOnChange}
              name="username"
            ></input>
            <input
              className="input-text"
              type="email"
              placeholder="Email"
              onChange={handleOnChange}
              name="email"
            ></input>
            <input
              className="input-text"
              type="password"
              placeholder="Password"
              onChange={handleOnChange}
              name="password"
            ></input>
            <button className="reg_btn" type="submit">
              Sign up
            </button>
            {/* </div> */}
            {/* <div className="button">
            <button className="reg_btn" type="submit">Sign up</button>
          </div> */}
            {/* </form> */}
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
}
