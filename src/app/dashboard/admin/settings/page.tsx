'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState({
    websiteName: 'CyberProbes',
    websiteUrl: '',
    adminEmail: '',
    razorpayKeyId: '',
    razorpayKeySecret: '',
    stripePublishableKey: '',
    stripeSecretKey: '',
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: '',
    smtpFrom: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    // Load settings from API
    fetchSettings();
  }, [status, router]);

  const fetchSettings = async () => {
    try {
      // In a real app, fetch from API
      // const response = await fetch('/api/admin/settings');
      // const data = await response.json();
      // setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess('');
    setError('');

    try {
      // In a real app, save to API
      // const response = await fetch('/api/admin/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings),
      // });
      // if (!response.ok) throw new Error('Failed to save settings');
      
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to save settings');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-orbitron font-bold text-white mb-6">System Settings</h2>
        
        {success && (
          <div className="mb-4 p-4 bg-neon-green/20 border border-neon-green/50 rounded-lg text-neon-green">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Website Settings */}
          <div className="space-y-4">
            <h3 className="text-xl font-orbitron font-semibold text-cyber-blue">Website Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                  Website Name
                </label>
                <input
                  type="text"
                  value={settings.websiteName}
                  onChange={(e) => setSettings({ ...settings, websiteName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={settings.websiteUrl}
                  onChange={(e) => setSettings({ ...settings, websiteUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>
            </div>
          </div>

          {/* Payment Gateway Settings */}
          <div className="space-y-4">
            <h3 className="text-xl font-orbitron font-semibold text-cyber-blue">Payment Gateway</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                  Razorpay Key ID
                </label>
                <input
                  type="text"
                  value={settings.razorpayKeyId}
                  onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                  placeholder="rzp_test_..."
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                  Razorpay Key Secret
                </label>
                <input
                  type="password"
                  value={settings.razorpayKeySecret}
                  onChange={(e) => setSettings({ ...settings, razorpayKeySecret: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                  Stripe Publishable Key
                </label>
                <input
                  type="text"
                  value={settings.stripePublishableKey}
                  onChange={(e) => setSettings({ ...settings, stripePublishableKey: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                  placeholder="pk_test_..."
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                  Stripe Secret Key
                </label>
                <input
                  type="password"
                  value={settings.stripeSecretKey}
                  onChange={(e) => setSettings({ ...settings, stripeSecretKey: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                  placeholder="sk_test_..."
                />
              </div>
            </div>
          </div>

          {/* SMTP Email Settings */}
          <div className="space-y-4">
            <h3 className="text-xl font-orbitron font-semibold text-cyber-blue">Email Settings (SMTP)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                  SMTP Host
                </label>
                <input
                  type="text"
                  value={settings.smtpHost}
                  onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                  placeholder="smtp.gmail.com"
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                  SMTP Port
                </label>
                <input
                  type="number"
                  value={settings.smtpPort}
                  onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                  placeholder="587"
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                  SMTP User
                </label>
                <input
                  type="email"
                  value={settings.smtpUser}
                  onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                  SMTP Password
                </label>
                <input
                  type="password"
                  value={settings.smtpPassword}
                  onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                  From Email
                </label>
                <input
                  type="email"
                  value={settings.smtpFrom}
                  onChange={(e) => setSettings({ ...settings, smtpFrom: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-cyber-blue hover:bg-cyber-blue/80 text-white rounded-lg font-rajdhani font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

