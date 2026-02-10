export interface StrapiSeo {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  canonicalURL?: string;
  metaRobots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: StrapiImage;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: StrapiImage;
}

export interface StrapiImage {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface Global {
  siteName: string;
  logo?: StrapiImage;
  address: string;
  phone: string;
  email: string;
  defaultSeo?: StrapiSeo;
}

export interface HeroSection {
  title: string;
  subtitle?: string;
  backgroundImage?: StrapiImage;
  ctaText?: string;
  ctaUrl?: string;
}

export interface IntroSection {
  title: string;
  description?: string;
  image?: StrapiImage;
}

export interface FeaturedServices {
  title: string;
  subtitle?: string;
}

export interface FeatureItem {
  icon?: string;
  title: string;
  description?: string;
}

export interface WhyChooseUs {
  title: string;
  items?: FeatureItem[];
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description?: string;
}

export interface ProcessSection {
  title: string;
  steps?: ProcessStep[];
}

export interface Testimonial {
  content: string;
  author: string;
  role?: string;
}

export interface TestimonialsSection {
  title: string;
  items?: Testimonial[];
}

export interface CTASection {
  title: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  phone?: string;
}

export interface MissionVision {
  missionTitle: string;
  missionContent?: string;
  visionTitle: string;
  visionContent?: string;
}

export interface TeamMember {
  name: string;
  role?: string;
  bio?: string;
}

export interface TeamSection {
  title: string;
  members?: TeamMember[];
}

export interface FacilitySection {
  title: string;
  description?: string;
  address?: string;
}

export interface ContactInfo {
  address: string;
  phone?: string;
  email?: string;
  workingHours?: string;
}

export interface MapSection {
  title?: string;
  embedUrl?: string;
}

export interface ContactFormSection {
  title?: string;
  description?: string;
}

export interface HomePage {
  heroSection?: HeroSection;
  introSection?: IntroSection;
  featuredServices?: FeaturedServices;
  whyChooseUs?: WhyChooseUs;
  processSection?: ProcessSection;
  testimonials?: TestimonialsSection;
  ctaSection?: CTASection;
  seo?: StrapiSeo;
}

export interface AboutPage {
  introSection?: IntroSection;
  missionVision?: MissionVision;
  teamSection?: TeamSection;
  facilitySection?: FacilitySection;
  ctaSection?: CTASection;
  seo?: StrapiSeo;
}

export interface ContactPage {
  contactInfo?: ContactInfo;
  mapSection?: MapSection;
  contactFormSection?: ContactFormSection;
  seo?: StrapiSeo;
}

export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  benefits?: string;
  process?: string;
  priceFrom?: string;
  faqs?: string;
  coverImage?: StrapiImage;
  seo?: StrapiSeo;
}

export interface News {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: StrapiImage;
  publishDate?: string;
  seo?: StrapiSeo;
}
