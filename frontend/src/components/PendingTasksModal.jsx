export default function PendingTasksModal({ isOpen, onClose, pendingTasks, onComplete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto animate-slide-in">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">⏳ Pending Tasks</h2>
            <p className="text-sm text-white/80 mt-1">You have {pendingTasks.length} task{pendingTasks.length !== 1 ? 's' : ''} waiting</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Tasks List */}
        <div className="p-6">
          {pendingTasks.length > 0 ? (
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task._id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition border-l-4 border-yellow-500">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{task.title}</h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>📅 {new Date(task.dueDate || new Date()).toLocaleDateString()}</span>
                    <button
                      onClick={() => onComplete(task._id)}
                      className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-semibold"
                    >
                      ✓ Mark Done
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-3xl mb-2">🎉</p>
              <p className="text-gray-600 font-semibold">All caught up! No pending tasks.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t flex justify-between items-center">
          <span className="text-sm text-gray-600">{pendingTasks.length} task{pendingTasks.length !== 1 ? 's' : ''} to complete</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}