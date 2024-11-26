import React, { useState } from 'react';

function TodoApp() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // for filtering tasks
  const [sortBy, setSortBy] = useState(''); // for sorting tasks

  // Add a new task with validation
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return; // Prevent empty tasks
    if (tasks.some((t) => t.name === task.trim())) return; // Prevent duplicates

    setTasks([...tasks, { name: task.trim(), isComplete: false }]);
    setTask(''); // Clear the input field
  };

  // Toggle task completion
  const handleToggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  // Delete a task
  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Filter tasks based on completion status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.isComplete;
    if (filter === 'incomplete') return !task.isComplete;
    return true; // 'all' filter
  });

  // Sort tasks based on the selected criteria
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'completion') {
      return a.isComplete === b.isComplete ? 0 : a.isComplete ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <h2>Todo App</h2>
      
      {/* Form to add a new task */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Filter and Sort Options */}
      <div>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
        
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="completion">Completion Status</option>
          </select>
        </label>
      </div>

      {/* Display tasks */}
      <ul>
        {sortedTasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={() => handleToggleComplete(index)}
            />
            {task.name}
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
