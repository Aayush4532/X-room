"use client";
import React from "react";
import Hero from "./components/LandingPage/Hero";
import {useUser} from "@clerk/nextjs";
const page = () => {
  // const {isSignedIn} = useUser();
  return (
    <>
      {/* {
        isSignedIn ?<div>kuchh bhi</div> : <div><Hero /></div>
      } */}
      <Hero />
    </>
  );
};
export default page;