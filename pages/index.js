import React, { useState } from 'react';
import { Plus, TrendingUp, Coins, Calendar, Target, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Head from 'next/head';

const BitcoinDCATracker = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ sats: '', price: '', amount: '', date: '' });
  const [showForm, setShowForm] = useState(false);
  const startDate = '2025-08-29';

  const totalSats = entries.reduce((sum, entry) => sum + entry.sats, 0);
  const totalInvested = entries.reduce((sum, entry) => sum + entry.amount, 0);
  const averagePrice = totalInvested > 0 ? (totalInvested / (totalSats / 100000000)) : 0;

  const getCurrentBTCPrice = () => 65000; // Mock current price
  const currentValue = (totalSats / 100000000) * getCurrentBTCPrice();
  const profitLoss = currentValue - totalInvested;
  const profitLossPercentage = totalInvested > 0 ? ((profitLoss / totalInvested) * 100) : 0;

  // Prepare chart data
  const chartData = entries.map((entry, index) => ({
    date: entry.date,
    totalSats: entries.slice(0, index + 1).reduce((sum, e) => sum + e.sats, 0),
    totalInvested: entries.slice(0, index + 1).reduce((sum, e) => sum + e.amount, 0),
    week: `W${entry.week}`
  }));

  const addEntry = () => {
    if (newEntry.sats && newEntry.price && newEntry.amount && newEntry.date) {
      const entry = {
        id: entries.length + 1,
        week: entries.length + 1,
        date: newEntry.date,
        sats: parseInt(newEntry.sats),
        price: parseFloat(newEntry.price),
        amount: parseFloat(newEntry.amount)
      };
      setEntries([...entries, entry]);
      setNewEntry({ sats: '', price: '', amount: '', date: '' });
      setShowForm(false);
    }
  };

  const formatNumber = (num) => {
    return num.toLocaleString('th-TH');
  };

  const formatSats = (sats) => {
    return sats.toLocaleString('th-TH');
  };

  const formatDateThai = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('th-TH', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // Stack the Future Logo Component
  const StackLogo = () => (
    <div className="flex flex-col items-center mb-2">
      <div className="text-white text-3xl md:text-4xl font-black tracking-wider mb-2">
        STACK THE FUTURE
      </div>
      <div className="flex flex-col items-center space-y-1">
        <div className="w-32 h-1 bg-orange-500 rounded-full"></div>
        <div className="w-24 h-1 bg-orange-400 rounded-full"></div>
        <div className="w-16 h-1 bg-orange-300 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Bitcoin DCA Tracker - Stack the Future</title>
        <meta name="description" content="Stacking Sats today to own tomorrow - Track your Bitcoin DCA journey" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            <StackLogo />
            <div className="flex items-center justify-center mb-4">
              <div className="bg-orange-500 p-3 rounded-full mr-4">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                Bitcoin DCA Tracker
              </h1>
            </div>
            <p className="text-orange-400 text-lg font-medium mb-2">Stacking Sats today to own tomorrow</p>
            
            {/* Start Date Display (Read-only) */}
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <Calendar className="w-4 h-4" />
              <span>เริ่มต้น DCA: </span>
              <span className="text-orange-400">{formatDateThai(startDate)}</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 hover:shadow-orange-500/20 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl">₿</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Total Sats</h3>
              <p className="text-2xl font-bold text-white">{formatSats(totalSats)}</p>
              <p className="text-sm text-orange-400 mt-1">{(totalSats / 100000000).toFixed(6)} BTC</p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 hover:shadow-orange-500/20 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Total Invested</h3>
              <p className="text-2xl font-bold text-white">฿{formatNumber(totalInvested)}</p>
              <p className="text-sm text-orange-400 mt-1">{entries.length} weeks</p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 hover:shadow-orange-500/20 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Avg Buy Price</h3>
              <p className="text-2xl font-bold text-white">฿{formatNumber(Math.round(averagePrice))}</p>
              <p className="text-sm text-orange-400 mt-1">Per BTC</p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 hover:shadow-orange-500/20 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl">{profitLoss >= 0 ? '📈' : '📉'}</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">P&L</h3>
              <p className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ฿{formatNumber(Math.round(profitLoss))}
              </p>
              <p className={`text-sm mt-1 ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {profitLoss >= 0 ? '+' : ''}{profitLossPercentage.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Chart */}
          {entries.length > 0 && (
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 mb-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-orange-500" />
                DCA Progress Chart
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="week" 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right"
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value, name) => {
                        if (name === 'totalSats') {
                          return [`${formatSats(value)} sats`, 'Total Sats'];
                        } else {
                          return [`฿${formatNumber(value)}`, 'Total Invested'];
                        }
                      }}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="totalSats" 
                      stroke="#F97316" 
                      strokeWidth={3}
                      dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#F97316', strokeWidth: 2 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="totalInvested" 
                      stroke="#34D399" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#34D399', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-0.5 bg-orange-500 mr-2"></div>
                  <span className="text-gray-300">Total Sats</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-0.5 bg-green-400 mr-2" style={{borderStyle: 'dashed'}}></div>
                  <span className="text-gray-300">Total Invested</span>
                </div>
              </div>
            </div>
          )}

          {/* Add New Entry Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-orange-500/25 hover:shadow-xl transition-all duration-200 flex items-center mx-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              เพิ่ม DCA รายการใหม่
            </button>
          </div>

          {/* Add Entry Form */}
          {showForm && (
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                เพิ่มรายการ DCA ใหม่
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">วันที่</label>
                  <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">จำนวน Sats</label>
                  <input
                    type="number"
                    value={newEntry.sats}
                    onChange={(e) => setNewEntry({...newEntry, sats: e.target.value})}
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="50000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">ราคา BTC (฿)</label>
                  <input
                    type="number"
                    value={newEntry.price}
                    onChange={(e) => setNewEntry({...newEntry, price: e.target.value})}
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="42000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">จำนวนเงิน (฿)</label>
                  <input
                    type="number"
                    value={newEntry.amount}
                    onChange={(e) => setNewEntry({...newEntry, amount: e.target.value})}
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="21"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={addEntry}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                >
                  เพิ่มรายการ
                </button>
              </div>
            </div>
          )}

          {/* DCA History Table */}
          {entries.length > 0 && (
            <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-orange-500" />
                  ประวัติ DCA
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">สัปดาห์</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">วันที่</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-200">Sats ที่ได้</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-200">ราคา BTC</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-200">จำนวนเงิน</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-200">BTC ที่ได้</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {entries.map((entry, index) => (
                      <tr key={entry.id} className="hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="bg-orange-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                              #{entry.week}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-200">{formatDateThai(entry.date)}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-sm font-medium text-white">{formatSats(entry.sats)}</div>
                          <div className="text-xs text-orange-400">sats</div>
                        </td>
                        <td className="px-6 py-4 text-right text-sm text-gray-200">
                          ฿{formatNumber(entry.price)}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-white">
                          ฿{formatNumber(entry.amount)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-sm font-medium text-white">
                            {(entry.sats / 100000000).toFixed(6)}
                          </div>
                          <div className="text-xs text-gray-400">BTC</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
            <p className="text-orange-400 text-lg font-medium mb-2">
              🚀 Stacking Sats today to own tomorrow 
              <span className="ml-2 text-2xl">₿</span>
            </p>
            <p className="text-gray-400 text-sm">
              "In Bitcoin we trust, in DCA we stack"
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BitcoinDCATracker;
