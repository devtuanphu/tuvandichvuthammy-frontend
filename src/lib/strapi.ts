const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || '';

export function getStrapiURL(path = '') {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiImageUrl(url: string) {
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

async function fetchStrapi(path: string, params: Record<string, string> = {}) {
  const url = new URL(`/api${path}`, STRAPI_URL);
  // Use pLevel for deep population (strapi-v5-plugin-populate-deep)
  if (!params['pLevel']) {
    url.searchParams.set('pLevel', '5');
  }
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    cache: 'no-store',
  });

  console.log(`[Strapi] ${url.toString()} => ${res.status}`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Strapi fetch error: ${res.status} ${res.statusText} for ${url.toString()}`);
    console.error(`Error body:`, errorText);
    return null;
  }

  const json = await res.json();
  console.log(`[Strapi] Data for ${path}:`, JSON.stringify(json.data).substring(0, 500));
  return json.data;
}

// --- Single Types ---
export async function getGlobal() {
  return fetchStrapi('/global');
}

export async function getHomePage() {
  return fetchStrapi('/home-page');
}

export async function getAboutPage() {
  return fetchStrapi('/about-page');
}

export async function getContactPage() {
  return fetchStrapi('/contact-page');
}

// --- Collection Types ---
export async function getServices() {
  return fetchStrapi('/services', { sort: 'createdAt:asc' });
}

export async function getServiceBySlug(slug: string) {
  const data = await fetchStrapi('/services', {
    'filters[slug][$eq]': slug,
  });
  return data?.[0] || null;
}

export async function getNews() {
  return fetchStrapi('/newses', { sort: 'publishDate:desc' });
}

export async function getNewsBySlug(slug: string) {
  const data = await fetchStrapi('/newses', {
    'filters[slug][$eq]': slug,
  });
  return data?.[0] || null;
}

// --- Lead ---
export async function createLead(data: { name: string; phone: string; email?: string; message?: string; sourcePage?: string }) {
  const res = await fetch(`${STRAPI_URL}/api/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });
  return res.ok;
}
