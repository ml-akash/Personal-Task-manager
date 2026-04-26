export default function ProgressBars({ completed, total }) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Linear Progress Bar */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-3">📊 Overall Progress</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          <span className="text-xl font-bold text-blue-600 min-w-12">{Math.round(percentage)}%</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">{completed} of {total} tasks completed</p>
      </div>

      {/* Circular Progress */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Achievement</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              {/* Progress circle */}
              <circle 
                cx="60" cy="60" r="54" 
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - percentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-blue-600">{Math.round(percentage)}%</span>
              <span className="text-xs text-gray-600">Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stacked Progress */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📈 Statistics</h3>
        <div className="space-y-3">
          {/* Completed */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-gray-700">✓ Completed</span>
              <span className="text-sm font-bold text-green-600">{completed}</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-600"
                style={{ width: `${(completed / total) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Pending */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-semibold text-gray-700">⏳ Pending</span>
              <span className="text-sm font-bold text-yellow-600">{total - completed}</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                style={{ width: `${((total - completed) / total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}