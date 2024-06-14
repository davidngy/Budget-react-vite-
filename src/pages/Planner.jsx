import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import '../App.css';
import TopBar from '../components/TopBar';
import Expenses from '../components/Expenses';
import EnterBudget from '../components/EnterBudget';
import Information from '../components/Information';
import ExpensesList from '../components/ExpensesList';
import axios from 'axios';

function Planner() {
  const { budgetId } = useParams();
  const [budget, setBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  const fetchInformation = async () => 
  {
    try
    {
      const response = await axios.get(`http://localhost:3001/api/budgets/balance/${budgetId}`, {
        withCredentials: true
      });
      setBudget(response.data.total_budget);
      setTotalExpenses(response.data.totalExpenses);
      setBalance(response.data.balance);
    }
    catch(error)
    {
      console.log("Failed the fetch for budget, balance and expenses", error);
    }
  }

  useEffect(() => 
  {
    fetchInformation();
  }, [budgetId]);

  const handleBudgetChange = async () =>
  {
    await fetchInformation();
  }

  const handleExpenseChange = async () =>
    {
      await fetchInformation();
    }


  return (
    <>
      <TopBar />
      <div className='grid grid-cols-2 gap-8'>
        <EnterBudget budgetId={budgetId} onBudgetChange={handleBudgetChange} />
        <Expenses budgetId={budgetId}  onExpenseChange={handleExpenseChange}/>
      </div>
      <Information budgetId={budgetId} budget={budget} totalExpenses={totalExpenses} balance={balance} />
      <ExpensesList onExpenseChange={handleExpenseChange} budgetId={budgetId} />
    </>
  );
}

export default Planner;
