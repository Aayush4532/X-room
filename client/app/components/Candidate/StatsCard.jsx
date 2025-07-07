// components/StatsCard.js
const StatsCard = ({ upcoming, completed }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
      <h2 className="text-lg font-bold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Your Stats
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-5 text-center border border-gray-700">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-3xl font-bold">{upcoming}</div>
          <div className="text-gray-400 text-sm mt-1">Upcoming</div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-5 text-center border border-gray-700">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-3xl font-bold">{completed}</div>
          <div className="text-gray-400 text-sm mt-1">Completed</div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Success Rate</span>
          <span className="font-medium">78%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;