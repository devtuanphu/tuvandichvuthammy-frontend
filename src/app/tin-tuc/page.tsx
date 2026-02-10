import { Metadata } from 'next';
import Link from 'next/link';
import { getNews } from '@/lib/strapi';
import type { News } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Tin Tức Thẩm Mỹ – 10 Trần Điền, Hà Nội',
  description: 'Cập nhật tin tức, kiến thức thẩm mỹ mới nhất tại Số 10 Trần Điền, Hà Nội.',
  keywords: 'tin tức thẩm mỹ, 10 Trần Điền, kiến thức làm đẹp',
};

export default async function NewsPage() {
  const news: News[] = (await getNews()) || [];

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tin Tức & Kiến Thức</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Cập nhật thông tin, kiến thức thẩm mỹ mới nhất từ chuyên gia tại 10 Trần Điền
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article) => (
              <Link
                key={article.slug}
                href={`/tin-tuc/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 hover:-translate-y-1"
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                  <span className="text-5xl">📰</span>
                </div>
                <div className="p-6">
                  {article.publishDate && (
                    <time className="text-sm text-gray-400 mb-2 block">
                      {new Date(article.publishDate).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                  )}
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm mt-4 group-hover:gap-2 transition-all">
                    Đọc thêm
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
    </>
  );
}
