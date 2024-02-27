"use client";
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    ShowPreview(e);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const ShowPreview = (e) => {
    var src = URL.createObjectURL(e.target.files[0]);
    var preview = document.getElementById("profile-image-preview");
    preview.src = src;
    preview.style.display = "flex";
  };

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password,image);

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
            <h1>Opret en konto</h1>

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
            <h4>Profil billede </h4>
            <input type="file" onChange={handleImageChange} />

            <img
              id={"profile-image-preview"}
              className="image-preview"
              src={""}
            />

            <button type="submit">Opret</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
