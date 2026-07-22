import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'qhelfcdm',
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

/**
 * Helper to build high-quality responsive Sanity image URLs
 */
export const urlFor = (source: any) => {
  return builder.image(source);
};

/**
 * Safely resolves an image source to a URL string.
 * Supports Sanity image assets, string URL/paths, and returns fallback empty string.
 */
export const getImageUrl = (source: any): string => {
  if (!source) return '';
  if (typeof source === 'string') return source;
  
  // Check if it looks like a Sanity image object
  if (source.asset && source.asset._ref) {
    try {
      return urlFor(source).url();
    } catch (e) {
      console.warn('Failed to resolve Sanity image url:', e);
      return '';
    }
  }
  
  return '';
};
