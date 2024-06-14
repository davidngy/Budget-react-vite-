import React, { useState } from "react";
import axios from "axios";

function Expenses({ budgetId, onExpenseChange }) {
    const [itemValue, setItemValue] = useState('');
    const [priceValue, setPriceValue] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newExpense = {
            budget_id: budgetId,
            description: itemValue,
            amount: parseFloat(priceValue)
        };
        try {
            const response = await axios.post('http://localhost:3001/api/expenses', newExpense, {
                withCredentials: true 
            });
            console.log(response);
            setItemValue('');
            setPriceValue('');
            onExpenseChange();
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    const handleChangeItem = (event) => {
        setItemValue(event.target.value);
    };

    const handleChangePrice = (event) => {
        setPriceValue(event.target.value);
    };

    return (
        <>
            <div className="shadow-lg flex flex-col items-start">
                <h2 className="m-2">Expenses</h2>
                <form onSubmit={handleSubmit} className="flex flex-col mt-4">
                    <input 
                        type="text"
                        value={itemValue}
                        onChange={handleChangeItem}
                        placeholder='Item'
                        className="outline-none border-gray-500 border-solid border-2 rounded-sm w-4/6 m-2" 
                    />
                    <input 
                        type="number" 
                        value={priceValue} 
                        onChange={handleChangePrice}
                        placeholder='Price' 
                        className="outline-none border-gray-500 border-solid border-2 rounded-sm w-4/6 m-2" 
                    />
                    <button type="submit" className="text-center border-black border-2 rounded-sm w-1/5 m-2">
                        Add
                    </button>
                </form>
            </div>
        </>
    );
}

export default Expenses;
