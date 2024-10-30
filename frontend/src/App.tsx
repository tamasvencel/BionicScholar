import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage></LandingPage>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
