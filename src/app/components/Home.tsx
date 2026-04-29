import { Link } from 'react-router';
import { Plus, CheckCircle2, Circle, Clock } from 'lucide-react';
import { useTasks, Task } from '../context/TaskContext';

export function Home() {
  const { tasks, toggleTask } = useTasks();

  const today = new Date().toISOString().split('T')[0];

  const todayTasks = tasks.filter(t => !t.completed && t.dueDate === today);
  const upcomingTasks = tasks.filter(t => !t.completed && t.dueDate > today);
  const doneTasks = tasks.filter(t => t.completed);

  const totalTasks = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
    }
  };

  const TaskItem = ({ task }: { task: Task }) => (
    <Link
      to={`/task/${task.id}`}
      className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-2xl hover:bg-gray-800/70 transition-colors"
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleTask(task.id);
        }}
        className="mt-0.5"
      >
        {task.completed ? (
          <CheckCircle2 className="w-5 h-5 text-[#7C3AED]" />
        ) : (
          <Circle className="w-5 h-5 text-gray-500" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`text-gray-100 ${task.completed ? 'line-through opacity-50' : ''}`}>
            {task.title}
          </h3>
          <div className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(task.priority)}`} />
        </div>
        {task.description && (
          <p className="text-sm text-gray-400 line-clamp-1 mb-2">{task.description}</p>
        )}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  );

  const Section = ({ title, tasks, icon }: { title: string; tasks: Task[]; icon: React.ReactNode }) => (
    tasks.length > 0 && (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          {icon}
          <h2 className="text-gray-400 text-sm uppercase tracking-wide">{title}</h2>
          <span className="text-gray-600 text-sm">({tasks.length})</span>
        </div>
        <div className="space-y-2">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-[375px] mx-auto pb-24">
        <div className="p-6">
          <h1 className="text-gray-100 mb-2">Tasks</h1>
          <p className="text-gray-400 text-sm mb-6">
            {totalTasks} active {totalTasks === 1 ? 'task' : 'tasks'}
          </p>

          <div className="bg-gray-800/50 rounded-2xl p-4 mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Daily Progress</span>
              <span className="text-sm text-[#7C3AED]">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Section
            title="Today"
            tasks={todayTasks}
            icon={<div className="w-2 h-2 rounded-full bg-[#7C3AED]" />}
          />

          <Section
            title="Upcoming"
            tasks={upcomingTasks}
            icon={<div className="w-2 h-2 rounded-full bg-blue-500" />}
          />

          <Section
            title="Done"
            tasks={doneTasks}
            icon={<div className="w-2 h-2 rounded-full bg-green-500" />}
          />
        </div>

        <Link
          to="/add"
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-full flex items-center justify-center shadow-lg shadow-[#7C3AED]/30 transition-all hover:scale-110"
        >
          <Plus className="w-6 h-6 text-white" />
        </Link>
      </div>
    </div>
  );
}
