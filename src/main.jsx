import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { router } from './routes/Route.jsx';
import { RouterProvider } from 'react-router-dom';
import AuthProviders from './providers/AuthProviders'; // Ensure correct import
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders> 
      <QueryClientProvider client={queryClient}>
        <div className="mx-auto max-w-5xl">
          <RouterProvider router={router} />
          <ToastContainer />
        </div>
      </QueryClientProvider>
    </AuthProviders>
  </StrictMode>
);
