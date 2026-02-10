import { Metadata } from 'next';
import { getAboutPage } from '@/lib/strapi';
import CTASection from '@/components/CTASection';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPage();
  const seo = data?.seo;
  return {
    title: seo?.metaTitle || 'Về Chúng Tôi – Thẩm Mỹ 10 Trần Điền',
    description: seo?.metaDescription,
    keywords: seo?.keywords,
  };
}

export default async function AboutPage() {
  const data = await getAboutPage();

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {data?.introSection?.title || 'Về Chúng Tôi'}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Cơ sở tư vấn dịch vụ thẩm mỹ uy tín tại Số 10 Trần Điền, Hà Nội
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {data?.introSection?.description && (
            <div className="prose max-w-none text-lg" dangerouslySetInnerHTML={{ __html: data.introSection.description }} />
          )}
        </div>
      </section>

      {/* Mission & Vision */}
      {data?.missionVision && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{data.missionVision.missionTitle}</h2>
                {data.missionVision.missionContent && (
                  <div className="prose" dangerouslySetInnerHTML={{ __html: data.missionVision.missionContent }} />
                )}
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🔭</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{data.missionVision.visionTitle}</h2>
                {data.missionVision.visionContent && (
                  <div className="prose" dangerouslySetInnerHTML={{ __html: data.missionVision.visionContent }} />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {data?.teamSection && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
              {data.teamSection.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(data.teamSection.members || []).map((member: { name: string; role?: string; bio?: string }, i: number) => (
                <div key={i} className="text-center bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl text-primary font-bold">{member.name?.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  {member.role && <p className="text-primary font-medium mb-3">{member.role}</p>}
                  {member.bio && <p className="text-gray-600 text-sm">{member.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facility */}
      {data?.facilitySection && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">{data.facilitySection.title}</h2>
            {data.facilitySection.description && (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data.facilitySection.description }} />
            )}
            {data.facilitySection.address && (
              <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10 text-center">
                <p className="text-lg font-semibold text-primary">📍 {data.facilitySection.address}</p>
              </div>
            )}
          </div>
        </section>
      )}

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
    </>
  );
}
