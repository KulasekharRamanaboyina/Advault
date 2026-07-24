import * as fs from 'fs';
import * as path from 'path';
import { CAMPAIGNS, BRANDS } from '../Advault-web/src/data';

// Helper to generate a random key for Portable Text blocks
const makeKey = () => Math.random().toString(36).substring(2, 11);

// Helper to convert plain text paragraphs into Portable Text block format with heading styles
function textToBlock(text: string) {
  if (!text) return [];
  return text.split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      let style = 'normal';
      let cleanText = line;
      if (line.startsWith('### ')) {
        style = 'h3';
        cleanText = line.substring(4);
      } else if (line.startsWith('## ')) {
        style = 'h2';
        cleanText = line.substring(3);
      } else if (line.startsWith('# ')) {
        style = 'h1';
        cleanText = line.substring(2);
      }

      return {
        _type: 'block',
        _key: makeKey(),
        style: style,
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: makeKey(),
            text: cleanText,
            marks: []
          }
        ]
      };
    });
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

// 5. Generate Blog Post Documents
const staticPosts = [
  {
    id: 'tactile-marketing',
    title: 'The Underappreciated Power of Tactile Marketing',
    date: '2026-07-24',
    category: 'Tactile Marketing',
    excerpt: 'Why physical marketing assets command higher cognitive focus and brand recall in a screen-saturated world.',
    readTime: '4 min read',
    content: `In an era dominated by click-through rates and digital impressions, the physical touch of paper is often dismissed as a legacy medium. However, neuromarketing research consistently demonstrates that physical marketing materials generate more brain activity in areas associated with integration and valuation than digital ads.

Tactile experiences leave a deeper footprint in the brain, driving higher emotional response and brand recall. When a customer holds a heavily-textured catalog, a premium cardstock flyer, or a matte-finish direct mail piece, they are not just reading information—they are experiencing tactile feedback that communicates luxury, reliability, and substance.

### Why Print Outperforms Digital in Memory Retention:
1. Sensory Integration: Physical media engages multiple senses simultaneously. The smell of ink, the feel of texture, and the weight of cardstock work in tandem to build a cohesive mental map.
2. Cognitive Ease: Digital screens invite scanning and multitasking, which increases cognitive load. Print media, on the other hand, encourages focused, linear reading.
3. High Intent Interaction: Direct mail arrives in a physical mailbox, a space that is checked daily and demands a physical decision (either storing, opening, or discarding), unlike digital spam which can be ignored or deleted with one click.`
  },
  {
    id: 'billboard-hierarchy',
    title: 'Decoding the Visual Hierarchy of Legendary Billboards',
    date: '2026-06-12',
    category: 'Out of Home',
    excerpt: 'An analysis of how minimal copywriting and strong negative space make billboards memorable at 70 mph.',
    readTime: '3 min read',
    content: `A great billboard is read in three seconds or less. This strict constraint makes visual hierarchy the single most critical factor in out-of-home advertising.

The most legendary billboard campaigns—from Nike's early athletic showcases to Apple's 'Think Different' posters—rely on a single focus point, a bold header, and a massive amount of negative space. When you try to convey more than one message on a roadside display, you end up conveying nothing at all.

### Key Rules for Effective Billboard Layouts:
- The Rule of Seven: Never exceed seven words of copy. Passersby cannot absorb complex sentences while navigating traffic.
- High Contrast Backgrounds: Utilize high-contrast text color combinations (e.g., black on yellow, white on black) to ensure legibility during dawn, dusk, and rainy conditions.
- Negative Space: Leave at least 40% of the board layout completely blank. This forces the viewer's eye directly to the core message and visual element without distractions.`
  },
  {
    id: 'direct-mail-economics',
    title: 'Direct Mail Economics: Beyond the Postage Stamps',
    date: '2026-05-28',
    category: 'Economics',
    excerpt: 'Understanding unit costs, response rates, and customer lifetime value calculations of targeted direct mail.',
    readTime: '5 min read',
    content: `While direct mail has a higher cost-per-acquisition (CPA) compared to programmatic digital ads, it frequently yields a higher Return on Investment (ROI) for premium consumer products and services.

This article breaks down the unit economics of direct mail fulfillment, detailing postage optimization, geographic segmentation, and how to calculate Customer Lifetime Value (CLV) against high direct mail print costs.

### Calculating the ROI of Direct Mail:
Unlike digital campaigns where metrics are updated in real time, direct mail requires a longer attribution window. To calculate the ROI correctly:
1. Total Acquisition Cost: Include list broker fees, creative design, printing stock, variable personalization, and postage fees.
2. Response Attributions: Use unique promo codes, dedicated QR codes, or custom landing pages to isolate mailer-generated conversions.
3. LTV vs CPA ratio: Since physical mailers establish stronger emotional relationships, customers acquired via direct mail typically boast a 25% higher customer lifetime value (LTV) compared to search or social ad acquisitions.`
  }
];

staticPosts.forEach(post => {
  documents.push({
    _id: `post-${post.id}`,
    _type: 'post',
    title: post.title,
    slug: { _type: 'slug', current: post.id },
    date: post.date,
    category: post.category,
    excerpt: post.excerpt,
    content: textToBlock(post.content),
    readTime: post.readTime
  });
});

// Output NDJSON string
const ndjsonOutput = documents.map(doc => JSON.stringify(doc)).join('\n');
const outputPath = path.join(__dirname, 'seed_data.ndjson');
fs.writeFileSync(outputPath, ndjsonOutput, 'utf8');

console.log(`Successfully generated seed data file at: ${outputPath}`);
console.log(`Total documents generated: ${documents.length}`);
