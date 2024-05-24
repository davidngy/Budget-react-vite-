import { useState } from 'react'
import React from 'react'
import '../App.css'
import TopBar from '../components/TopBar'
import Expenses from '../components/Expenses'
import EnterBudget from '../components/EnterBudget'
import Information from '../components/Information'
import ExpensesList from '../components/ExpensesList'


function Planner() {
  const [budget, setBudget] = useState(0)
  const [expenseEntries, setExpenseEntries] = useState([]);
  
  const handleAddExpense = (itemValue, priceValue) =>
  {
    const newExpense = {
      id: Date.now(),
      itemValue,
      priceValue
    };
    setExpenseEntries(prevEntries => [...prevEntries, newExpense])
  }

  const handleDeleteExpense = (id) =>
  {
    setExpenseEntries(prevEntries => prevEntries.filter(entry => entry.id !== id))
  }

  const handleEditExpense = (id, newItemValue, newPriceValue) =>
  {
    setExpenseEntries(prevEntries => prevEntries.map(entry =>
    {
      if(entry.id === id)
      {
        return {...entry, itemValue: newItemValue, priceValue: newPriceValue}
      }
      return entry;
    }))
  }
  return (
    <>
    <TopBar></TopBar>
    <div className='grid grid-cols-2 gap-8'>
      <EnterBudget onSetBudget={setBudget}></EnterBudget>
      <Expenses onAddExpense={handleAddExpense}></Expenses>
    </div>
    <Information budget={budget} expenses={expenseEntries.reduce((sum, entry) => sum + entry.priceValue,  0)}></Information>
    <ExpensesList entries={expenseEntries} onDelete={handleDeleteExpense} onEdit={handleEditExpense}></ExpensesList>
    </>
  )
}

export default Planner
