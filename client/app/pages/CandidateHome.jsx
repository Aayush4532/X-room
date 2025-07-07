"use client";
import { useState } from 'react';
import Header from '../components/Candidate/Header';
import HeroSection from '../components/Candidate/HeroSection';
import JoinMeetingCard from '../components/Candidate/MeetingCard';
import InterviewList from '../components/Candidate/InterviewList';
import QuickActions from '../components/Candidate/QuickActions';
import StatsCard from '../components/Candidate/StatsCard';
import Footer from '../components/Candidate/Footer';

export default function CandidatePortal() {
  const [meetingCode, setMeetingCode] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const interviews = {
    upcoming: [
      {
        id: 1,
        title: "Frontend Developer - Technical Interview",
        company: "TechCorp Inc.",
        time: "Today, 3:00 PM - 4:00 PM",
        status: "starting soon",
        statusColor: "bg-green-500"
      },
      {
        id: 2,
        title: "Senior UX Designer - Portfolio Review",
        company: "DesignHub",
        time: "Tomorrow, 11:30 AM - 12:30 PM",
        status: "scheduled",
        statusColor: "bg-yellow-500"
      },
      {
        id: 3,
        title: "Product Manager - Case Study Discussion",
        company: "InnovateCo",
        time: "June 15, 2:00 PM - 3:00 PM",
        status: "scheduled",
        statusColor: "bg-yellow-500"
      }
    ],
    completed: [
      {
        id: 4,
        title: "Full Stack Developer - Coding Challenge",
        company: "CodeMasters",
        time: "June 1, 10:00 AM - 11:00 AM",
        status: "completed",
        statusColor: "bg-blue-500"
      },
      {
        id: 5,
        title: "Backend Engineer - System Design",
        company: "CloudTech",
        time: "May 28, 2:30 PM - 3:30 PM",
        status: "completed",
        statusColor: "bg-blue-500"
      }
    ]
  };

  const joinMeeting = () => {
    if (!meetingCode.trim()) {
      alert("Please enter a meeting code!");
      return;
    }
    alert(`Joining meeting: ${meetingCode}`);
    // In a real app, this would redirect to the meeting
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      
      <HeroSection />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <JoinMeetingCard 
          meetingCode={meetingCode} 
          setMeetingCode={setMeetingCode} 
          joinMeeting={joinMeeting} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2">
            <InterviewList 
              interviews={interviews} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
          </div>
          
          <div className="space-y-6">
            <QuickActions />
            <StatsCard upcoming={3} completed={12} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}