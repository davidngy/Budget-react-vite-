import React, { useState, useEffect } from "react";
import axios from "axios";
import EditExpense from "./EditExpense";

function ExpensesList({ budgetId, onExpenseChange  })
{
    const [editingId, setEditingId] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const fetchExpenses = async () => {
        try 
        {
            const response = await axios.get(`http://localhost:3001/api/expenses/${budgetId}`, {
                withCredentials: true
            });
            setExpenses(response.data);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, [budgetId]);

    useEffect(() => {
        if(onExpenseChange)
            {
                fetchExpenses();
            }
    },[onExpenseChange])
    
    const startEdit = (entry) =>
    {
        setEditingId(entry.id)
    }

    const saveEdit = (id, newItemValue, newPriceValue) =>
    {
        onEdit(id, newItemValue, newPriceValue);
        onExpenseChange();
        setEditingId(0)
    }
    return (
        <>
            <div className="border-2 border-black mt-8">
                <h4 className="text-start">Expenses List</h4>
                <div>
                {expenses.map(expense => (
                        <div key={expense._id} className="grid grid-cols-3 text-start ml-4 ">
                            {editingId === expense._id ? (
                                <EditExpense expense={expense} onSave={saveEdit} />
                            ) : (
                                <>
                                    <p className="border-blue-400 border-l-2 my-2 pl-2">{expense.description}</p>
                                    <p>{expense.amount} €</p>
                                    <div>
                                        <box-icon name='edit' type='solid' onClick={() => startEdit(expense)}></box-icon>
                                        {/*<box-icon type='solid' name='trash' onClick={() => onDelete(expense._id)}></box-icon>*/}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ExpensesList;