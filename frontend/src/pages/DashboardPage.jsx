import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import ProfileModal from '../components/ProfileModal';
import PendingTasksModal from '../components/PendingTasksModal';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const [page, setPage] = useState('home');
  const [filter, setFilter] = useState('all');
  const [profileOpen, setProfileOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);
  const [showPendingOnLoad, setShowPendingOnLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    fetchTasks();
  }, [user, navigate, fetchTasks]);

  useEffect(() => {
    if (showPendingOnLoad && tasks.length > 0 && pendingTasks.length > 0) {
      setPendingOpen(true);
      setShowPendingOnLoad(false);
    }
  }, [tasks]);

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const stats = {
    total: tasks.length,
    completed: completedTasks.length,
    pending: pendingTasks.length
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const handleCompleteFromModal = async (taskId) => {
    try {
      await updateTask(taskId, { completed: true });
    } catch (err) {
      alert('Failed to complete task');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Calendar data for next 14 days
  const getCalendarData = () => {
    const calendar = {};
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      calendar[dateStr] = tasks.filter(task => {
        const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
        return taskDate === dateStr;
      });
    }
    return calendar;
  };

  const calendarData = getCalendarData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                📋 TaskFlow
              </h1>
              <p className="text-gray-400 text-xs">Welcome back, {user?.name?.split(' ')[0]}! 👋</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Pending Badge */}
              {pendingTasks.length > 0 && (
                <button
                  onClick={() => setPendingOpen(true)}
                  className="relative px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 rounded-lg font-bold hover:bg-yellow-500/30 transition text-sm"
                >
                  ⏳ {pendingTasks.length} Pending
                </button>
              )}
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600/30 border border-red-600/50 text-red-300 rounded-lg font-bold hover:bg-red-600/50 transition text-sm"
              >
                🚪 Logout
              </button>
              {/* Profile Button */}
              <button
                onClick={() => setProfileOpen(true)}
                className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xl hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-110"
              >
                👤
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Navigation Tabs */}
      <div className="bg-white/5 border-b border-white/10 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0">
            {[
              { id: 'home', label: '🏠 HOME' },
              { id: 'tasks', label: '📋 TASKS' },
              { id: 'add', label: '➕ ADD TASK' },
              { id: 'calendar', label: '📅 CALENDAR' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setPage(t.id)}
                className={`px-8 py-4 font-bold transition border-b-4 text-sm md:text-base ${
                  page === t.id
                    ? 'border-purple-500 bg-purple-600/20 text-purple-300'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* PAGE 1: HOME */}
        {page === 'home' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
              <h2 className="text-4xl font-black text-white mb-2">
                Welcome back, {user?.name}! 👋
              </h2>
              <p className="text-gray-300 text-lg">
                You have <span className="font-bold text-purple-400">{stats.pending}</span> pending tasks and 
                <span className="font-bold text-green-400"> {stats.completed}</span> completed tasks
              </p>
              <div className="mt-4 flex gap-4 flex-wrap">
                <button
                  onClick={() => setPage('add')}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                >
                  ➕ Create New Task
                </button>
                <button
                  onClick={() => { setPage('tasks'); setFilter('pending'); }}
                  className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                >
                  ⏳ View Pending
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-400/20 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-bold">Total Tasks</p>
                    <p className="text-4xl font-black text-blue-300 mt-2">{stats.total}</p>
                  </div>
                  <span className="text-5xl">📊</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600/20 to-green-400/20 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-bold">Completed</p>
                    <p className="text-4xl font-black text-green-300 mt-2">{stats.completed}</p>
                  </div>
                  <span className="text-5xl">✓</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-400/20 border border-yellow-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-bold">Pending</p>
                    <p className="text-4xl font-black text-yellow-300 mt-2">{stats.pending}</p>
                  </div>
                  <span className="text-5xl">⏳</span>
                </div>
              </div>
            </div>

            {/* Recent Tasks */}
            {tasks.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">📌 Recent Tasks</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tasks.slice(0, 3).map(task => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-6xl mb-4">🎯</p>
                <p className="text-2xl font-bold text-white">No tasks yet!</p>
                <p className="text-gray-400 mt-2">Create your first task to get started</p>
                <button
                  onClick={() => setPage('add')}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                >
                  ➕ Create Task
                </button>
              </div>
            )}
          </div>
        )}

        {/* PAGE 2: TASKS */}
        {page === 'tasks' && (
          <div>
            {/* Filter Buttons */}
            <div className="mb-6 flex gap-2 flex-wrap">
              {[
                { label: '📊 All Tasks', value: 'all' },
                { label: '⏳ Pending', value: 'pending' },
                { label: '✓ Completed', value: 'completed' }
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-6 py-2 rounded-lg font-bold transition ${
                    filter === f.value
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Task Counter */}
            <p className="text-gray-300 text-sm font-bold mb-4">
              {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} found
            </p>

            {/* Tasks Grid */}
            {filteredTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map(task => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-6xl mb-4">🎉</p>
                <p className="text-2xl font-bold text-white">No tasks found!</p>
                <p className="text-gray-400 mt-2">
                  {filter === 'completed' 
                    ? 'You haven\'t completed any tasks yet.' 
                    : filter === 'pending'
                    ? 'All tasks completed! Great job!'
                    : 'Create your first task'}
                </p>
                <button
                  onClick={() => setPage('add')}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                >
                  ➕ Add Task
                </button>
              </div>
            )}
          </div>
        )}

        {/* PAGE 3: ADD TASK */}
        {page === 'add' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
              <h2 className="text-3xl font-black text-white mb-2">✨ Create Your Task</h2>
              <p className="text-gray-400 mb-6">Add a new task to stay organized and productive</p>
              <TaskForm />
            </div>
          </div>
        )}

        {/* PAGE 4: CALENDAR */}
        {page === 'calendar' && (
          <div>
            <h2 className="text-3xl font-black text-white mb-6">📅 Task Calendar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(calendarData).map(([date, dateTasks]) => {
                const dateObj = new Date(date);
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                const dayNum = dateObj.getDate();
                const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
                const completedCount = dateTasks.filter(t => t.completed).length;
                const pendingCount = dateTasks.filter(t => !t.completed).length;

                return (
                  <div key={date} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/30 transition">
                    {/* Date Header */}
                    <div className="mb-3 pb-3 border-b border-white/10">
                      <p className="text-gray-400 text-xs font-bold">{dayName}</p>
                      <p className="text-2xl font-black text-white">{dayNum}</p>
                      <p className="text-gray-400 text-xs">{month}</p>
                    </div>

                    {/* Task Count */}
                    <div className="flex gap-2 mb-3 text-xs">
                      <span className="px-2 py-1 bg-green-600/30 border border-green-600/50 text-green-300 rounded font-bold">
                        ✓ {completedCount}
                      </span>
                      <span className="px-2 py-1 bg-yellow-600/30 border border-yellow-600/50 text-yellow-300 rounded font-bold">
                        ⏳ {pendingCount}
                      </span>
                    </div>

                    {/* Task List */}
                    {dateTasks.length > 0 ? (
                      <div className="space-y-2">
                        {dateTasks.slice(0, 2).map((task, idx) => (
                          <div key={idx} className={`p-2 rounded text-xs border-l-2 ${
                            task.completed 
                              ? 'bg-green-600/20 border-green-600/50 text-green-300 line-through'
                              : 'bg-white/5 border-blue-600/50 text-gray-300'
                          }`}>
                            <p className="font-bold truncate">{task.title}</p>
                            <p className="text-xs opacity-75">
                              {new Date(task.dueDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        ))}
                        {dateTasks.length > 2 && (
                          <p className="text-xs text-gray-400 font-bold">+{dateTasks.length - 2} more</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 text-center">No tasks</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
      <PendingTasksModal 
        isOpen={pendingOpen} 
        onClose={() => setPendingOpen(false)} 
        pendingTasks={pendingTasks}
        onComplete={handleCompleteFromModal}
      />
    </div>
  );
}
