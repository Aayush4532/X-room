import React from 'react';
import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';

export default function Hero() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <main className="flex-1">
        <Main />
      </main>
      <Footer />
    </div>
  );
}