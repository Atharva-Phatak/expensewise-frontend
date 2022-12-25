import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function Signup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({
      name: "",
      email: "",
      passowrd: "",
      confirmPassword: "",
    });

    const res = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      setError(data.errors);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      props.closeModalSignup();
      navigate("/dashboard");
    }
  };
  return (
    <div>
      <div className="p-6 bg-black text-rose-600 rounded-xl font-lexend">
        <h1 className="font-bold text-2xl ">SIGN UP</h1>
        <p className="">Please fill this to create an account</p>
        <hr className="my-4"></hr>
        <div className="grid grid-cols-12">
          <label
            htmlFor="email"
            className="font-bold flex items-center col-span-4"
          >
            Name
          </label>
          <input
            value={user.name}
            onChange={(e) => {
              const tempUser = { ...user };
              tempUser.name = e.target.value;
              setUser(tempUser);
            }}
            type="text"
            placeholder="Enter Name"
            className="p-2 m-2 inline-block outline-none bg-white col-span-8 rounded-sm text-black placeholder-black"
          />
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.name}
          </span>
        </div>
        <div className="grid grid-cols-12">
          <label
            htmlFor="email"
            className="font-bold flex items-center col-span-4"
          >
            Email
          </label>
          <input
            value={user.email}
            onChange={(e) => {
              const tempUser = { ...user };
              tempUser.email = e.target.value;
              setUser(tempUser);
            }}
            type="text"
            placeholder="Enter Email"
            className="p-2 m-2 inline-block outline-none  col-span-8 bg-white text-black rounded-sm placeholder-black"
          />
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.email}
          </span>
        </div>

        <div className="grid grid-cols-12 ">
          <label
            htmlFor="password"
            className="font-bold flex items-center col-span-4"
          >
            Password
          </label>
          <input
            value={user.password}
            onChange={(e) => {
              const tempUser = { ...user };
              tempUser.password = e.target.value;
              setUser(tempUser);
            }}
            type="password"
            placeholder="Enter Password"
            name="password"
            className="p-2 m-2 inline-block outline-none  col-span-8 bg-white text-black rounded-sm placeholder-black"
          ></input>
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.password}
          </span>
        </div>

        <div className="grid grid-cols-12">
          <label
            htmlFor="confirm-password"
            className="font-bold flex items-center col-span-4"
          >
            Confirm Password
          </label>
          <input
            value={user.confirmPassword}
            onChange={(e) => {
              const tempUser = { ...user };
              tempUser.confirmPassword = e.target.value;
              setUser(tempUser);
            }}
            type="password"
            placeholder="Confirm Password"
            name="Confirm-Password"
            className="p-2 m-2 inline-block outline-none bg-white text-black col-span-8  rounded-sm placeholder-black"
          ></input>
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.confirmPassword}
          </span>
        </div>

        <p className="">
          By creating an account you agree to our{" "}
          <a className="text-rose-600">terms and conditions</a>
        </p>
        <div className="mt-4">
          {isLoading ? (
            <ReactLoading
              type="bubbles"
              color="#F5A302"
              height={50}
              width={50}
            />
          ) : (
            <button 
              onClick={handleSignup}
              className="px-10 py-3 bg-rose-600 text-white border border-white rounded-md hover:bg-rose-300 hover:text-black">
              <span className="font-bold text-lg ">Sign Up</span>
            </button>
          )}
        </div>
        <span className="flex justify-center py-2">
          <span className="pr-1">Already have an Account, </span>
          <span
            className="text-rose-600 cursor-pointer"
            onClick={() => {
              props.closeModalSignup();
              props.openModalLogin();
            }}
          >
            Log In
          </span>
        </span>
      </div>
    </div>
  );
}
