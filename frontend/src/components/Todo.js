import React from 'react'

export default function Todo(props) {
  const {_id,
    title, isCompleted}=props.task
  return (
    <div className='Todo'>
      <p>TITLE: {title}</p>
      <input type="checkbox" checked={isCompleted} />
      <span style={{ textDecoration:isCompleted?'line-through':"none" }}>{title}</span>
      <button>X</button>
    </div>
  )
}