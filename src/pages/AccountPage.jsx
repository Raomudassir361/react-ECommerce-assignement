import { useState } from 'react';
import { formatPrice } from '../api/storeApi.js';

export default function AccountPage({
  customer,
  orders,
  loadingOrders,
  error,
  onLogin,
  onRegister,
  onLogout,
}) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    if (mode === 'register' && form.password !== form.confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    setSubmitting(true);
    try {
      const credentials = { email: form.email.trim(), password: form.password };
      await (mode === 'register'
        ? onRegister({ name: form.name.trim(), ...credentials })
        : onLogin(credentials));
    } catch {
      // The parent displays the API error beside the form.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <h1 className="font-integral text-3xl sm:text-4xl font-black uppercase mb-8">Account</h1>
      {error && <p role="alert" className="mb-5 text-sm text-red-600">{error}</p>}
      {customer ? (
        <section className="border border-gray-200 rounded-2xl p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold">{customer.name || customer.fullName || customer.email}</h2>
              <p className="text-sm text-gray-500 mt-1">{customer.email}</p>
            </div>
            <button type="button" onClick={onLogout} className="text-sm underline underline-offset-4">Sign out</button>
          </div>
          <h2 className="text-xl font-bold mb-4">Order history</h2>
          {loadingOrders ? <p className="text-sm text-gray-500">Loading your orders…</p> : orders.length === 0 ? (
            <p className="text-sm text-gray-500">You have not placed any orders while signed in.</p>
          ) : (
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <article key={order.id ?? order._id} className="py-4 first:pt-0">
                  <div className="flex flex-wrap justify-between gap-2 text-sm">
                    <strong>Order #{order.id ?? order._id}</strong>
                    <span>{order.status || 'Processing'}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {(order.date || order.createdAt) ? new Date(order.date || order.createdAt).toLocaleDateString() : ''}
                    {order.total != null ? ` · ${formatPrice(order.total)}` : ''}
                  </p>
                  {(order.items || []).map((item, index) => (
                    <p key={`${item.productId}-${index}`} className="text-sm text-gray-600 mt-1">
                      {item.quantity} × {item.productName}
                    </p>
                  ))}
                </article>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="max-w-md border border-gray-200 rounded-2xl p-5 sm:p-8">
          <div className="flex gap-5 border-b border-gray-200 mb-6">
            {['login', 'register'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setMode(tab)}
                className={`pb-3 text-sm font-semibold capitalize ${mode === tab ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              >
                {tab === 'login' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
            {mode === 'register' && (
              <label className="block text-sm font-medium">
                Name
                <input required autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-1 w-full rounded-xl bg-[#F0F0F0] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-black/20" />
              </label>
            )}
            <label className="block text-sm font-medium">
              Email
              <input required type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-1 w-full rounded-xl bg-[#F0F0F0] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-black/20" />
            </label>
            <label className="block text-sm font-medium">
              Password
              <input required type="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="mt-1 w-full rounded-xl bg-[#F0F0F0] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-black/20" />
            </label>
            {mode === 'register' && (
              <label className="block text-sm font-medium">
                Confirm password
                <input required type="password" autoComplete="new-password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} className="mt-1 w-full rounded-xl bg-[#F0F0F0] px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-black/20" />
              </label>
            )}
            <button disabled={submitting} className="w-full rounded-full bg-black py-3.5 text-sm font-semibold text-white disabled:opacity-60">
              {submitting ? 'Please wait…' : mode === 'register' ? 'Create account' : 'Sign in'}
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
