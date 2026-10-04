import React, { useState } from 'react';
import InvitationPage from './pages/InvitationPage';
import AdminPage from './pages/AdminPage';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('invitation'); // 'invitation' | 'admin'
  const [lang, setLang] = useState('te'); // 'te' (Telugu) | 'en' (English)

  return (
    <div className="min-h-screen bg-maroon-950 text-silk-100 font-serif relative">
      {currentPage === 'invitation' ? (
        <InvitationPage
          lang={lang}
          setLang={setLang}
          onNavigateAdmin={() => setCurrentPage('admin')}
        />
      ) : (
        <AdminPage
          lang={lang}
          onBackToHome={() => setCurrentPage('invitation')}
        />
      )}
    </div>
  );
}
