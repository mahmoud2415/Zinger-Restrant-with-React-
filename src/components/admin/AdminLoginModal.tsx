import React, { useState } from 'react';
import { X, Shield, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../../services/authService';
import { AdminUser } from '../../types';
import { useToast } from '../../context/ToastContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (admin: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('يرجى كتابة البريد وكلمة السر');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const admin = await loginAdmin(email, password);
      showToast('مرحباً بك في لوحة تحكم مطعم زينجر! 👑');
      onLoginSuccess(admin);
      onClose();
    } catch (err: any) {
      setError(err.message || 'بيانات الدخول غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm animate-fade-in"
      />

      <div className="relative w-full max-w-sm rounded-3xl bg-zinc-950 border border-zinc-800 p-6 z-10 shadow-2xl animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinger-yellow/40 flex items-center justify-center mx-auto text-zinger-yellow shadow-glow-yellow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-black text-xl text-white uppercase tracking-tight">
            ZINGER ADMIN
          </h2>
          <p className="text-xs text-zinc-400 font-cairo">
            تسجيل دخول إدارة مطعم زينجر
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-zinger-red/10 border border-zinger-red/30 flex items-center gap-2 text-zinger-red text-xs font-cairo">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-cairo font-semibold text-zinc-300 block mb-1">
              البريد الإلكتروني للأدمن
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                placeholder="admin@zinger.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-3 pr-9 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-zinger-yellow text-xs text-white placeholder-zinc-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-cairo font-semibold text-zinc-300 block mb-1">
              كلمة السر
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3 pr-9 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-zinger-yellow text-xs text-white placeholder-zinc-600 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-zinger-yellow hover:bg-zinger-yellowHover text-black font-cairo font-black text-xs uppercase tracking-wider transition-all shadow-glow-yellow flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>دخول لوحة التحكم</span>
            )}
          </button>
        </form>

        <p className="text-[10px] text-zinc-500 text-center font-cairo mt-4">
          مخصص فقط لإدارة مطعم زينجر لتعديل الوجبات، الأسعار، والعروض
        </p>
      </div>
    </div>
  );
};
