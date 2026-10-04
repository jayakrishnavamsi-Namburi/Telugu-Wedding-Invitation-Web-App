import React, { useState, useEffect } from 'react';
import { ShieldCheck, Download, Trash2, Search, Filter, Users, UserCheck, RefreshCw, Lock, ArrowLeft, Heart, Phone, Utensils } from 'lucide-react';

export default function AdminDashboard({ onBackToHome, lang }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [guests, setGuests] = useState([]);
  const [stats, setStats] = useState({
    totalRsvps: 0,
    totalAttendees: 0,
    groomSide: 0,
    brideSide: 0,
    commonSide: 0,
    attendanceBreakdown: { allEvents: 0, muhurthamOnly: 0, receptionOnly: 0, declined: 0 },
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSide, setFilterSide] = useState('ALL');

  // Verify PIN (Default 1432)
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === '1432' || pin === 'admin') {
      setIsAuthenticated(true);
      fetchGuests();
    } else {
      setPinError(true);
    }
  };

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const [resGuests, resStats] = await Promise.all([
        fetch('/api/guests'),
        fetch('/api/guests/stats'),
      ]);

      const dataGuests = await resGuests.json();
      const dataStats = await resStats.json();

      if (dataGuests.success) {
        setGuests(dataGuests.data);
      }
      if (dataStats.success) {
        setStats(dataStats.stats);
      }
    } catch (error) {
      console.warn('Backend API connection issue, using mock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this RSVP entry?')) return;
    try {
      await fetch(`/api/guests/${id}`, { method: 'DELETE' });
      setGuests((prev) => prev.filter((g) => g._id !== id));
      // Refresh stats
      fetchGuests();
    } catch (error) {
      console.error('Delete error:', error);
      setGuests((prev) => prev.filter((g) => g._id !== id));
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Side', 'Attendance', 'GuestCount', 'DietaryPreference', 'Wishes', 'SubmittedAt'];
    const rows = guests.map((g) => [
      `"${g.name.replace(/"/g, '""')}"`,
      `"${g.phone}"`,
      `"${g.email || ''}"`,
      `"${g.side}"`,
      `"${g.attendance}"`,
      g.guestCount,
      `"${g.dietaryPreference}"`,
      `"${(g.wishes || '').replace(/"/g, '""')}"`,
      `"${new Date(g.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Telugu_Wedding_Guest_RSVP_List_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.includes(searchTerm) ||
      (g.wishes && g.wishes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSide =
      filterSide === 'ALL' ||
      (filterSide === 'GROOM' && g.side.includes('Groom')) ||
      (filterSide === 'BRIDE' && g.side.includes('Bride')) ||
      (filterSide === 'COMMON' && g.side.includes('Common'));

    return matchesSearch && matchesSide;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="royal-card max-w-md w-full p-8 rounded-3xl border-2 border-gold-500/40 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full gold-gradient-bg mx-auto flex items-center justify-center text-maroon-950 mb-4 shadow-lg">
            <Lock className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-bold font-royal gold-gradient-text mb-1">
            పెళ్ళి వారి అడ్మిన్ లాగిన్ (Admin Portal)
          </h2>
          <p className="text-xs text-gold-300/80 mb-6">
            Enter Security PIN to manage Wedding RSVPs, Guest list & Attendance
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter PIN (Default: 1432)"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                className="w-full px-4 py-3 text-center text-xl tracking-widest font-mono rounded-xl bg-maroon-900/90 border border-gold-500/50 text-gold-100 placeholder-gold-500/40 focus:outline-none focus:ring-2 focus:ring-gold-400"
                autoFocus
              />
            </div>
            {pinError && (
              <p className="text-xs text-red-400 font-semibold">❌ Invalid PIN. Please try again.</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-full gold-gradient-bg text-maroon-950 font-bold text-sm uppercase tracking-wider shadow-lg hover:scale-[1.02] transition"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gold-500/20">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Invitation</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-maroon-900/60 p-6 rounded-3xl border border-gold-500/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2.5 rounded-full bg-gold-500/20 text-gold-300 hover:bg-gold-500/30 transition"
            title="Back to Invitation"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-royal gold-gradient-text">
              పెళ్ళి పిలుపు • RSVP మేనేజ్‌మెంట్
            </h1>
            <p className="text-xs text-gold-300/80">
              Traditional Telugu Wedding Guest Coordination & Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchGuests}
            className="px-4 py-2 rounded-xl bg-maroon-950 border border-gold-500/40 text-gold-300 text-xs font-semibold flex items-center gap-2 hover:bg-maroon-900 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl gold-gradient-bg text-maroon-950 text-xs font-bold flex items-center gap-2 shadow-md hover:scale-105 transition"
          >
            <Download className="w-4 h-4" />
            <span>Export to CSV / Excel</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-maroon-900/80 to-maroon-950/90 p-5 rounded-2xl border border-gold-500/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gold-300 font-semibold uppercase">Total RSVPs</span>
            <span className="p-2 rounded-lg bg-gold-500/20 text-gold-400">📝</span>
          </div>
          <p className="text-3xl font-bold text-gold-100 font-serif">{guests.length}</p>
          <p className="text-[11px] text-gold-400 mt-1">Confirmed Submissions</p>
        </div>

        <div className="bg-gradient-to-br from-maroon-900/80 to-maroon-950/90 p-5 rounded-2xl border border-gold-500/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gold-300 font-semibold uppercase">Total Headcount</span>
            <span className="p-2 rounded-lg bg-gold-500/20 text-gold-400">👥</span>
          </div>
          <p className="text-3xl font-bold text-gold-100 font-serif">
            {guests.reduce((sum, g) => (!g.attendance.includes('Regretfully') ? sum + Number(g.guestCount || 1) : sum), 0)}
          </p>
          <p className="text-[11px] text-gold-400 mt-1">Expected Attendees</p>
        </div>

        <div className="bg-gradient-to-br from-maroon-900/80 to-maroon-950/90 p-5 rounded-2xl border border-gold-500/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gold-300 font-semibold uppercase">Groom's Side</span>
            <span className="p-2 rounded-lg bg-gold-500/20 text-gold-400">👑</span>
          </div>
          <p className="text-3xl font-bold text-gold-100 font-serif">
            {guests.filter((g) => g.side.includes('Groom')).length}
          </p>
          <p className="text-[11px] text-gold-400 mt-1">వరుడి వైపు బంధువులు</p>
        </div>

        <div className="bg-gradient-to-br from-maroon-900/80 to-maroon-950/90 p-5 rounded-2xl border border-gold-500/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gold-300 font-semibold uppercase">Bride's Side</span>
            <span className="p-2 rounded-lg bg-gold-500/20 text-gold-400">👸</span>
          </div>
          <p className="text-3xl font-bold text-gold-100 font-serif">
            {guests.filter((g) => g.side.includes('Bride')).length}
          </p>
          <p className="text-[11px] text-gold-400 mt-1">వధువు వైపు బంధువులు</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-maroon-900/40 p-4 rounded-2xl border border-gold-500/30">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, phone or wish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-maroon-950 border border-gold-500/40 text-xs text-gold-100 placeholder-gold-500/40 focus:outline-none focus:border-gold-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setFilterSide('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterSide === 'ALL'
                ? 'gold-gradient-bg text-maroon-950 font-bold'
                : 'bg-maroon-950 text-gold-300 border border-gold-500/30'
            }`}
          >
            All ({guests.length})
          </button>
          <button
            onClick={() => setFilterSide('GROOM')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterSide === 'GROOM'
                ? 'gold-gradient-bg text-maroon-950 font-bold'
                : 'bg-maroon-950 text-gold-300 border border-gold-500/30'
            }`}
          >
            Groom ({guests.filter((g) => g.side.includes('Groom')).length})
          </button>
          <button
            onClick={() => setFilterSide('BRIDE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterSide === 'BRIDE'
                ? 'gold-gradient-bg text-maroon-950 font-bold'
                : 'bg-maroon-950 text-gold-300 border border-gold-500/30'
            }`}
          >
            Bride ({guests.filter((g) => g.side.includes('Bride')).length})
          </button>
          <button
            onClick={() => setFilterSide('COMMON')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterSide === 'COMMON'
                ? 'gold-gradient-bg text-maroon-950 font-bold'
                : 'bg-maroon-950 text-gold-300 border border-gold-500/30'
            }`}
          >
            Common ({guests.filter((g) => g.side.includes('Common')).length})
          </button>
        </div>
      </div>

      {/* Guests Table */}
      <div className="royal-card rounded-2xl overflow-hidden border border-gold-500/40 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gold-200">
            <thead className="bg-maroon-950/90 text-gold-400 uppercase tracking-wider font-semibold border-b border-gold-500/30">
              <tr>
                <th className="px-5 py-3.5">Guest & Family</th>
                <th className="px-4 py-3.5">Side</th>
                <th className="px-4 py-3.5">Attendance</th>
                <th className="px-3 py-3.5 text-center">Count</th>
                <th className="px-4 py-3.5">Feast Preference</th>
                <th className="px-5 py-3.5">Blessings & Wishes</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-500/20 bg-maroon-900/30">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gold-400/80">
                    No RSVP entries found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredGuests.map((g) => (
                  <tr key={g._id} className="hover:bg-maroon-900/60 transition">
                    <td className="px-5 py-4 font-medium text-gold-100">
                      <div className="font-bold text-sm text-gold-100">{g.name}</div>
                      <div className="text-[11px] text-gold-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" />
                        <span>{g.phone}</span>
                        {g.email && <span className="text-gold-500/70">| {g.email}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gold-500/20 text-gold-300 border border-gold-500/40">
                        {g.side.includes('Groom') ? '👑 Groom' : g.side.includes('Bride') ? '👸 Bride' : '🤝 Well-Wisher'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-semibold ${
                          g.attendance.includes('Regretfully')
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        {g.attendance.split('(')[0]}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center font-bold text-gold-100 text-sm">
                      {g.guestCount || 1}
                    </td>
                    <td className="px-4 py-4 text-[11px] text-gold-300">
                      <div className="flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span>{g.dietaryPreference.includes('Traditional') ? 'Andhra Satvik' : 'Special Feast'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 max-w-xs text-gold-300 italic text-[11px]">
                      "{g.wishes}"
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => handleDelete(g._id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-900/50 hover:text-red-200 transition"
                        title="Delete RSVP"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
