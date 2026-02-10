import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNewsBySlug, getNews } from '@/lib/strapi';
import JsonLd from '@/components/JsonLd';
import LeadForm from '@/components/LeadForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const news = await getNews();
  return (news || []).map((n: { slug: string }) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: 'Không tìm thấy' };
  const seo = article.seo;
  return {
    title: seo?.metaTitle || `${article.title} – Số 10 Trần Điền`,
    description: seo?.metaDescription || article.excerpt,
    keywords: seo?.keywords,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishDate,
    publisher: {
      '@type': 'Organization',
      name: 'Thẩm Mỹ 10 Trần Điền',
      url: 'https://tuvandichvuthammy.com',
    },
    author: { '@type': 'Organization', name: 'Thẩm Mỹ 10 Trần Điền' },
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-primary-dark py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <Link href="/tin-tuc" className="hover:text-white transition-colors">Tin tức</Link>
            <span>/</span>
            <span className="text-white line-clamp-1">{article.title}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{article.title}</h1>
          {article.publishDate && (
            <time className="text-gray-400">
              {new Date(article.publishDate).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {article.content && (
                <div className="prose max-w-none text-lg" dangerouslySetInnerHTML={{ __html: article.content }} />
              )}

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-3 font-medium">Chia sẻ bài viết:</p>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://tuvandichvuthammy.com/tin-tuc/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://tuvandichvuthammy.com/tin-tuc/${slug}&text=${article.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Đặt Lịch Tư Vấn</h3>
                  <LeadForm sourcePage={`news-${slug}`} />
                </div>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 text-center">
                  <p className="text-gray-600 mb-2">Tư vấn miễn phí</p>
                  <a href="tel:0901234567" className="text-2xl font-bold text-primary">0901 234 567</a>
                  <p className="text-sm text-gray-500 mt-2">📍 Số 10 Trần Điền, Hà Nội</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
