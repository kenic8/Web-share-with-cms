"use client";
import React from "react";
import { adminsignUp } from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function Adminsignup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const ownerid = searchParams.get("id");


  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await adminsignUp(email, password,ownerid);

    if (error) {
      return (alert(error));
    }
    // else successful
    console.log(result);
    return router.push("/");
  };
  return (
    <div className="frontpage-grid">
      {/* <img className="login-img" src="../images/background.jpg"></img> */}
      <div className="wrapper">
        <div className="form-wrapper-signin">
          <form onSubmit={handleForm} className="form">
            <h1> Velkommen!</h1>
            <h2> Opret dit login </h2>
            <p> Dit ID : {ownerid}</p>

            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
        

            <button type="submit">Opret</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Adminsignup;
