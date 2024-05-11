import React, { useState } from "react";
import EditExpense from "./EditExpense";

function ExpensesList({entries, onEdit, onDelete})
{
    const [editingId, setEditingId] = useState(null);

    const startEdit = (entry) =>
    {
        setEditingId(entry.id)
    }

    const saveEdit = (id, newItemValue, newPriceValue) =>
    {
        onEdit(id, newItemValue, newPriceValue);
        setEditingId(0)
    }
    return (
        <>
            <div className="border-2 border-black mt-8">
                <h4 className="text-start">Expenses List</h4>
                <div>
                    {entries.map((entry, index) =>(
                        <div key={index} className="grid grid-cols-3 text-start ml-4 ">
                            {editingId === entry.id ? (
                                <EditExpense expense={entry} onSave={saveEdit} />
                            ) : (
                                <>
                                <p className="border-blue-400 border-l-2 my-2 pl-2">{entry.itemValue}</p>
                                <p>{entry.priceValue} €</p>
                                <div>
                                    <box-icon name='edit' type='solid' onClick={() => startEdit(entry)}></box-icon>
                                    <box-icon type='solid' name='trash' onClick={() => onDelete(entry.id)}></box-icon>
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