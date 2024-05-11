import React from "react";
import { useState } from "react";

function Information({budget, expenses})
{
    const balance = budget - expenses;

    return (
        <>
            <div className="flex justify-evenly bg-blue-200 mt-8 rounded-md">
                <div className="flex flex-col">
                    <h4>Total Budget</h4>
                    <p>{budget}</p>
                </div>
                <div className="flex flex-col">
                    <h4>Expenses</h4>
                    <p>{expenses}</p>
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