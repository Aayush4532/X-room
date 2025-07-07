// components/InterviewList.js
import InterviewListItem from './InterviewListItem';

const InterviewList = ({ interviews, activeTab, setActiveTab }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button 
          className={`py-4 px-6 font-medium flex-1 text-center ${activeTab === 'upcoming' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upcoming Interviews
          </span>
        </button>
        <button 
          className={`py-4 px-6 font-medium flex-1 text-center ${activeTab === 'completed' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('completed')}
        >
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Completed Interviews
          </span>
        </button>
      </div>
      
      {/* Interview List */}
      <div className="p-6">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-medium">
            {activeTab === 'upcoming' ? 'Your Upcoming Interviews' : 'Completed Interviews'}
          </h3>
          <div className="text-sm text-gray-400">
            {interviews[activeTab].length} {activeTab === 'upcoming' ? 'scheduled' : 'completed'}
          </div>
        </div>
        
        {interviews[activeTab].length > 0 ? (
          <div className="space-y-4">
            {interviews[activeTab].map(interview => (
              <InterviewListItem key={interview.id} interview={interview} activeTab={activeTab} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No {activeTab} interviews found</p>
            <p className="text-sm mt-2">
              {activeTab === 'upcoming' 
                ? 'You currently have no upcoming interviews scheduled.' 
                : 'Your completed interviews will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewList;