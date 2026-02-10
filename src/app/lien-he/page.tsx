import { Metadata } from 'next';
import { getContactPage } from '@/lib/strapi';
import LeadForm from '@/components/LeadForm';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPage();
  const seo = data?.seo;
  return {
    title: seo?.metaTitle || 'Liên Hệ Tư Vấn Thẩm Mỹ Tại Số 10 Trần Điền',
    description: seo?.metaDescription,
    keywords: seo?.keywords,
  };
}

export default async function ContactPage() {
  const data = await getContactPage();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Liên Hệ</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Đặt lịch tư vấn miễn phí tại Số 10 Trần Điền, Hà Nội
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Thông Tin Liên Hệ</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Địa chỉ</h3>
                    <p className="text-gray-600 text-lg font-medium">{data?.contactInfo?.address || 'Số 10 Trần Điền, Định Công, Hoàng Mai, Hà Nội'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Điện thoại</h3>
                    <a href={`tel:${(data?.contactInfo?.phone || '0901234567').replace(/\s/g, '')}`} className="text-primary text-lg font-semibold hover:text-primary-dark transition-colors">
                      {data?.contactInfo?.phone || '0901 234 567'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href={`mailto:${data?.contactInfo?.email || 'contact@tuvandichvuthammy.com'}`} className="text-primary hover:text-primary-dark transition-colors">
                      {data?.contactInfo?.email || 'contact@tuvandichvuthammy.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-2xl">🕐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Giờ làm việc</h3>
                    <p className="text-gray-600">{data?.contactInfo?.workingHours || 'Thứ 2 – Thứ 7: 8:00 – 18:00'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {data?.contactFormSection?.title || 'Gửi Yêu Cầu Tư Vấn'}
              </h2>
              {data?.contactFormSection?.description && (
                <p className="text-gray-600 mb-8">{data.contactFormSection.description}</p>
              )}
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <LeadForm sourcePage="contact" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      {data?.mapSection?.embedUrl && (
        <section className="py-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {data.mapSection.title || 'Bản Đồ Đến Số 10 Trần Điền'}
            </h2>
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                src={data.mapSection.embedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Số 10 Trần Điền"
              />
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-primary py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Gọi Ngay Để Được Tư Vấn</h2>
          <a
            href={`tel:${(data?.contactInfo?.phone || '0901234567').replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-xl hover:bg-gray-50 transition-colors shadow-xl"
          >
            📞 {data?.contactInfo?.phone || '0901 234 567'}
          </a>
        </div>
      </section>
    </>
  );
}
