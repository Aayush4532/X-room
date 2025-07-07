// components/HeroSection.js
const HeroSection = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Welcome to Your Interview Portal
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Join scheduled interviews, review upcoming sessions, and manage your candidate profile all in one place. Get ready to showcase your skills!
        </p>
        
        <div className="flex justify-center gap-4">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl flex items-center transition-all duration-300 transform hover:-translate-y-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Start Practice Interview
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl flex items-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Upload Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;