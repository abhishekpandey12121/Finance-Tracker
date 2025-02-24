import React from "react";
import ExpenseTracker from "./ExpenseTracker";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <ExpenseTracker />
        </div>
    
  );
};

export default Dashboard;
