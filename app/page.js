'use client'
import Link from 'next/link';
import React from 'react'
import { useReducer, useState } from 'react';
import { FaInstagram, FaLinkedin, FaPlus, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

//Reducer function to manage the todo app state

function todoReducer(state, action){
  //switch case for different actions
  switch(action.type){
    case 'ADD_TODO':
      return [...state, {id: Date.now(), text: action.payload, completed: false, cancelled: false}];
    case 'TOGGLE_TODO':
      return state.map((todo) => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo);
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    case 'CLEAR_COMPLETED':
      return state.filter((todo)=> !todo.completed);
    case 'CANCELLED':
      return state.filter((todo) => todo.cancelled);
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}



export default function todo() {
  //state for managing todo
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState('');

  //add todo
  const handleAddTodo = () =>{
    if(text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text});
      setText('')
    }
  }

  return (
    <div className="md:min-h-screen bg-slate-400 text-slate-800 flex justify-center items-center">
      <div className="w-full h-[100dvh] md:h-fit bg-white p-6 max-w-md rounded shadow-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold">ToDo App</h1>
        
        {/* input to add todo */}
        <div className="flex gap-2">
          <input 
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task here ..."
          className="border border-teal-600 focus:outline-teal-800 px-4 py-2 rounded-md md:flex-1 text-slate-700"
          ></input>
          <button onClick={handleAddTodo} className="py-2 px-4 bg-teal-900 text-white rounded-md"><FaPlus/></button>

        </div>

        {/* Display todos */}
        <ul className="list-none space-y-2">
          {todos.map((todo)=> (
            <li
            key={todo.id}
            className={`flex justify-between items-center p-2 rounded-md ${
              todo.completed ? 'bg-green-100 line-through' : 'bg-gray-100'
            }`}
            >
              <span
              onClick={()=>dispatch({type: 'TOGGLE_TODO', payload: todo.id})}
              className="cursor-pointer"
              >{todo.text}</span>

              <button
              onClick = {()=> dispatch({type: 'DELETE_TODO', payload: todo.id })}
              className = "text-red-500"
              >Delete</button>
            </li>
          ))}
        </ul>
        
        {/* Clear completed button */}
        {todos.some((todo) => todo.completed) && (
          <button
          onClick={()=> dispatch({type: 'CLEAR_COMPLETED'})}
          className ="bg-red-500 text-white py-2 px-4 rounded-md"
          >Clear Completed Tasks</button>
        )}

        <div className="text-gray-400">
          <span className=" w-full text-xs">Developed by VicITug</span>
          <div className="flex gap-2 text-2xl">
            <a href="https://www.linkedin.com/in/nuwarimpa-victor-44806629a/"><FaLinkedin/></a>
            <a href="https://x.com/i/flow/login?redirect_after_login=%2Fvicitug"><FaXTwitter/></a>
            <a href="https://www.instagram.com/vicitug_official/"><FaInstagram/></a>
          </div>
        </div>
      </div>

    </div>
  )
}
