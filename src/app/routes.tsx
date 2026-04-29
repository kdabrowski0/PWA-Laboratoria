import { createBrowserRouter } from 'react-router';
import { Home } from './components/Home';
import { AddTask } from './components/AddTask';
import { TaskDetail } from './components/TaskDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/add',
    Component: AddTask,
  },
  {
    path: '/task/:id',
    Component: TaskDetail,
  },
]);
