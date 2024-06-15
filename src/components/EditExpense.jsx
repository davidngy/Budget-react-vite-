import React, {useState} from 'react'

function EditExpense({ expense, onSave })
{
    const [description, setDescription] = useState(expense.description);
    const [amount, setAmount] = useState(expense.amount);
    
    const handleSave = (e) => {
        e.preventDefault();
        onSave(description, amount);
    };

  return (
    <div>
        <form  className='grid grid-cols-3 text-start ml-4'>
            <input type="text" className="border-blue-400 border-l-2 my-2 pl-2" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))}/>
            <button type='submit' onClick={handleSave}>save</button>
        </form>
    </div>
  )
}

export default EditExpense