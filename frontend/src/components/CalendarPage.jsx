import { useEffect, useMemo, useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { format } from 'date-fns';

export default function CalendarPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  // Start date and range settings
  const todayISO = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(todayISO);
  const [daysCount, setDaysCount] = useState(14);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Build array of date objects to render
  const daysArray = useMemo(() => {
    const list = [];
    const base = new Date(startDate + 'T00:00:00');
    for (let i = 0; i < Math.max(1, Number(daysCount)); i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      list.push(d);
    }
    return list;
  }, [startDate, daysCount]);

  // Group tasks by date key (YYYY-MM-DD)
  const tasksByDate = useMemo(() => {
    const map = {};
    (tasks || []).forEach((t) => {
      if (!t?.dueDate) return;
      const key = new Date(t.dueDate).toISOString().split('T')[0];
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });
    return map;
  }, [tasks]);

  const formatDayTitle = (date) => {
    return format(date, 'EEE, MMM d');
  };

  const getTasksForDate = (date) => {
    const key = date.toISOString().split('T')[0];
    return tasksByDate[key] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Controls */}
        <div className="bg-white/6 border border-white/8 rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-200 font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white/6 border border-white/8 text-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-200 font-medium">Days</label>
            <input
              type="number"
              min="1"
              max="60"
              value={daysCount}
              onChange={(e) => setDaysCount(e.target.value)}
              className="w-24 px-3 py-2 rounded-lg bg-white/6 border border-white/8 text-white focus:outline-none"
            />
            <p className="text-sm text-gray-400">Adjust range without changing design</p>
          </div>

          <div className="ml-auto text-sm text-gray-300">
            <button
              onClick={() => { setStartDate(todayISO); setDaysCount(14); }}
              className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {daysArray.map((d) => {
            const dayTasks = getTasksForDate(d);
            const completed = dayTasks.filter(t => t.completed).length;
            const pending = dayTasks.length - completed;
            return (
              <div key={d.toISOString()} className="bg-white/6 border border-white/8 rounded-2xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-bold">{formatDayTitle(d)}</h3>
                    <p className="text-xs text-gray-300">{format(d, 'yyyy-MM-dd')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-200 font-bold">{dayTasks.length} tasks</p>
                    <p className="text-xs text-green-400">{completed} ✓</p>
                    <p className="text-xs text-yellow-300">{pending} ⏳</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {dayTasks.length > 0 ? (
                    dayTasks.slice(0, 2).map((task) => (
                      <div key={task._id} className="bg-white/4 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className={`text-sm font-semibold ${task.completed ? 'line-through text-gray-300' : 'text-white'}`}>{task.title}</p>
                            <p className="text-xs text-gray-300">{task.priority || 'medium'}</p>
                          </div>
                          <div className="text-xs text-gray-200">
                            {task.dueDate ? new Date(task.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-400">
                      <p className="text-sm">No tasks</p>
                    </div>
                  )}
                </div>

                {dayTasks.length > 2 && (
                  <div className="mt-3 text-xs text-gray-300">
                    +{dayTasks.length - 2} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}