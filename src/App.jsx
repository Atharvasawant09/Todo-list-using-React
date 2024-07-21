import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveTLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveTLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveTLS()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveTLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveTLS()
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredTodos = todos.filter(item =>
    item.todo.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container bg-teal-100 md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-[37%]">
        <h1 className='font-bold text-2xl text-center'>iTask - Manage your todos at one place</h1>
        <div className="searchTodo flex flex-col gap-4 my-6">
          <input onChange={handleSearchChange} value={searchQuery} type="text" className='w-full rounded-lg px-2 py-1'
            placeholder='Search todos...' />
        </div>
        <div className="addTodo flex flex-col gap-4 my-6">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex ">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-2 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 2} className='bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-500 text-sm font-bold p-2 py-1 text-white rounded-md mx-3'>Save</button>
          </div>
        </div>
        <input className="my-2" id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className="mx-2" htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-20 w-[90%] mx-auto my-2'></div>
        <h2 className='text-xl font-bold my-3'>Your Todos</h2>
        <div className="todos">
          {filteredTodos.length === 0 && <div className='text-base'>No Todos to display..</div>}
          {filteredTodos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between  my-3 ">
                <div className="flex gap-5">
                  <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-cyan-600 hover:bg-cyan-700 text-sm font-bold p-2 py-1 text-white rounded-md mx-2'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-cyan-600 hover:bg-cyan-700 text-sm font-bold p-2 py-1 text-white rounded-md mx-2'><MdDelete /></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App


