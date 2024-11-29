import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage, UploadPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/upload',
    element: <UploadPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
