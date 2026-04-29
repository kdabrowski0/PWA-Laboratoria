import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useTasks, Priority } from '../context/TaskContext';

export function AddTask() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      description,
      dueDate,
      priority,
    });

    navigate('/');
  };

  const priorityOptions: { value: Priority; label: string; color: string }[] = [
    { value: 'low', label: 'Low', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'high', label: 'High', color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-[375px] mx-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-gray-100">New Task</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-gray-300 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add details about this task"
                rows={4}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] transition-colors resize-none"
              />
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-gray-300 mb-2">
                Due Date
              </label>
              <div className="relative">
                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-[#7C3AED] transition-colors"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-3">Priority</label>
              <div className="flex gap-3">
                {priorityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPriority(option.value)}
                    className={`flex-1 py-3 rounded-xl border transition-all ${
                      priority === option.value
                        ? 'border-[#7C3AED] bg-[#7C3AED]/10'
                        : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${option.color}`} />
                      <span className="text-sm">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!title.trim()}
              className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-gray-700 disabled:text-gray-500 text-white py-4 rounded-xl transition-colors mt-8"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
