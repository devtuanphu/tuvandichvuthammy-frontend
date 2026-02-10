'use client';

import { useState } from 'react';
import { createLead } from '@/lib/strapi';

interface LeadFormProps {
  sourcePage?: string;
}

export default function LeadForm({ sourcePage = 'general' }: LeadFormProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const ok = await createLead({ ...formData, sourcePage });
      setStatus(ok ? 'success' : 'error');
      if (ok) setFormData({ name: '', phone: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-primary mb-2">Gửi thành công!</h3>
        <p className="text-gray-600">Chuyên gia tại Số 10 Trần Điền sẽ liên hệ tư vấn cho bạn trong thời gian sớm nhất.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-primary hover:underline font-medium"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
          <input
            id="lead-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="Nguyễn Văn A"
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
          <input
            id="lead-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="0901 234 567"
          />
        </div>
      </div>
      <div>
        <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="lead-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          placeholder="email@example.com"
        />
      </div>
      <div>
        <label htmlFor="lead-message" className="block text-sm font-medium text-gray-700 mb-1">Nội dung tư vấn</label>
        <textarea
          id="lead-message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
          placeholder="Bạn muốn tư vấn dịch vụ nào?"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
      </button>
      {status === 'error' && (
        <p className="text-red-500 text-sm text-center">Có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp.</p>
      )}
    </form>
  );
}
