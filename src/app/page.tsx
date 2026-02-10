import { Metadata } from 'next';
import Link from 'next/link';
import { getHomePage, getServices } from '@/lib/strapi';
import CTASection from '@/components/CTASection';
import LeadForm from '@/components/LeadForm';
import type { HomePage, Service } from '@/lib/types';

export async function generateMetadata(): Promise<Metadata> {
  const data: HomePage = await getHomePage();
  const seo = data?.seo;
  return {
    title: seo?.metaTitle || 'Tư Vấn Dịch Vụ Thẩm Mỹ Tại Số 10 Trần Điền – Hà Nội',
    description: seo?.metaDescription,
    keywords: seo?.keywords,
    openGraph: { title: seo?.ogTitle || seo?.metaTitle, description: seo?.ogDescription || seo?.metaDescription },
  };
}

export default async function HomePage() {
  const data = await getHomePage();
  const services: Service[] = (await getServices()) || [];

  console.log('[Homepage] data:', JSON.stringify(data).substring(0, 500));
  console.log('[Homepage] services count:', services.length);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary-dark min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/logo.png')] bg-no-repeat bg-center opacity-5 bg-contain" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-primary/30">
              📍 Số 10 Trần Điền, Hà Nội
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {data?.heroSection?.title || 'Tư Vấn Dịch Vụ Thẩm Mỹ Chuyên Nghiệp'}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              {data?.heroSection?.subtitle || 'Đội ngũ chuyên gia thẩm mỹ hàng đầu Hà Nội – Công nghệ hiện đại – An toàn tuyệt đối.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={data?.heroSection?.ctaUrl || '/lien-he'}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-lg shadow-primary/30 hover:-translate-y-0.5 text-center"
              >
                {data?.heroSection?.ctaText || 'Đặt lịch tư vấn miễn phí'}
              </Link>
              <a
                href="tel:0901234567"
                className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all text-center"
              >
                📞 Gọi ngay
              </a>
            </div>
          </div>
        </div>
        {/* Gradient overlay bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Intro Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {data?.introSection?.title || 'Về Cơ Sở 10 Trần Điền'}
              </h2>
              {data?.introSection?.description && (
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data.introSection.description }} />
              )}
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 border border-primary/10">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '10+', label: 'Năm kinh nghiệm' },
                  { number: '5000+', label: 'Khách hàng hài lòng' },
                  { number: '15+', label: 'Chuyên gia' },
                  { number: '98%', label: 'Tỷ lệ hài lòng' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {data?.featuredServices?.title || 'Dịch Vụ Nổi Bật'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {data?.featuredServices?.subtitle || 'Các dịch vụ thẩm mỹ được yêu thích nhất tại 10 Trần Điền'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <Link
                key={service.slug}
                href={`/dich-vu/${service.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:-translate-y-1"
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <span className="text-5xl">✨</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{service.description}</p>
                  {service.priceFrom && (
                    <div className="text-primary font-semibold text-sm">{service.priceFrom}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/dich-vu"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-all"
            >
              Xem tất cả dịch vụ
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            {data?.whyChooseUs?.title || 'Vì Sao Chọn 10 Trần Điền?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(data?.whyChooseUs?.items || []).map((item: { icon?: string; title: string; description?: string }, i: number) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon || '⭐'}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            {data?.processSection?.title || 'Quy Trình Tư Vấn'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(data?.processSection?.steps || []).map((step: { stepNumber: number; title: string; description?: string }) => (
              <div key={step.stepNumber} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4">
                    {step.stepNumber}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            {data?.testimonials?.title || 'Khách Hàng Nói Gì?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(data?.testimonials?.items || []).map((item: { content: string; author: string; role?: string }, i: number) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="text-primary text-3xl mb-4">&ldquo;</div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">{item.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    {item.author?.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{item.author}</div>
                    {item.role && <div className="text-sm text-gray-500">{item.role}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {data?.ctaSection && (
        <CTASection
          title={data.ctaSection.title}
          description={data.ctaSection.description}
          buttonText={data.ctaSection.buttonText}
          buttonUrl={data.ctaSection.buttonUrl}
          phone={data.ctaSection.phone}
        />
      )}

      {/* Inline Lead Form */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Đăng Ký Tư Vấn Miễn Phí</h2>
            <p className="text-gray-600">Để lại thông tin, chuyên gia tại Số 10 Trần Điền sẽ liên hệ bạn sớm nhất</p>
          </div>
          <LeadForm sourcePage="homepage" />
        </div>
      </section>
    </>
  );
}
