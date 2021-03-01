import React, { useState, useCallback, useEffect } from 'react';

const App = () => {
  // hooks go here
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const onNewTaskChange = useCallback((event) => {
    setNewTask(event.target.value);
  }, []);

  const formSubmitted = useCallback((event) => {
    event.preventDefault();

    if(!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        content: newTask,
        done: false,
      }
    ]);

    setNewTask('');
  }, [newTask, tasks]);

  useEffect(() => {
    console.log('tasks', tasks);
  }, [tasks]);

  const addTask = useCallback((task, index) => (event) => {
      const newTasks = [...tasks];
      newTasks.splice(index, 1, {
        ...task,
        done: !task.done
      });
      setTasks(newTasks);
  }, [tasks]);

  // render the page
  return (
    <div className="w-full m-auto mt-10 px-4 text-center">
      <img className="m-auto w-25" src="zen-logo.png" alt="zen stack" />
      <h1 className="text-green-400 text-6xl font-bold">ZenTask</h1>
      <form onSubmit={formSubmitted} autoComplete="off">
        <label className="block text-green-400 text-lg font-bold mb-2" htmlFor="newTask">Enter a Task and Let Go:</label>
        <input
          className="shadow appearance-none bg-green-900 border rounded w-full py-2 px-3 text-green-200 leading-tight focus:outline-none focus:shadow-outline"
          id="newTask"
          name="newTask"
          value={newTask} 
          onChange={onNewTaskChange} 
        />
        <button className="bg-green-400 hover:bg-green-700 text-green-900 hover:text-green-400 w-full font-bold py-2 px-4 mt-4 rounded">Let Go</button>
      </form>
      <ul className="mt-4 text-left">
        {tasks.map((task, index) => (
          <li key={task.id} className={task.done ? 'w-full bg-green-200 py-2 px-4 mb-1 rounded flex justify-between done italic line-through' : 'w-full bg-green-500 py-2 px-4 mb-1 rounded flex justify-between font-bold'}>
            {task.content}

            <input
              value={task.done}
              type="checkbox"
              onChange={addTask(task, index)}
            />


          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
