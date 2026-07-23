import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

// Helper to get auth token from Sanity CLI config
function getAuthToken(): string | undefined {
  if (process.env.SANITY_AUTH_TOKEN) {
    return process.env.SANITY_AUTH_TOKEN;
  }

  const userHome = process.env.USERPROFILE || process.env.HOMEPATH || '';
  const configPath = path.join(userHome, '.config', 'sanity', 'config.json');
  
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config.authToken;
    } catch (e) {
      console.warn('Failed to parse Sanity CLI config:', e);
    }
  }
  return undefined;
}

const token = getAuthToken();

if (!token) {
  console.error('Error: Could not retrieve Sanity CLI auth token. Please run "npx sanity login" first.');
  process.exit(1);
}

// Instantiate client with write permissions
const client = createClient({
  projectId: 'qhelfcdm',
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: false,
  token: token,
});

const logosDir = path.join(__dirname, '..', 'Advault-web', 'public', 'logos');

const logoMapping: Record<string, string> = {
  amul: 'amul.svg',
  cocacola: 'Coca-cola.svg',
  nike: 'Nike.svg',
  cadbury: 'cadbury.svg',
  minimalist: 'minimalist.webp',
  vw: 'VolksWagen.svg',
  absolut: 'absolut.svg',
  redbull: 'redbull.svg',
  apollopharmacy: 'apollo.png',
};

async function uploadLogos() {
  console.log('Starting brand logo uploads to Sanity...');

  for (const [brandKey, fileName] of Object.entries(logoMapping)) {
    const filePath = path.join(logosDir, fileName);
    const brandDocId = `brand-${brandKey}`;

    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}, skipping...`);
      continue;
    }

    try {
      // Check if brand exists in CMS
      const brandDoc = await client.getDocument(brandDocId);
      if (!brandDoc) {
        console.warn(`Brand document "${brandDocId}" not found in Sanity, skipping upload...`);
        continue;
      }

      console.log(`Uploading logo "${fileName}" for brand "${brandDoc.name}" (${brandKey})...`);
      
      const fileStream = fs.createReadStream(filePath);
      const asset = await client.assets.upload('image', fileStream, {
        filename: fileName,
        contentType: fileName.endsWith('.svg') ? 'image/svg+xml' : 'image/webp',
      });

      console.log(`Uploaded asset ID: ${asset._id}. Linking to brand document "${brandDocId}"...`);

      await client
        .patch(brandDocId)
        .set({
          logo: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
        })
        .commit();

      console.log(`Success: Associated logo with brand "${brandDoc.name}".`);
    } catch (err: any) {
      console.error(`Failed uploading or linking logo for ${brandKey}:`, err.message || err);
    }
  }

  console.log('Logo upload process complete.');
}

uploadLogos();
