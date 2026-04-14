import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask({ title, description, priority, dueDate });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Task</h2>
      <input type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 mb-4 border rounded-lg" required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 mb-4 border rounded-lg h-20"></textarea>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="p-3 border rounded-lg">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="p-3 border rounded-lg" />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600">Add Task</button>
    </form>
  );
}