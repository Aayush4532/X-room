"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
// import Home from "./pages/Home";
import CandidatePortal from "./pages/CandidateHome";



const page = () => {
  const { isSignedIn, user } = useUser();
  return (
    <>
      <CandidatePortal />
    </>
  );
};
export default page;