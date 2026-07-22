import * as fs from 'fs';
import * as path from 'path';
import { CAMPAIGNS, BRANDS } from '../Advault-web/src/data';

// Helper to generate a random key for Portable Text blocks
const makeKey = () => Math.random().toString(36).substring(2, 11);

// Helper to convert plain text paragraphs into Portable Text block format
function textToBlock(text: string) {
  if (!text) return [];
  return text.split('\n\n').map(paragraph => ({
    _type: 'block',
    _key: makeKey(),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: makeKey(),
        text: paragraph,
        marks: []
      }
    ]
  }));
}

// Generate ndjson document lists
const documents: any[] = [];

// 1. Generate Industry Documents
const uniqueIndustries = new Set<string>();
Object.values(BRANDS).forEach(b => {
  if (b.industry) {
    uniqueIndustries.add(b.industry);
  }
});

const industryMap = new Map<string, string>(); // name -> id
uniqueIndustries.forEach(ind => {
  const slug = ind.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const id = `industry-${slug}`;
  industryMap.set(ind, id);

  documents.push({
    _id: id,
    _type: 'industry',
    title: ind,
    slug: { _type: 'slug', current: slug },
    description: `A repository of case studies and brands inside the ${ind} industry sector.`
  });
});

// 2. Generate Psychology Principles
const psychologyList = [
  { id: 'mere-exposure', title: 'Mere Exposure Effect', desc: 'A psychological phenomenon by which people tend to develop a preference for things merely because they are familiar with them.' },
  { id: 'relatability-bias', title: 'Relatability Bias', desc: 'The cognitive bias that causes people to prefer stories, personas, or narratives that reflect their own background and conversational style.' },
  { id: 'social-proof', title: 'Social Proof', desc: 'The psychological and social phenomenon where people copy the actions of others in an attempt to undertake behavior in a given situation.' },
  { id: 'identity-marketing', title: 'Identity Marketing', desc: 'A marketing strategy where campaigns target consumers based on their core demographic and social identities, aligning the brand with self-worth.' },
  { id: 'emotional-branding', title: 'Emotional Branding', desc: 'The practice of building brands that appeal directly to a consumer\'s emotional state, needs, and aspirations.' },
  { id: 'self-congruity', title: 'Self-Congruity Theory', desc: 'The psychological cognitive theory proposing that consumers compare their self-image with the brand\'s user image and purchase accordingly.' },
  { id: 'sensory-branding', title: 'Sensory Branding', desc: 'A type of marketing that appeals to multiple senses in order to build positive and memorable brand associations.' },
  { id: 'honest-advertising', title: 'Honest Advertising', desc: 'The strategy of using creative humility or acknowledging product shortcomings to build unmatched consumer trust and brand integrity.' },
  { id: 'framing-effect', title: 'Framing Effect', desc: 'A cognitive bias where people react to a particular choice in different ways depending on how it is presented or framed.' },
  { id: 'visual-identity', title: 'Visual Identity', desc: 'Using distinctive shapes, graphics, or print layouts consistently over long periods to secure instant cognitive recall.' },
  { id: 'status-symbolism', title: 'Status Symbolism', desc: 'Aligning a consumer product with high social status, prestige, and lifestyle aspiration.' },
  { id: 'aspiration-marketing', title: 'Aspiration Marketing', desc: 'Associating a brand with high achievements, extreme physical limits, or sports status.' },
  { id: 'sensation-seeking', title: 'Sensation Seeking', desc: 'Appealing to the consumer\'s desire for novel, complex, intense, and physically risky experiences.' }
];

const psychologyMap = new Map<string, string>(); // title -> id
psychologyList.forEach(p => {
  const id = `psychology-${p.id}`;
  psychologyMap.set(p.title, id);
  documents.push({
    _id: id,
    _type: 'psychology',
    title: p.title,
    slug: { _type: 'slug', current: p.id },
    description: p.desc,
    example: `Demonstrated in classic global advertising campaigns.`
  });
});

// 3. Generate Brand Documents
Object.entries(BRANDS).forEach(([key, b]) => {
  const brandId = `brand-${key}`;
  const industryId = industryMap.get(b.industry) || 'industry-other';

  documents.push({
    _id: brandId,
    _type: 'brand',
    name: b.name,
    slug: { _type: 'slug', current: key },
    industry: { _type: 'reference', _ref: industryId },
    description: b.description,
    founded: parseInt(b.founded) || 1900,
    headquarters: 'Global HQ',
    // Logo placeholder fallback
    website: `https://www.google.com/search?q=${encodeURIComponent(b.name)}`
  });
});

// 4. Generate Campaigns and their nested Sources
Object.entries(CAMPAIGNS).forEach(([key, c]) => {
  const campaignId = `campaign-${key}`;
  let brandKey = c.brand.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (brandKey === 'volkswagen') brandKey = 'vw';
  const brandId = `brand-${brandKey}`;

  // Sources references
  const sourceRefs: any[] = [];
  if (c.references) {
    c.references.forEach((refStr, idx) => {
      const sourceSlug = `${key}-src-${idx}`;
      const sourceDocId = `source-${sourceSlug}`;
      
      let sourceName = 'Industry Case';
      if (refStr.includes('Website')) sourceName = 'Official Website';
      else if (refStr.includes('Book') || refStr.includes('History')) sourceName = 'Literature Reference';
      else if (refStr.includes('Report')) sourceName = 'Annual Report';

      documents.push({
        _id: sourceDocId,
        _type: 'source',
        title: refStr,
        slug: { _type: 'slug', current: sourceSlug },
        sourceName: sourceName,
        sourceType: refStr.toLowerCase().includes('website') ? 'brand-website' : 'case-study',
        publishedDate: '2025-01-01',
        accessedDate: '2026-07-22',
        notes: textToBlock(`Retrieved information for the ${c.title} case study.`)
      });

      sourceRefs.push({
        _type: 'reference',
        _ref: sourceDocId,
        _key: makeKey()
      });
    });
  }

  // Psychology references matching
  const mappedPsychologyRefs: any[] = [];
  psychologyList.forEach(p => {
    if (c.strategy.psychology.toLowerCase().includes(p.title.toLowerCase()) || 
        c.overview.toLowerCase().includes(p.title.toLowerCase())) {
      mappedPsychologyRefs.push({
        _type: 'reference',
        _ref: `psychology-${p.id}`,
        _key: makeKey()
      });
    }
  });
  // Fallback to a default one if none matched
  if (mappedPsychologyRefs.length === 0) {
    mappedPsychologyRefs.push({
      _type: 'reference',
      _ref: 'psychology-emotional-branding',
      _key: makeKey()
    });
  }

  // Related campaign references
  const relatedRefs: any[] = [];
  if (c.related) {
    c.related.forEach(relKey => {
      relatedRefs.push({
        _type: 'reference',
        _ref: `campaign-${relKey}`,
        _key: makeKey()
      });
    });
  }

  // Timeline events mapping from the Brand's history
  const brandData = BRANDS[brandKey];
  const timelineEvents: any[] = [];
  if (brandData && brandData.campaigns) {
    brandData.campaigns.forEach(t => {
      timelineEvents.push({
        _key: makeKey(),
        date: `${t.year}-01-01`,
        title: t.title,
        description: t.desc
      });
    });
  }

  // Media Mix mapping
  const mediaMixItems: any[] = [];
  if (c.media && c.media.channels) {
    c.media.channels.forEach(ch => {
      const shareVal = parseInt(ch.share.replace('%', '')) || 0;
      let matchedChannel = 'Other';
      const lowercaseName = ch.name.toLowerCase();
      if (lowercaseName.includes('billboard') || lowercaseName.includes('outdoor') || lowercaseName.includes('ooh')) {
        matchedChannel = 'Outdoor';
      } else if (lowercaseName.includes('print') || lowercaseName.includes('magazine')) {
        matchedChannel = 'Print';
      } else if (lowercaseName.includes('experiential') || lowercaseName.includes('event')) {
        matchedChannel = 'Experiential';
      } else if (lowercaseName.includes('digital') || lowercaseName.includes('social') || lowercaseName.includes('tv')) {
        matchedChannel = 'Other';
      } else if (lowercaseName.includes('sampling')) {
        matchedChannel = 'Sampling';
      } else if (lowercaseName.includes('retail')) {
        matchedChannel = 'Retail';
      }

      mediaMixItems.push({
        _key: makeKey(),
        channel: matchedChannel,
        percentage: shareVal,
        description: ch.role
      });
    });
  }

  // Result Metrics mapping
  const resultMetricItems: any[] = [];
  if (c.results && c.results.metrics) {
    c.results.metrics.forEach(m => {
      let unit = 'Other';
      if (m.value.includes('%')) unit = '%';
      else if (m.value.includes('$')) unit = '$';
      else if (m.value.includes('₹')) unit = '₹';

      resultMetricItems.push({
        _key: makeKey(),
        metric: m.label,
        value: m.value,
        unit: unit,
        description: m.note
      });
    });
  }

  // Parse type value matching
  let resolvedType = 'brand-awareness';
  const typeStr = c.objective.toLowerCase();
  if (typeStr.includes('awareness')) resolvedType = 'brand-awareness';
  else if (typeStr.includes('launch')) resolvedType = 'product-launch';
  else if (typeStr.includes('sales') || typeStr.includes('promotion')) resolvedType = 'sales-promotion';

  documents.push({
    _id: campaignId,
    _type: 'campaign',
    title: c.title,
    slug: { _type: 'slug', current: key },
    brand: { _type: 'reference', _ref: brandId },
    campaignType: resolvedType,
    launchYear: parseInt(c.year) || 2025,
    campaignStartDate: `${c.year}-01-01`,
    country: c.meta[0] ? c.meta[0].split(' & ').pop() || 'India' : 'India',
    status: 'completed',
    campaignSummary: textToBlock(c.overview),
    campaignBackground: textToBlock(c.subtitle),
    campaignPurpose: textToBlock(c.objectiveContent.goals),
    businessProblem: textToBlock(c.objectiveContent.problem),
    marketingObjective: textToBlock(c.objectiveContent.goals),
    targetAudience: textToBlock(c.objectiveContent.audience),
    marketingStrategy: textToBlock(c.strategy.approach),
    positioning: textToBlock(c.strategy.concept),
    keyMessaging: textToBlock(c.strategy.messaging),
    consumerPsychology: mappedPsychologyRefs,
    callToAction: textToBlock(c.strategy.approach),
    executionProcess: textToBlock(c.execution.details),
    creativeApproach: textToBlock(c.strategy.concept),
    communicationChannels: c.media.channels.map(ch => ch.name),
    timeline: timelineEvents,
    mediaMix: mediaMixItems,
    businessResults: textToBlock(c.results.reach + '\n\n' + c.results.sales),
    resultMetrics: resultMetricItems,
    roi: c.results.roi,
    keyPerformanceIndicators: [c.results.reach.substring(0, 30), c.results.sales.substring(0, 30)],
    sources: sourceRefs,
    relatedCampaigns: relatedRefs,
    tags: c.meta,
    seoTitle: c.title,
    seoDescription: c.desc
  });
});

// Output NDJSON string
const ndjsonOutput = documents.map(doc => JSON.stringify(doc)).join('\n');
const outputPath = path.join(__dirname, 'seed_data.ndjson');
fs.writeFileSync(outputPath, ndjsonOutput, 'utf8');

console.log(`Successfully generated seed data file at: ${outputPath}`);
console.log(`Total documents generated: ${documents.length}`);
