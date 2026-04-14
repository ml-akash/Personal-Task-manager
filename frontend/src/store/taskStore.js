import { create } from 'zustand';
import { tasks as taskAPI } from '../api/taskService';

export const useTaskStore = create((set) => ({
  tasks: [],
  
  fetchTasks: async () => {
    const { data } = await taskAPI.getAll();
    set({ tasks: data });
  },
  
  addTask: async (taskData) => {
    const { data } = await taskAPI.create(taskData);
    set((state) => ({ tasks: [data, ...state.tasks] }));
  },
  
  updateTask: async (id, taskData) => {
    const { data } = await taskAPI.update(id, taskData);
    set((state) => ({
      tasks: state.tasks.map((t) => t._id === id ? data : t)
    }));
  },
  
  deleteTask: async (id) => {
    await taskAPI.delete(id);
    set((state) => ({ tasks: state.tasks.filter((t) => t._id !== id) }));
  }
}));