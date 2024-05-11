
import React, { useState } from "react";

function EnterBudget({onSetBudget})
{
    const [inputValue, setInputValue] = useState('');

    const enterBudget = (event) =>
    {
        event.preventDefault();
        onSetBudget(inputValue);
        setInputValue('')
    }
    const handleChange = (event) =>
    {
        setInputValue(parseFloat(event.target.value))
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