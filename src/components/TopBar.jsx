import React from "react";
import { Link } from "react-router-dom"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function TopBar()
{
  let navigate = useNavigate();
  const handleLogout = async () =>
    {
      console.log("clicked!")
      try
      {
        const response = await axios.post('http://localhost:3001/api/auth/logout',{}, {
          withCredentials: true
        })

        if(response.status === 200)
          {
            console.log("logged out!")
            navigate('/');
          }
        else{
          alert('logout failed');
        }
      }
      catch(error)
      {
        console.log(error);
      }
    }
    return (
        <>
        <nav class="bg-gray-800">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    

        <div class="hidden sm:ml-6 h-16 sm:flex sm:justify-between sm:items-center">
          <div class="flex">
            <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Planner</a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">History</a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
          </div>
          <div className="flex">
            <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Log In</Link>
            <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Register</Link>
            <button type="submit" onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Logout</button>
        </div>
        </div>
      
  </div>

 
  <div class="sm:hidden" id="mobile-menu">
    <div class="space-y-1 px-2 pb-3 pt-2">
      <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
    </div>
  </div>
</nav>

        </>
    )
}

export default TopBar;