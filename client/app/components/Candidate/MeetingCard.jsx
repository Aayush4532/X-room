// components/JoinMeetingCard.js
const JoinMeetingCard = ({ meetingCode, setMeetingCode, joinMeeting }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Join an Interview
        </h2>
        <div className="text-sm bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full">
          Candidate Access
        </div>
      </div>
      
      <p className="text-gray-400 mb-6">
        Enter the meeting code provided by your interviewer to join your scheduled interview session.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          value={meetingCode}
          onChange={(e) => setMeetingCode(e.target.value)}
          placeholder="e.g. abc-xyz-123"
          className="flex-1 bg-gray-700 border border-gray-600 rounded-xl py-4 px-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          onClick={joinMeeting}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all py-4 px-8 rounded-xl font-medium flex items-center justify-center transform hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Join Now
        </button>
      </div>
      
      <div className="text-gray-500 text-sm flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Next interview starts in 2 hours 15 minutes
      </div>
    </div>
  );
};

export default JoinMeetingCard;