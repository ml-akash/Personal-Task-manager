import { useTaskStore } from '../store/taskStore';

export default function TaskCard({ task }) {
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          task.priority === 'high' ? 'bg-red-100 text-red-700' :
          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}>{task.priority}</span>
      </div>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="flex gap-2">
        <button onClick={() => updateTask(task._id, { completed: !task.completed })} className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => deleteTask(task._id)} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
}