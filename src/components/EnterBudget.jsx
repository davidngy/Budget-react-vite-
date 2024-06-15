
import React, { useState, useEffect } from "react";
import axios from 'axios';

function EnterBudget({budgetId, onBudgetChange})
{
    const [inputValue, setInputValue] = useState(0)

    const enterBudget = async (event) =>
    {
        event.preventDefault();
        if (!inputValue) {
            console.log('Input value is empty');
            return;
        }
        console.log("this is the sending budget:", inputValue);
        try
        {
            const response = await axios.post('http://localhost:3001/api/budgets/', {
                total_budget: inputValue,
                budget_id: budgetId
            }, {
                withCredentials: true
            });
            setInputValue('');
            onBudgetChange();
            console.log("response:", response);
        } catch (error) 
        {
            console.error('Error setting budget:', error.repsone ? error.response.data : error.message);
            alert('Failed to set budget. Please try again.');
        }
    }


    const handleChange = (event) =>
    {
        const value = parseFloat(event.target.value);
        setInputValue(value);
    }
    
    return (
        <>
            <div className="shadow-lg flex flex-col items-start">
                <h2 className="m-2">Budget</h2>
                <form onSubmit={enterBudget} className="flex flex-col">
                    <input 
                    type="number" 
                    value={inputValue}
                    onChange={handleChange}
                    className="outline-none border-gray-500 border-2 rounded-sm w-4/6 m-2" />
                    <button type="submit" className="text-center border-black border-2 rounded-sm w-2/5 m-2">Set Budget</button>
                </form>
            </div>
        </>
    )
}

export default EnterBudget;