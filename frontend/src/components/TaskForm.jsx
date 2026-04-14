import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Task title is required!');
      return;
    }

    setLoading(true);
    try {
      await addTask({ title, description, priority, dueDate });
      alert('Task added successfully! 🎉');
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    } catch (err) {
      alert('Failed to add task: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">➕ Add New Task</h2>
      
      <input 
        type="text" 
        placeholder="Task title (required)" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="w-full p-3 mb-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition" 
        disabled={loading}
        required 
      />
      
      <textarea 
        placeholder="Task description (optional)" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        className="w-full p-3 mb-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition h-20"
        disabled={loading}
      ></textarea>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)} 
          className="p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
          disabled={loading}
        >
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>
        
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          className="p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
          disabled={loading}
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Adding Task...' : 'Add Task'}
      </button>
    </form>
  );
}