import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">        
      <h1 className="text-4xl font-bold">Welcome to Personal Finance Manager</h1>
      <p className="mt-4 text-lg">Track your expenses and manage your budget easily.</p>
      <div className="mt-6">
        <Link to="/dashboard" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-800">Go to Dashboard</Link>
      </div>
      </div>
    );
  };
  
  export default Home;
  