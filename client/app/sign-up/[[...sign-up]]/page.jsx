"use client";
import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  

  return (
     <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-black to-[#24243e] text-white px-4">
      <div className="h-screen w-screen flex justify-center items-center"><SignUp forceRedirectUrl="/CompleteProfile"/></div>
    </div>
  );
}