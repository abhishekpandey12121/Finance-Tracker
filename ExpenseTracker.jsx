import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2"; // Import Chart.js
import axios from "axios"; // For backend requests

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);  
  const [description, setDescription] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [salary, setSalary] = useState("");
  const [expense, setExpense] = useState("");
  const [savings, setSavings] = useState("");

  // Load transactions from local storage when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
        const userId = localStorage.getItem("userId"); // Get user ID
        if (userId) {
          const res = await axios.get(`http://localhost:5000/api/transactions/${userId}`);
          setTransactions(res.data);
        }
      };
      fetchTransactions();
    }, []);
  
    const addTransaction = async () => {
      if (month && date && salary && expense && savings) {
        const newTransaction = { month, date, salary, expense, savings };
        
        setTransactions([...transactions, newTransaction]);
  
        const userId = localStorage.getItem("userId");
        await axios.post("http://localhost:5000/api/transactions", {
          userId,
          ...newTransaction,
        });
  
        setMonth("");
        setDate("");
        setSalary("");
        setExpense("");
        setSavings("");
      }
    };
  
    // Data for Chart
    const chartData = {
      labels: transactions.map((t) => t.month),
      datasets: [
        {
          label: "Salary",
          data: transactions.map((t) => t.salary),
          backgroundColor: "green",
        },
        {
          label: "Expense",
          data: transactions.map((t) => t.expense),
          backgroundColor: "red",
        },
        {
          label: "Savings",
          data: transactions.map((t) => t.savings),
          backgroundColor: "blue",
        },
      ],
    };
  
    return (
      <div className="min-h-screen bg-gray-700 text-white p-6">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        
        <div className="mt-4">
          <input type="text" placeholder="Month" value={month} onChange={(e) => setMonth(e.target.value)} className="p-2 rounded border text-black"/>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 ml-2 rounded border text-black"/>
          <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="p-2 ml-2 rounded border text-black"/>
          <input type="number" placeholder="Expense" value={expense} onChange={(e) => setExpense(e.target.value)} className="p-2 ml-2 rounded border text-black"/>
          <input type="number" placeholder="Savings" value={savings} onChange={(e) => setSavings(e.target.value)} className="p-2 ml-2 rounded border text-black"/>
          
          <button onClick={addTransaction} className="ml-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-800">Add</button>
        </div>
  
        {/* Display Transactions */}
        <ul className="mt-4">
          {transactions.map((t, index) => (
            <li key={index} className="border-b py-2">
              {t.month} {t.date}: Salary ₹{t.salary} | Expense ₹{t.expense} | Savings ₹{t.savings}
            </li>
          ))}
        </ul>
  
        {/* Chart */}
        <div className="mt-6">
          <Bar data={chartData} />
        </div>
      </div>
    );
  };
  
export default ExpenseTracker;
