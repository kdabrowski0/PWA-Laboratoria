import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const STORAGE_KEY = 'todo-app-tasks';

const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create mockups for the homepage redesign',
    dueDate: '2026-04-30',
    priority: 'high',
    completed: false,
    createdAt: '2026-04-28',
  },
  {
    id: '2',
    title: 'Team meeting prep',
    description: 'Prepare slides for weekly sync',
    dueDate: '2026-04-29',
    priority: 'medium',
    completed: false,
    createdAt: '2026-04-27',
  },
  {
    id: '3',
    title: 'Review pull requests',
    description: 'Check and approve pending PRs',
    dueDate: '2026-05-01',
    priority: 'low',
    completed: false,
    createdAt: '2026-04-26',
  },
  {
    id: '4',
    title: 'Update documentation',
    description: 'Add API docs for new endpoints',
    dueDate: '2026-04-28',
    priority: 'medium',
    completed: true,
    createdAt: '2026-04-25',
  },
];

function loadFromStorage(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Task[];
    }
  } catch {
    console.error('Failed to load tasks from localStorage');
  }
  return defaultTasks;
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      console.error('Failed to save tasks to localStorage');
    }
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getTask = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, getTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
}