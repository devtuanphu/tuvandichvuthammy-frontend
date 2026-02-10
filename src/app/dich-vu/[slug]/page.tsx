import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/lib/strapi';
import CTASection from '@/components/CTASection';
import LeadForm from '@/components/LeadForm';
import JsonLd from '@/components/JsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return (services || []).map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'Không tìm thấy' };
  const seo = service.seo;
  return {
    title: seo?.metaTitle || `${service.title} – 10 Trần Điền`,
    description: seo?.metaDescription || service.description,
    keywords: seo?.keywords,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const benefits = service.benefits ? JSON.parse(service.benefits) : [];
  const process = service.process ? JSON.parse(service.process) : [];
  const faqs = service.faqs ? JSON.parse(service.faqs) : [];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Thẩm Mỹ 10 Trần Điền',
      address: { '@type': 'PostalAddress', streetAddress: 'Số 10 Trần Điền', addressLocality: 'Hà Nội', addressCountry: 'VN' },
    },
    areaServed: 'Hà Nội',
  };

  return (
    <>
      <JsonLd data={serviceSchema} />

      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <a href="/dich-vu" className="hover:text-white transition-colors">Dịch vụ</a>
              <span>/</span>
              <span className="text-white">{service.title}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
            <p className="text-lg text-gray-300">{service.description}</p>
            {service.priceFrom && (
              <div className="mt-6 inline-block bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold border border-white/20">
                💰 {service.priceFrom}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {service.content && (
                <div className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: service.content }} />
              )}

              {/* Benefits */}
              {benefits.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Lợi Ích</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {benefits.map((b: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl">
                        <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process */}
              {process.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Quy Trình</h2>
                  <div className="space-y-4">
                    {process.map((p: { step: number; title: string; desc: string }) => (
                      <div key={p.step} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold shrink-0">
                          {p.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{p.title}</h3>
                          <p className="text-gray-600 text-sm">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ */}
              {faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Câu Hỏi Thường Gặp</h2>
                  <div className="space-y-4">
                    {faqs.map((faq: { q: string; a: string }, i: number) => (
                      <div key={i} className="border border-gray-200 rounded-xl p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">❓ {faq.q}</h3>
                        <p className="text-gray-600">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Đặt Lịch Tư Vấn</h3>
                  <LeadForm sourcePage={`service-${service.slug}`} />
                </div>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 text-center">
                  <p className="text-gray-600 mb-2">Gọi tư vấn miễn phí</p>
                  <a href="tel:0901234567" className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors">
                    0901 234 567
                  </a>
                  <p className="text-sm text-gray-500 mt-2">📍 Số 10 Trần Điền, Hà Nội</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={`Tư Vấn ${service.title} Miễn Phí`}
        description="Đến Số 10 Trần Điền để được chuyên gia tư vấn trực tiếp"
        phone="0901 234 567"
      />
    </>
  );
}
