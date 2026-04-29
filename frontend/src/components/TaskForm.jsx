import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [category, setCategory] = useState('work');
  const [loading, setLoading] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);

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
      const dateTime = dueTime ? `${dueDate}T${dueTime}` : `${dueDate}T09:00`;
      
      await addTask({ 
        title, 
        description, 
        priority, 
        dueDate: dateTime,
        category
      });
      alert('✅ Task created successfully!');
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setDueTime('');
      setCategory('work');
    } catch (err) {
      alert('❌ Failed to add task: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <label className="block text-sm font-bold text-gray-200 mb-2">
          📌 Task Title <span className="text-red-400">*</span>
        </label>
        <input 
          type="text" 
          placeholder="e.g., Complete project proposal" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full px-5 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-white/20 focus:outline-none transition"
          required 
        />
        <p className="text-xs text-gray-400 mt-1">Be specific and clear about your task</p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-gray-200 mb-2">
          📝 Description
        </label>
        <textarea 
          placeholder="Add more details about your task..." 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full px-5 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-white/20 focus:outline-none transition h-24 resize-none"
        ></textarea>
        <p className="text-xs text-gray-400 mt-1">Optional: Add context or steps for your task</p>
      </div>

      {/* Priority & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Priority */}
        <div>
          <label className="block text-sm font-bold text-gray-200 mb-2">
            🎯 Priority
          </label>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)} 
            className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white focus:border-purple-400 focus:bg-white/20 focus:outline-none transition"
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-bold text-gray-200 mb-2">
            🏷️ Category
          </label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white focus:border-purple-400 focus:bg-white/20 focus:outline-none transition"
          >
            <option value="work">💼 Work</option>
            <option value="personal">👤 Personal</option>
            <option value="shopping">🛒 Shopping</option>
            <option value="health">🏥 Health</option>
            <option value="learning">📚 Learning</option>
            <option value="other">🎯 Other</option>
          </select>
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Due Date */}
        <div>
          <label className="block text-sm font-bold text-gray-200 mb-2">
            📅 Due Date <span className="text-red-400">*</span>
          </label>
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white focus:border-purple-400 focus:bg-white/20 focus:outline-none transition"
            min={today}
            required
          />
          <p className="text-xs text-gray-400 mt-1">Today or later</p>
        </div>

        {/* Due Time */}
        <div>
          <label className="block text-sm font-bold text-gray-200 mb-2">
            🕐 Due Time
          </label>
          <input 
            type="time" 
            value={dueTime} 
            onChange={(e) => setDueTime(e.target.value)} 
            className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white focus:border-purple-400 focus:bg-white/20 focus:outline-none transition"
          />
          <p className="text-xs text-gray-400 mt-1">Optional: Set specific time</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-600/20 border border-blue-600/50 rounded-xl p-4">
        <p className="text-blue-300 text-sm font-bold">
          💡 Tip: Breaking down large tasks into smaller ones makes them easier to complete!
        </p>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 text-lg flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            Creating Task...
          </>
        ) : (
          <>
            <span>🚀</span>
            Create Task
          </>
        )}
      </button>
    </form>
  );
}
