import axios from 'axios';
import React, { useState, useEffect } from "react";

function Information({ budget, totalExpenses, balance})
{
    return (
        <>
            <div className="flex justify-evenly bg-blue-200 mt-8 rounded-md">
                <div className="flex flex-col">
                    <h4>Total Budget</h4>
                    <p>{budget}</p>
                </div>
                <div className="flex flex-col">
                    <h4>Expenses</h4>
                    <p>{totalExpenses}</p>
                </div>
                <div className="flex flex-col">
                    <h4>Balance</h4>
                    <p>{balance}</p>
                </div>
            </div>
        </>
    )
}

export default Information;