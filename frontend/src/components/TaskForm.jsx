import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [loading, setLoading] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Task title is required!');
      return;
    }

    if (!dueDate) {
      alert('Due date is required!');
      return;
    }

    if (dueDate < today) {
      alert('Due date cannot be in the past!');
      return;
    }

    setLoading(true);
    try {
      // Combine date and time
      const dateTime = dueTime ? `${dueDate}T${dueTime}` : `${dueDate}T00:00`;
      
      await addTask({ 
        title, 
        description, 
        priority, 
        dueDate: dateTime
      });
      alert('Task added successfully! 🎉');
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setDueTime('');
    } catch (err) {
      alert('Failed to add task: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">➕ Create New Task</h2>
      
      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-800 mb-2">Task Title *</label>
        <input 
          type="text" 
          placeholder="What do you need to do?" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition disabled:bg-gray-100" 
          disabled={loading}
          required 
        />
      </div>
      
      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
        <textarea 
          placeholder="Add more details..." 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition h-24 resize-none disabled:bg-gray-100"
          disabled={loading}
        ></textarea>
      </div>
      
      {/* Priority & Date */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Priority */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Priority</label>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)} 
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition disabled:bg-gray-100"
            disabled={loading}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Due Date *</label>
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition disabled:bg-gray-100"
            disabled={loading}
            min={today}
            required
          />
        </div>

        {/* Due Time */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Due Time</label>
          <input 
            type="time" 
            value={dueTime} 
            onChange={(e) => setDueTime(e.target.value)} 
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition disabled:bg-gray-100"
            disabled={loading}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-xl transition disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin mr-2">⏳</span>
            Adding Task...
          </span>
        ) : (
          '🚀 Add Task'
        )}
      </button>
    </form>
  );
}