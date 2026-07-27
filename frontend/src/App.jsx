import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { HackathonProvider } from './context/HackathonContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HackathonProvider>
          <div className="min-h-screen flex flex-col bg-[#030304] text-gray-100 selection:bg-lime-400 selection:text-black font-sans">
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#0c0c0f',
                  color: '#f8fafc',
                  border: '1px solid rgba(163, 230, 53, 0.4)',
                  fontSize: '12px',
                  borderRadius: '9999px',
                  padding: '10px 18px',
                },
                iconTheme: {
                  primary: '#a3e635',
                  secondary: '#000000',
                },
              }}
            />
            <Navbar />
            <main className="flex-1">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </HackathonProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
