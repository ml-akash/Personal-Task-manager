import { useState, useMemo } from 'react';

export default function CalendarPage({ tasks }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const tasksByDate = useMemo(() => {
    const map = {};
    tasks.forEach(task => {
      if (task.dueDate) {
        const date = new Date(task.dueDate).toISOString().split('T')[0];
        if (!map[date]) map[date] = [];
        map[date].push(task);
      }
    });
    return map;
  }, [tasks]);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDaysArray = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    return days;
  };

  const getDateString = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const date = String(day).padStart(2, '0');
    return `${year}-${month}-${date}`;
  };

  const days = getDaysArray();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Calendar Container */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={previousMonth}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-bold"
          >
            ← Previous
          </button>
          <h2 className="text-3xl font-bold text-white text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={nextMonth}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-bold"
          >
            Next →
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map(day => (
            <div key={day} className="text-center text-gray-300 font-bold py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dateString = day ? getDateString(day) : null;
            const dayTasks = dateString ? (tasksByDate[dateString] || []) : [];
            const isToday = day && new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

            return (
              <div
                key={index}
                className={`min-h-24 p-2 rounded-lg border transition ${
                  day
                    ? isToday
                      ? 'bg-gradient-to-br from-purple-600/50 to-pink-600/50 border-purple-400'
                      : 'bg-white/5 border-white/20 hover:border-white/40'
                    : 'bg-transparent border-transparent'
                }`}
              >
                {day && (
                  <>
                    <p className={`text-lg font-bold mb-1 ${isToday ? 'text-white' : 'text-gray-300'}`}>
                      {day}
                    </p>
                    <div className="space-y-1">
                      {dayTasks.slice(0, 2).map(task => (
                        <div
                          key={task._id}
                          className={`text-xs p-1 rounded truncate ${
                            task.priority === 'high'
                              ? 'bg-red-500/30 text-red-200'
                              : task.priority === 'medium'
                              ? 'bg-yellow-500/30 text-yellow-200'
                              : 'bg-green-500/30 text-green-200'
                          }`}
                          title={task.title}
                        >
                          {task.completed ? '✓' : '○'} {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <p className="text-xs text-gray-400">+{dayTasks.length - 2} more</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tasks for Selected Dates */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-white mb-4">📋 Tasks by Date</h3>
        
        {Object.keys(tasksByDate)
          .sort()
          .slice(0, 5)
          .map(dateString => (
            <div key={dateString} className="mb-6 pb-6 border-b border-white/10 last:border-b-0">
              <p className="text-lg font-bold text-purple-300 mb-3">
                {new Date(dateString).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasksByDate[dateString].map(task => (
                  <div
                    key={task._id}
                    className="bg-white/5 border border-white/20 p-4 rounded-lg hover:border-white/40 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-bold ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                        {task.title}
                      </h4>
                      <span className={`px-2 py-1 rounded text-xs font-bold text-white ${
                        task.priority === 'high'
                          ? 'bg-red-600'
                          : task.priority === 'medium'
                          ? 'bg-yellow-600'
                          : 'bg-green-600'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-300 mb-2">{task.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>
                        {task.completed ? '✓ Completed' : '⏳ Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        
        {Object.keys(tasksByDate).length === 0 && (
          <div className="text-center py-8">
            <p className="text-3xl mb-2">🎉</p>
            <p className="text-gray-300">No tasks scheduled yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}