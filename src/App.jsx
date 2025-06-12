import { useState, useEffect} from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");

  // Function to add a new task
  function addTask() {
    if (newTask.trim() != "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  // Function to toggle task completion status
  const toggle = (id) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  setTasks(updatedTasks);
};

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => id != task.id));
  };

  // Function to filter tasks based on status
const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) =>
          filter === "completed" ? task.completed : !task.completed
        );

  return (
    <div className="w-full h-screen flex justify-center bg-gray-300 p-10">
      <div className="w-2/3 bg-blue-100 rounded-md shadow-2xl flex flex-col gap-2">
        <h1 className="text-4xl text-black text-center font-bold m-4">
          ToDo App
        </h1>

        <div className="mx-auto w-2/3 flex gap-2 justify-around">
          <input
            className="border-2 w-3/4 p-2 rounded-md"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            placeholder="Enter your task"
          />
          <button
            onClick={addTask}
            className="bg-cyan-500 p-2 rounded-md font-bold text-white "
          >
            Add Task
          </button>
        </div>

        {/* checkbox  */}
        
        <div className="mx-auto w-2/3 flex justify-around">
          <label>
            <input
              type="radio"
              name="filter"
              value="All"
              checked={filter === "All"}
              onChange={() => setFilter("All")}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="completed"
              checked={filter === "completed"}
              onChange={() => setFilter("completed")}
            />
            Completed
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="pending"
              checked={filter === "pending"}
              onChange={() => setFilter("pending")}
            />
            Pending
          </label>
          </div>
        <ul className="mx-auto w-2/3 flex flex-col justify-center ">
          {filteredTasks.map((task) => (
            <li
              className="mt-2 bg-blue-500 flex justify-around p-2 rounded-2xl"
              key={task.id}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggle(task.id)}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
