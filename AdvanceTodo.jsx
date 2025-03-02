import { useState } from 'react';
import './css/AdvanceTodo.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all');  // 'all', 'pending', 'completed'

  // Add new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (inputText) {
      setTodos([...todos, { id: Date.now(), text: inputText, completed: false }]);
      setInputText('');
    }
  };

  // Toggle completion status of todo
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Update todo text
  const updateTodo = (id) => {
    const newText = prompt('Edit todo:', todos.find(todo => todo.id === id).text);
    if (newText !== null && newText !== '') {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      ));
    }
  };

  // Filter todos based on status
  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // for 'all'
  });

  return (
    <div className="app">
      <h1>Todo App</h1>

{/* Todo Input Section */}
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add Todo</button>
      </form>

{/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All Todos</button>
        <button onClick={() => setFilter('pending')}>Pending Todos</button>
        <button onClick={() => setFilter('completed')}>Completed Todos</button>
      </div>

{/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleTodo(todo.id)} 
            />
            <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
            <button onClick={() => updateTodo(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default App;




//With Local Storage 



//import { useState, useEffect } from 'react';
// import './css/AdvanceTodo.css';

// function App() {
//   const [todos, setTodos] = useState(() => {
//     // Load todos from localStorage on first render
//     const savedTodos = localStorage.getItem("todos");
//     return savedTodos ? JSON.parse(savedTodos) : [];
//   });

//   const [inputText, setInputText] = useState('');
//   const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'

//   // Save todos to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   // Add new todo
//   const addTodo = (e) => {
//     e.preventDefault();
//     if (inputText.trim()) {
//       setTodos([...todos, { id: Date.now(), text: inputText, completed: false }]);
//       setInputText('');
//     }
//   };

//   // Toggle completion status of todo
//   const toggleTodo = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   // Delete todo
//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   // Update todo text
//   const updateTodo = (id) => {
//     const newText = prompt('Edit todo:', todos.find(todo => todo.id === id).text);
//     if (newText !== null && newText.trim() !== '') {
//       setTodos(todos.map(todo =>
//         todo.id === id ? { ...todo, text: newText } : todo
//       ));
//     }
//   };

//   // Filter todos based on status
//   const filteredTodos = todos.filter(todo => {
//     if (filter === 'pending') return !todo.completed;
//     if (filter === 'completed') return todo.completed;
//     return true; // for 'all'
//   });

//   return (
//     <div className="app">
//       <h1>Todo App</h1>

//       {/* Todo Input Section */}
//       <form onSubmit={addTodo} className="todo-form">
//         <input
//           type="text"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           placeholder="Add a new todo..."
//         />
//         <button type="submit">Add Todo</button>
//       </form>

//       {/* Filter Buttons */}
//       <div className="filter-buttons">
//         <button onClick={() => setFilter('all')}>All Todos</button>
//         <button onClick={() => setFilter('pending')}>Pending Todos</button>
//         <button onClick={() => setFilter('completed')}>Completed Todos</button>
//       </div>

//       {/* Todo List */}
//       <ul className="todo-list">
//         {filteredTodos.map(todo => (
//           <li key={todo.id} className="todo-item">
//             <input 
//               type="checkbox" 
//               checked={todo.completed} 
//               onChange={() => toggleTodo(todo.id)} 
//             />
//             <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
//             <button onClick={() => updateTodo(todo.id)}>Edit</button>
//             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
      
//     </div>
//   );
// }

// export default App;

