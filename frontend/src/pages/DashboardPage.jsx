import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [user, navigate, fetchTasks]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">📋 Task Manager</h1>
            <p className="text-gray-500 text-sm">Organize your tasks efficiently</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-gray-700 font-semibold">{user?.name}</p>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm">Total Tasks</p>
            <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm">Completed</p>
            <p className="text-4xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-4xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
        </div>

        {/* Add Task Form */}
        <TaskForm />
        
        {/* Filter Buttons */}
        <div className="mt-8">
          <div className="flex gap-3 mb-6">
            {[
              { label: 'All Tasks', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Completed', value: 'completed' }
            ].map((f) => (
              <button 
                key={f.value}
                onClick={() => setFilter(f.value)} 
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  filter === f.value 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Tasks Grid */}
          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No tasks found. Create one to get started! 🎯</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}