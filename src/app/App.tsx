import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { TaskProvider } from './context/TaskContext';
import { router } from './routes';

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  );
}