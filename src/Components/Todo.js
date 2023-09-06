import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditID] = useState(0)
  const addTodo = () => {
    if (todo!==''){
        setTodos([...todos, { list:todo , id : Date.now(), status : false }]);
        setTodo("");
        console.log(todos);}
    if (editId){
        const editTodo=todos.find((todo)=>todo.id=== editId)
        const updateTodo = todos.map((to)=>to.id===editTodo.id
        ? (to={id:to.id,list:todo})
        : (to={id:to.id,list:to.list})
        )
        setTodos(updateTodo)
        setEditID(0);
        setTodo('')
    }
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
  };
  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  });
  const onDelete=(id)=>{
    setTodos(todos.filter((to)=>to.id!==id))
    }
  const onComplete=(id)=>{
    let complete=todos.map((list)=>{
        if(list.id===id){
            return ({...list, status : !list.status })
        }
        return list
    })
    setTodos(complete)
  }
  const onEdit=(id)=>{
    const editTodo = todos.find((to)=> to.id === id)
    setTodo(editTodo.list)
    setEditID(editTodo.id)

  }
  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={HandleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}>{editId? 'EDIT':'ADD'}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((to) => (
            <li className="list-items">
              <div className="list-item-list" id={to.status? "list-item":''}>{to.list}</div>
              <span>
                <FiEdit className="list-item-icons" id="edit" title="edit" onClick={()=>onEdit(to.id)} />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="delete"
                  onClick={()=>onDelete(to.id)}
                />
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="complete"
                  onClick={()=>onComplete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
