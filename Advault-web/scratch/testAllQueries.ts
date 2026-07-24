import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'qhelfcdm',
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: false,
});

async function test() {
  try {
    const brands = await sanityClient.fetch('*[_type == "brand"] { _id }');
    console.log('Brands count:', brands.length);
    
    const campaigns = await sanityClient.fetch('*[_type == "campaign"] { _id }');
    console.log('Campaigns count:', campaigns.length);
    
    const posts = await sanityClient.fetch('*[_type == "post"] { _id }');
    console.log('Posts count:', posts.length);
  } catch (err) {
    console.error('Error fetching from CMS:', err);
  }
}

test();
