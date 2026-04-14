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
    if (window.confirm('Are you sure you want to delete this task?')) {
      setDeleting(true);
      try {
        await deleteTask(task._id);
      } catch (err) {
        alert('Failed to delete task');
        setDeleting(false);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const isOverdue = (date) => {
    if (!date) return false;
    return new Date(date) < new Date() && !task.completed;
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-300',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    low: 'bg-green-100 text-green-700 border-green-300'
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 ${
      task.completed ? 'opacity-75 bg-gray-50' : ''
    } ${isOverdue(task.dueDate) ? 'border-l-4 border-red-500' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-lg font-bold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${priorityColors[task.priority] || priorityColors.medium}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>
      
      {task.description && (
        <p className="text-gray-600 mb-3 text-sm line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex justify-between items-center mb-4 text-sm">
        <span className={`${isOverdue(task.dueDate) ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
          📅 {formatDate(task.dueDate)}
          {isOverdue(task.dueDate) && ' ⚠️ Overdue'}
        </span>
        {task.completed && <span className="text-green-600 font-semibold">✓ Done</span>}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={handleComplete}
          className={`flex-1 py-2 rounded-lg font-semibold transition ${
            task.completed
              ? 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {task.completed ? '↩️ Undo' : '✓ Complete'}
        </button>
        <button 
          onClick={handleDelete}
          disabled={deleting}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {deleting ? '...' : '🗑️ Delete'}
        </button>
      </div>
    </div>
  );
}