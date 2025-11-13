'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  transactionId: string | null;
  createdAt: string;
  enrollment: {
    id: string;
    user: {
      name: string;
      email: string;
    };
    course: {
      title: string;
    };
  };
}

export default function AdminPaymentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (status === 'authenticated') {
      fetchPayments();
    }
  }, [status, router, filter]);

  const fetchPayments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/payments');
      if (!response.ok) throw new Error('Failed to fetch payments');
      const data = await response.json();
      setPayments(data);
      
      // Calculate stats
      const completed = data.filter((p: Payment) => p.status === 'completed');
      const pending = data.filter((p: Payment) => p.status === 'pending');
      const failed = data.filter((p: Payment) => p.status === 'failed');
      
      setStats({
        total: data.length,
        completed: completed.length,
        pending: pending.length,
        failed: failed.length,
      });
      
      const revenue = completed.reduce((sum: number, p: Payment) => sum + p.amount, 0);
      setTotalRevenue(revenue);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPayment = async (paymentId: string) => {
    try {
      const response = await fetch(`/api/payments/${paymentId}/verify`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to verify payment');
      fetchPayments();
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('Failed to verify payment');
    }
  };

  const filteredPayments = filter === 'all' 
    ? payments 
    : payments.filter(p => p.status === filter);

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-xl border border-gray-700">
          <div className="text-gray-400 text-sm font-rajdhani mb-2">Total Revenue</div>
          <div className="text-3xl font-orbitron font-bold text-cyber-blue">
            ₹{totalRevenue.toLocaleString()}
          </div>
        </div>
        <div className="glass-card p-6 rounded-xl border border-gray-700">
          <div className="text-gray-400 text-sm font-rajdhani mb-2">Total Payments</div>
          <div className="text-3xl font-orbitron font-bold text-white">
            {stats.total}
          </div>
        </div>
        <div className="glass-card p-6 rounded-xl border border-gray-700">
          <div className="text-gray-400 text-sm font-rajdhani mb-2">Completed</div>
          <div className="text-3xl font-orbitron font-bold text-neon-green">
            {stats.completed}
          </div>
        </div>
        <div className="glass-card p-6 rounded-xl border border-gray-700">
          <div className="text-gray-400 text-sm font-rajdhani mb-2">Pending</div>
          <div className="text-3xl font-orbitron font-bold text-yellow-400">
            {stats.pending}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        {(['all', 'completed', 'pending', 'failed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-rajdhani font-medium transition-all ${
              filter === f
                ? 'bg-cyber-blue text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Payments Table */}
      <div className="glass-card rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-rajdhani font-semibold text-gray-300">User</th>
                <th className="px-6 py-4 text-left text-sm font-rajdhani font-semibold text-gray-300">Course</th>
                <th className="px-6 py-4 text-left text-sm font-rajdhani font-semibold text-gray-300">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-rajdhani font-semibold text-gray-300">Method</th>
                <th className="px-6 py-4 text-left text-sm font-rajdhani font-semibold text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-rajdhani font-semibold text-gray-300">Transaction ID</th>
                <th className="px-6 py-4 text-left text-sm font-rajdhani font-semibold text-gray-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-rajdhani font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-800/50">
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{payment.enrollment.user.name}</div>
                    <div className="text-xs text-gray-400">{payment.enrollment.user.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {payment.enrollment.course.title}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-cyber-blue">
                    ₹{payment.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {payment.paymentMethod}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-rajdhani font-semibold ${
                      payment.status === 'completed' ? 'bg-neon-green/20 text-neon-green' :
                      payment.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                    {payment.transactionId || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {payment.status === 'pending' && (
                      <button
                        onClick={() => handleVerifyPayment(payment.id)}
                        className="px-3 py-1 rounded-lg bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50 hover:bg-cyber-blue hover:text-white transition-colors text-sm font-rajdhani"
                      >
                        Verify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPayments.length === 0 && (
          <div className="text-center py-12 text-gray-400 font-rajdhani">
            No payments found
          </div>
        )}
      </div>
    </div>
  );
}

