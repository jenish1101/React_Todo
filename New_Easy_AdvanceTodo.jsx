import { useEffect, useState } from "react";
import "./TaskManager"
import TaskManager from "./TaskManager";


const App = () => {
  // State for storing todos
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  // State for pop-up (edit)
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");



  // Load data from local storage when the app starts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to local storage whenever the list updates
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);


  const handleAddTodo = (e) => {
    e.preventDefault();
    if (value.trim() === "") return; // Prevent adding empty todos
    setTodos([...todos, { text: value, completed: false }]);
    setValue(""); // Clear input after adding
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, e) => e !== index));
    // localStorage.setItem("todos", JSON.stringify(todos.filter((_, e) => e !== index)));
  };

  const handleUpdate = (index) => {
    setShowPopup(true);
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const handleSave = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex].text = editValue;
    setTodos(updatedTodos);
    setShowPopup(false);
  };


  // State for filter
  const [filtertodo, setFilterTodo] = useState("all");
  
  const getFilteredTodos = () => {
    if (filtertodo === "all") return todos; 
    if (filtertodo === "pending") return todos.filter(todos => !todos.completed);
    if (filtertodo === "complete") return todos.filter(todos => todos.completed);
  };

  return (
    <>
      <h1>Todo List</h1>

      {/* Form to add new todo */}
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter new todo"
        />
        <button type="submit">Add</button>
      </form>


      <hr />

      
{/* Filter Buttons */}
      <div >
        <button onClick={() => setFilterTodo("all")}>All</button>
        <button onClick={() => setFilterTodo("pending")}>Pending</button>
        <button onClick={() => setFilterTodo("complete")}>Completed</button>
        <br />
      </div>

{/* Show All Todos */}
      <div>
        {
        getFilteredTodos().map((todo, index) => (
          <div key={index} style={{display:"flex", margin:"10px 0px"}}>

            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                const updatedTodos = [...todos]; // copy the todos array
                updatedTodos[index].completed = !updatedTodos[index].completed; // toggle the completed property
                setTodos(updatedTodos); // update state with the new array
              }}
            />
            
            <div>
              <span>{todo.text}</span>
              <button onClick={() => handleUpdate(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>

          </div>
        ))}
      </div>


      <hr />
      {/* Popup for Editing Todo */}
      {showPopup && (
        <div>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}

      <hr />

      {/* <TaskManager/> */}

    </>
  );
};

export default App;
