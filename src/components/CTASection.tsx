import Link from 'next/link';

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  phone?: string;
}

export default function CTASection({ title, description, buttonText = 'Đặt lịch tư vấn', buttonUrl = '/lien-he', phone }: CTASectionProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        {description && <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{description}</p>}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={buttonUrl}
            className="bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-xl hover:-translate-y-0.5"
          >
            {buttonText}
          </Link>
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-white border-2 border-white/40 hover:border-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Gọi {phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
