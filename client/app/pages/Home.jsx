"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CandidateHome from "./CandidateHome";
import Hero from "../components/LandingPage/Hero";
import Loader from "../components/Loader";
import HrHome from "./HrHome";

const Home = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [role, setRole] = useState(null);
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const getRole = async () => {
      try {
        const res = await fetch("/checkUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerkId: user.id }),
        });
        const data = await res.json();
        setRole(data?.role ?? null);
      } catch (err) {
        console.error("Role fetch failed:", err);
      }
    };

    getRole();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return <Loader />;
  }

  if (!isSignedIn) {
    return <Hero />;
  }

  return (
    <div>
      {role === "Hr" ? (
        <div> <HrHome /> </div>
      ) : (
        <div><CandidateHome /></div>
      )}
    </div>
  );
};

export default Home;