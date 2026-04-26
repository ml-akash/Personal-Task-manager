import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';

export default function TaskCard({ task }) {
  const [deleting, setDeleting] = useState(false);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const handleComplete = async () => {
    try {
      await updateTask(task._id, { completed: !task.completed });
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this task?')) {
      setDeleting(true);
      try {
        await deleteTask(task._id);
      } catch (err) {
        alert('Failed to delete task');
        setDeleting(false);
      }
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    const dateFormatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timeFormatted = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${dateFormatted} at ${timeFormatted}`;
  };

  const isOverdue = (dateString) => new Date(dateString) < new Date() && !task.completed;
  const isPrioritized = (dateString) => {
    const daysUntilDue = Math.ceil((new Date(dateString) - new Date()) / (1000 * 60 * 60 * 24));
    return daysUntilDue <= 3 && daysUntilDue > 0;
  };

  const priorityColors = {
    high: 'from-red-600 to-red-400',
    medium: 'from-yellow-600 to-yellow-400',
    low: 'from-green-600 to-green-400'
  };

  return (
    <div className={`bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-6 rounded-2xl hover:border-white/40 transition transform hover:scale-105 ${
      task.completed ? 'opacity-60' : ''
    } ${isOverdue(task.dueDate) ? 'border-l-4 border-red-500' : ''}`}>
      
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-lg font-bold ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
          {task.title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between mb-4 text-xs">
        <span className={`font-bold ${isOverdue(task.dueDate) ? 'text-red-400' : 'text-gray-400'}`}>
          🕐 {formatDateTime(task.dueDate)}
          {isOverdue(task.dueDate) && ' ⚠️'}
        </span>
        {task.completed && <span className="text-green-400 text-lg">✓</span>}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleComplete}
          className={`flex-1 py-2 rounded-lg font-bold transition ${
            task.completed
              ? 'bg-white/10 text-gray-300 hover:bg-white/20'
              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg'
          }`}
        >
          {task.completed ? '↩️ Undo' : '✓ Done'}
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex-1 bg-red-600/30 border border-red-600/50 text-red-300 py-2 rounded-lg font-bold hover:bg-red-600/50 transition disabled:opacity-50"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}