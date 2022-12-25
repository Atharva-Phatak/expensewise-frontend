import React from "react";

export default function Contact() {
  return (
    <div>
      <div className="h-3/4 bg-black w-3/5 p-10 rounded-md mx-auto">
        <div className="mx-auto w-fit">
          <div className="text-center mb-10 text-3xl text-rose-600 font-bold font-lexand">
            Contact Us
          </div>
          <div className="ml-auto mb-10 flex">
            <h1 className="mr-5 text-xl font-lexand text-rose-600 mt-1">
              Email :
            </h1>
            <input
              placeholder="Enter Email"
              className="text-black p-2 bg-white h-10 w-3/4 rounded-md ml-1"
              type="email"
            ></input>
          </div>
          <div className="ml-auto mb-10 flex">
            <h1 className="mr-5 text-xl font-lexand text-rose-600 mt-1">
              Name :
            </h1>
            <input
              placeholder="Enter Name"
              className="text-black p-2 bg-white h-10 w-3/4 rounded-md"
              type="name"
            ></input>
          </div>
          <div>
            <h1 className="mr-5 text-xl font-lexand text-rose-600 mt-1">
              Description :
            </h1>
            <textarea className="text-black p-2 bg-white w-[34rem] rounded-md h-40"></textarea>
          </div>
          <div className="mt-2">
            <button className="px-10 py-3 bg-rose-600 text-white border border-white rounded-md hover:bg-rose-300 hover:text-black">
              <span className="font-bold text-lg ">SEND</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}