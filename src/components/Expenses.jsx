import React from "react";
import { useState } from "react";

function Expenses({onAddExpense})
{
    const[itemValue, setItemValue] = useState('');
    const[priceValue, setPriceValue] = useState('');
    
    
    const handleSubmit = (event) =>
    {
        event.preventDefault();
        onAddExpense(itemValue, parseFloat(priceValue));
        setItemValue('');
        setPriceValue('')
    }
    const handleChangeItem = (event) =>
    {
        setItemValue(event.target.value);
    }

    const handleChangePrice = (event) =>
    {
        setPriceValue(parseFloat(event.target.value));
    }
    return (
        <>
            <div className="shadow-lg flex flex-col items-start">
                <h2 className="m-2">Expenses</h2>
                <form onSubmit={handleSubmit} className="flex flex-col mt-4">
                    <input 
                    type="text"
                    value={itemValue}
                    onChange={handleChangeItem}
                    placeholder='item'
                    className="outline-none border-gray-500 border-solid border-2 rounded-sm w-4/6 m-2" />
                    <input 
                    type="number" 
                    value={priceValue} 
                    onChange={handleChangePrice}
                    placeholder='price' 
                    className="outline-none border-gray-500 border-solid border-2 rounded-sm w-4/6 m-2" />
                    <button type="submit" className="text-center border-black border-2 rounded-sm w-1/5 m-2">Add</button>
                </form>
            </div>
        </>
    )
}

export default Expenses