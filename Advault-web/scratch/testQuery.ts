import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'qhelfcdm',
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: false,
});

async function test() {
  try {
    const result = await sanityClient.fetch('*[_type == "post"] { _id, title }');
    console.log('Sanity Posts:', result);
  } catch (err) {
    console.error('Error fetching:', err);
  }
}

test();
