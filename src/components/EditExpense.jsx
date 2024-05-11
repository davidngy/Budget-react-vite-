import React, {useState} from 'react'

function EditExpense({ expense, onSave })
{
    const [itemValue, setItemValue] = useState(expense.itemValue);
    const [priceValue, setPriceValue] = useState(expense.priceValue);
    
    const handleSubmit = (event) =>
    {
        event.preventDefault()
        onSave(expense.id, itemValue, parseFloat(priceValue));
    }

    const handlePriceChange = (event) =>
    {
        setPriceValue(parseFloat(event.target.value));
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className='grid grid-cols-3 text-start ml-4'>
            <input type="text" className="border-blue-400 border-l-2 my-2 pl-2" value={itemValue}  onChange={e => setItemValue(e.target.value)}/>
            <input type="number" value={priceValue} onChange={handlePriceChange}/>
            <button type='submit'>save</button>
        </form>
    </div>
  )
}

export default EditExpense