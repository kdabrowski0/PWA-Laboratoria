import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Trash2, CheckCircle2 } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTask, toggleTask, deleteTask } = useTasks();

  const task = id ? getTask(id) : undefined;

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Task not found</p>
          <button
            onClick={() => navigate('/')}
            className="text-[#7C3AED] hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const getPriorityLabel = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'text-green-500 bg-green-500/10 border-green-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/');
  };

  const handleToggle = () => {
    toggleTask(task.id);
  };

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
            <h1 className="text-gray-100">Task Details</h1>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <h2 className={`text-gray-100 mb-2 ${task.completed ? 'line-through opacity-50' : ''}`}>
                  {task.title}
                </h2>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${getPriorityColor(task.priority)}`}>
                    {getPriorityLabel(task.priority)} priority
                  </span>
                  {task.completed && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs border text-green-500 bg-green-500/10 border-green-500/30">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>

            {task.description && (
              <div className="mb-6">
                <h3 className="text-sm text-gray-400 mb-2">Description</h3>
                <p className="text-gray-300">{task.description}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Due Date</p>
                  <p className="text-gray-300">
                    {new Date(task.dueDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-gray-300">
                    {new Date(task.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleToggle}
              className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>

            <button
              onClick={handleDelete}
              className="w-full bg-gray-800/50 hover:bg-red-500/10 text-red-500 border border-gray-700 hover:border-red-500/30 py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
