import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminPage({ onBackToHome, lang }) {
  return (
    <div className="min-h-screen py-8">
      <AdminDashboard onBackToHome={onBackToHome} lang={lang} />
    </div>
  );
}
