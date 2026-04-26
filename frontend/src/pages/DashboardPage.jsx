import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import ProfileModal from '../components/ProfileModal';
import PendingTasksModal from '../components/PendingTasksModal';
import ProgressBars from '../components/ProgressBars';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                📋 TaskFlow
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {pendingTasks.length > 0 && (
                <button
                  onClick={() => setPendingOpen(true)}
                  className="relative px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 rounded-lg font-bold hover:bg-yellow-500/30 transition"
                >
                  ⏳ {pendingTasks.length}
                </button>
              )}
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

      {/* Page Tabs */}
      <div className="bg-white/5 border-b border-white/10 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0">
            {[
              { id: 'home', label: '🏠 HOME', icon: '📊' },
              { id: 'tasks', label: '📋 TASK LIST', icon: '✓' },
              { id: 'add', label: '➕ ADD TASK', icon: '+' }
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
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.icon}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* PAGE 1: HOME */}
        {page === 'home' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Tasks', value: stats.total, icon: '📊', color: 'from-blue-600 to-blue-400' },
                { label: 'Completed', value: stats.completed, icon: '✓', color: 'from-green-600 to-green-400' },
                { label: 'Pending', value: stats.pending, icon: '⏳', color: 'from-yellow-600 to-yellow-400' },
                { label: 'Progress', value: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0, icon: '%', color: 'from-purple-600 to-purple-400' }
              ].map((stat, i) => (
                <div key={i} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-6 rounded-2xl hover:border-white/30 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-bold">{stat.label}</p>
                      <p className={`text-5xl font-black mt-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                    <span className="text-4xl">{stat.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bars */}
            <ProgressBars completed={stats.completed} total={stats.total} />

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setPage('add')}
                className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold py-6 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105"
              >
                <span className="text-3xl block mb-2">➕</span>
                New Task
              </button>
              <button
                onClick={() => { setPage('tasks'); setFilter('pending'); }}
                className="bg-gradient-to-br from-yellow-600 to-orange-600 text-white font-bold py-6 rounded-2xl hover:shadow-2xl hover:shadow-yellow-500/50 transition transform hover:scale-105"
              >
                <span className="text-3xl block mb-2">⏳</span>
                View Pending
              </button>
              <button
                onClick={() => setProfileOpen(true)}
                className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold py-6 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/50 transition transform hover:scale-105"
              >
                <span className="text-3xl block mb-2">👤</span>
                My Profile
              </button>
            </div>
          </div>
        )}

        {/* PAGE 2: TASK LIST */}
        {page === 'tasks' && (
          <div>
            <div className="mb-6 flex gap-2 flex-wrap">
              {[
                { label: '📊 All', value: 'all' },
                { label: '⏳ Pending', value: 'pending' },
                { label: '✓ Done', value: 'completed' }
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

            {filteredTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map(task => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-6xl mb-4">🎉</p>
                <p className="text-2xl font-bold text-white">All caught up!</p>
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

        {/* PAGE 3: ADD TASK */}
        {page === 'add' && (
          <div className="max-w-2xl">
            <TaskForm />
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