"use client";

import Nav from "../components/nav";
import Signin from "./page";
import withAuth from "../components/auth/withAuth";

export default function signIn() {
  return(
    <>
      <Nav />
      <Signin />
    </>
  );
}