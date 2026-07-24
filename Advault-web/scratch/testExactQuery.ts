import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'qhelfcdm',
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: false,
});

async function test() {
  try {
    const sanityPosts = await sanityClient.fetch(`
      *[_type == "post"] | order(date desc) {
        _id,
        title,
        "slug": slug.current,
        date,
        category,
        excerpt,
        content,
        readTime,
        thumbnail
      }
    `);
    console.log('Sanity Posts:', JSON.stringify(sanityPosts, null, 2));
  } catch (err) {
    console.error('Query failed:', err);
  }
}

test();
