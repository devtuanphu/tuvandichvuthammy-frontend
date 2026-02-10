import { MetadataRoute } from 'next';
import { getServices, getNews } from '@/lib/strapi';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thammyhanoi.vn';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, news] = await Promise.all([getServices(), getNews()]);

  const serviceUrls = (services || []).map((s: { slug: string; updatedAt?: string }) => ({
    url: `${BASE_URL}/dich-vu/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const newsUrls = (news || []).map((n: { slug: string; publishDate?: string }) => ({
    url: `${BASE_URL}/tin-tuc/${n.slug}`,
    lastModified: n.publishDate ? new Date(n.publishDate) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/ve-chung-toi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/dich-vu`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/tin-tuc`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/lien-he`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...serviceUrls,
    ...newsUrls,
  ];
}
