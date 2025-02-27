import { useState, useEffect } from "react";
import "./css/NormalTodo.css"; // Import CSS file

const NormalTodo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");


  // ✅ Load tasks from localStorage on component mount (only runs once)
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  
  // ✅ Save tasks to localStorage whenever `tasks` change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      const newTasks = [...tasks, { id: Date.now(), text: task, completed: false }];
      setTasks(newTasks);
      setTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks)); // Update localStorage
  };

  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    const updatedTasks = tasks.map((t) => (t.id === id ? { ...t, text: editText } : t));
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update localStorage
    setEditingTask(null);
    setEditText("");
  };

  const filteredTasks = tasks.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h1>React To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
          className="task-input"
        />
        <button onClick={addTask} className="add-btn">Add</button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="search-input"
      />


{/* For Show Todos */}
      <ul className="task-list">
        {filteredTasks.map((t) => (
          <li key={t.id} className={`task-item ${t.completed ? "completed" : ""}`}>
            {editingTask === t.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span onClick={() => toggleTask(t.id)}>{t.text}</span>
            )}
            <div className="button-group">
              {editingTask === t.id ? (
                <button onClick={() => saveEdit(t.id)} className="save-btn">✔</button>
              ) : (
                <button onClick={() => startEdit(t)} className="edit-btn">✏</button>
              )}
              <button onClick={() => deleteTask(t.id)} className="delete-btn">X</button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default NormalTodo;
