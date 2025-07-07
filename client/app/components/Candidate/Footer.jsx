// components/Footer.js
const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-10 px-6 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                InterviewHub
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Professional interview management platform connecting top talent with leading companies worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">For Candidates</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Interview Prep</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Career Advice</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Resume Builder</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Profile Settings</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Events</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Press</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2023 InterviewHub. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Help Center</a>
            <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;