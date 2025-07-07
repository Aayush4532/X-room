// components/Header.js
import { useState } from 'react';

const Header = () => {
  const [notifications, setNotifications] = useState(3);
  
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          InterviewHub
        </h1>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-700 transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notifications > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <div>
            <p className="text-sm font-medium">Amit Kumar</p>
            <p className="text-xs text-gray-400">Candidate</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white">
            AK
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;