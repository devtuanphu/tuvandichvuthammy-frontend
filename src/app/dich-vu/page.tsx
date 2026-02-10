import { Metadata } from 'next';
import Link from 'next/link';
import { getServices } from '@/lib/strapi';
import CTASection from '@/components/CTASection';
import type { Service } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Dịch Vụ Thẩm Mỹ Tại Số 10 Trần Điền – Hà Nội',
  description: 'Khám phá các dịch vụ thẩm mỹ tại Số 10 Trần Điền, Hà Nội. Nâng mũi, cắt mí, tiêm filler, trẻ hóa da và nhiều dịch vụ khác.',
  keywords: 'dịch vụ thẩm mỹ, 10 Trần Điền, Hà Nội',
};

export default async function ServicesPage() {
  const services: Service[] = (await getServices()) || [];

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Dịch Vụ Thẩm Mỹ</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Khám phá các dịch vụ thẩm mỹ chuyên nghiệp tại Số 10 Trần Điền, Hà Nội
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/dich-vu/${service.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:-translate-y-1"
              >
                <div className="h-52 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">✨</span>
                  {service.priceFrom && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {service.priceFrom}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-3">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{service.description}</p>
                  <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    Tìm hiểu thêm
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Bạn Quan Tâm Dịch Vụ Nào?"
        description="Liên hệ ngay Số 10 Trần Điền để được tư vấn miễn phí bởi chuyên gia"
        phone="0901 234 567"
      />
    </>
  );
}
