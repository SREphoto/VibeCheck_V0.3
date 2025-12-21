import React, { useEffect } from 'react';
import { useStore } from './store/store';
import Header from './components/Header';
import Feed from './components/Feed';
import RefineModal from './components/RefineModal';

const App: React.FC = () => {
  const { theme, setTheme } = useStore();

  // Init theme on load
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen text-gray-900 dark:text-gray-100 pb-20`}>
      <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-indigo-950 dark:to-black opacity-80" />
      
      <Header />
      
      <main className="container mx-auto px-4 pt-6 max-w-7xl">
         <Feed />
      </main>

      <RefineModal />
    </div>
  );
};

export default App;