import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'qhelfcdm',
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: false,
});

async function test() {
  try {
    const result = await sanityClient.fetch('*[_type == "post"]');
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
