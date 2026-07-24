import React from 'react';
import { Brand } from '../../types';
import { History, Compass, Sparkles, Milestone } from 'lucide-react';

interface BrandRelatedDossiersProps {
  brand: Brand;
}

interface BrandDetailedContent {
  originDetails: string;
  founders: string;
  coreChallenge: string;
  strategicPillars: string[];
  evolutionDetails: string;
}

const BRAND_DOSSIERS_CONTENT: Record<string, BrandDetailedContent> = {
  amul: {
    originDetails: "Amul was born as a cooperative response to the exploitation of local dairy farmers in Anand, Gujarat. Middlemen monopolized milk collection and pricing, leaving producers with meager earnings. Under the guidance of Tribhuvandas Patel and Dr. Verghese Kurien, the cooperative model was established, giving farmers direct ownership of processing and marketing, which triggered India's historic White Revolution.",
    founders: "Tribhuvandas Patel & Dr. Verghese Kurien",
    coreChallenge: "Middlemen monopolizing milk collection and squeezing farmer margins.",
    strategicPillars: [
      "Topical Humor: Launching hand-painted billboards that comment on current social and political news within 24 hours.",
      "The Mascot Asset: Using the polka-dotted 'Amul Girl' as a consistent, friendly national commentator.",
      "Value Pricing: Committing to affordable pricing, ensuring high-volume dairy consumption across all income levels."
    ],
    evolutionDetails: "Initially focused on functional dairy ads in the late 1940s, Amul shifted to localized outdoor commentary in 1966. By dedicating its marketing capital to rapid-response topical billboards rather than high-cost television buys, Amul transformed butter from a basic kitchen commodity into a beloved national asset."
  },
  cocacola: {
    originDetails: "John Stith Pemberton invented Coca-Cola as a medicinal soda fountain beverage in Atlanta, Georgia. Early marketing framed it as a refreshing temperance drink. Under Asa Candler's leadership, the company pioneered aggressive couponing, free merchandise, and brand licensing, building the foundation of modern mass distribution.",
    founders: "Dr. John S. Pemberton & Asa Candler",
    coreChallenge: "Differentiating a carbonated soda drink in a crowded patent medicine market.",
    strategicPillars: [
      "Emotional Association: Selling 'happiness' and 'sharing' rather than beverage taste or physical ingredients.",
      "Cultural Integration: Aligning with major calendar events, most notably setting the visual standard for Santa Claus in 1931.",
      "Visual Consistency: Preserving the Spencerian script logo and iconic contour bottle design for over a century."
    ],
    evolutionDetails: "Coca-Cola transitioned from functional refreshing claims to universal emotional campaigns like 'Always Coca-Cola', 'Open Happiness', and the highly personalized 'Share a Coke' campaign, adapting its physical print assets into viral social media activations."
  },
  nike: {
    originDetails: "Nike began as Blue Ribbon Sports, importing Japanese Tiger running shoes to supply track athletes. Bill Bowerman, a track coach, experimented with making rubber outsoles using a waffle iron to improve grip. The company rebranded as Nike in 1971, introducing the iconic Swoosh logo designed by Carolyn Davidson.",
    founders: "Phil Knight & Bill Bowerman",
    coreChallenge: "Breaking the dominance of established European athletic brands in the American market.",
    strategicPillars: [
      "Aspirational Storytelling: Celebrating the daily struggle of the athlete rather than raw shoe specifications.",
      "The 'Just Do It' Manifesto: Using a powerful, universal call-to-action that redefined fitness as a personal journey.",
      "Elite Endorsements: Partnering with boundary-pushing athletes like Michael Jordan to create dedicated signature sub-brands."
    ],
    evolutionDetails: "Starting as a specialist running shoe importer, Nike evolved into a global athletic giant. It expanded into apparel, streetwear culture, and fashion, before transitioning into a direct-to-consumer digital ecosystem powered by localized apps."
  },
  cadbury: {
    originDetails: "John Cadbury opened a shop in Birmingham selling tea, coffee, and drinking chocolate. As a Quaker, he believed cocoa was a healthy, moral alternative to alcohol. The brand gained royal warrants and pioneered industrial chocolate manufacturing, building a model factory town named Bournville.",
    founders: "John Cadbury",
    coreChallenge: "Competing with imported Swiss milk chocolate and popular alcoholic beverages.",
    strategicPillars: [
      "Purity Standards: Establishing the 'Glass and a Half' icon in 1928 to represent the rich milk content of their bars.",
      "Family Connectivity: Aligning the brand with warm family moments, sharing, and seasonal gifting traditions.",
      "Generosity Themes: Creating campaigns centered on small acts of kindness and chocolate-sharing rituals."
    ],
    evolutionDetails: "From a Victorian cocoa provider, Cadbury became a global confectionery leader. Its advertising evolved from purity statements to emotional branding (e.g. the viral Cadbury Gorilla campaign) and local charity partnerships."
  },
  minimalist: {
    originDetails: "Minimalist skincare was launched in India to challenge the cosmetics industry. Legacy brands often hid active ingredient concentrations behind exotic botanical claims, vague descriptions, and high pricing. Minimalist introduced a clinical-first, highly transparent alternative.",
    founders: "Mohit Yadav & Rahul Yadav",
    coreChallenge: "Overcoming consumer skepticism in a skincare market dominated by vague organic claims.",
    strategicPillars: [
      "Radical Transparency: Printing active ingredient percentages clearly on the front of every product bottle.",
      "Laboratory Verification: Publishing full, unedited third-party lab test certificates online for all product batches.",
      "Information-First Copy: Educating consumers on active chemical interactions rather than relying on standard beauty marketing."
    ],
    evolutionDetails: "Beginning as a digital direct-to-consumer skincare startup, Minimalist grew into a global beauty disruptor. They proved that clinical transparency, proof of efficacy, and clean packaging could override massive legacy brand marketing budgets."
  },
  vw: {
    originDetails: "Volkswagen was established in Germany with the goal of creating an affordable, reliable 'People's Car' for the average citizen. This project led to the Beetle, designed by Ferdinand Porsche. Post-WWII, British Army Major Ivan Hirst restarted production, turning the Beetle into an international export success.",
    founders: "German Labour Front & Ivan Hirst",
    coreChallenge: "Selling a compact, unconventional German vehicle to post-war American consumers.",
    strategicPillars: [
      "Honest Advertising: subverting standard automotive hyperbole with self-deprecating humor ('Think Small').",
      "Minimalist Presentation: Utilizing simple black-and-white print layouts that focused on practical vehicle benefits.",
      "Anti-Status Stance: Positioning the Beetle as a smart, anti-consumerist alternative to oversized luxury cars."
    ],
    evolutionDetails: "Volkswagen shifted from a single utilitarian vehicle to a massive automotive group. Their strategy evolved from DDB's print campaigns to emotional television spots, before focusing on modular vehicle platforms and electric mobility."
  },
  absolut: {
    originDetails: "Lars Olsson Smith introduced fractional distillation to Sweden to produce an exceptionally pure vodka called 'Absolut Rent Brännvin'. In 1979, the brand was repackaged for a global launch. The designers chose a Swedish apothecary bottle shape instead of standard labels, which was considered risky at the time.",
    founders: "Lars Olsson Smith",
    coreChallenge: "Entering the premium spirits market with no established heritage or traditional label.",
    strategicPillars: [
      "The Bottle Icon: Making the apothecary bottle shape the center of every advertisement, transforming packaging into art.",
      "Artistic Collaborations: Commissioning over 1,500 artists (including Andy Warhol and Keith Haring) to paint the bottle.",
      "Contextual Adaptation: Creating localized, witty print titles ('Absolut Manhattan', 'Absolut L.A.') based on cityscapes."
    ],
    evolutionDetails: "Absolut grew from a Swedish regional distillery into a global premium spirits leader. They maintained the longest-running print campaign in history, transitioning from fine art prints into digital installations and nightlife culture sponsorships."
  }
};

export const BrandRelatedDossiers: React.FC<BrandRelatedDossiersProps> = ({ brand }) => {
  const normalizedId = brand.id.toLowerCase().replace(/[^a-z0-9]/g, '');
  const details = BRAND_DOSSIERS_CONTENT[normalizedId];

  // Fallback to default brand fields if no custom content map is found
  const origin = details ? details.originDetails : brand.description;
  const founders = details ? details.founders : "Founding Committee";
  const challenge = details ? details.coreChallenge : "Establishing market presence and distribution.";
  const pillars = details ? details.strategicPillars : [
    "Core Value Positioning: Building brand equity around utility and accessibility.",
    "Brand Consistency: Sticking to core messaging guidelines over multiple decades.",
    "Media Mix Optimization: Concentrating spend on the most active consumer channels."
  ];
  const evolution = details ? details.evolutionDetails : brand.evolution;

  return (
    <div className="brand-detail-sidebar">
      {/* Brand History & Genesis Section (Unboxed) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-2)' }}>
          <History size={16} style={{ color: 'var(--text)' }} />
          <h3 className="title-sm" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>History & Origin</h3>
        </div>
        
        <p className="body-sm text-muted" style={{ lineHeight: '1.6', marginBottom: 'var(--space-4)' }}>
          Founded in <strong>{brand.founded}</strong>, {brand.name} was established to solve critical marketplace challenges.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', flexShrink: 0, fontSize: '10px', fontWeight: 700, marginTop: '2px' }}>1</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 2px 0', color: 'var(--text)' }}>The Genesis</h4>
              <p className="caption text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                {origin}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)', flexShrink: 0, fontSize: '10px', fontWeight: 700, marginTop: '2px' }}>2</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 2px 0', color: 'var(--text)' }}>Core Challenge</h4>
              <p className="caption text-muted" style={{ margin: 0, lineHeight: '1.5' }}>
                {challenge}
              </p>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px dashed var(--border-subtle)', paddingTop: 'var(--space-3)', fontFamily: 'var(--font-mono)' }}>
          <strong>FOUNDERS:</strong> {founders}
        </div>
      </div>

      {/* Strategic Pillars Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-2)' }}>
          <Sparkles size={16} style={{ color: 'var(--text)' }} />
          <h3 className="title-sm" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Strategic Core</h3>
        </div>
        
        <p className="body-sm text-muted" style={{ lineHeight: '1.6', marginBottom: 'var(--space-3)' }}>
          The brand's competitive advantage is anchored on three key strategic pillars:
        </p>

        <ul style={{ paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', margin: 0 }}>
          {pillars.map((pillar, index) => {
            const [title, desc] = pillar.split(': ');
            return (
              <li key={index} className="caption text-muted" style={{ lineHeight: '1.5' }}>
                <strong style={{ color: 'var(--text)' }}>{title}:</strong> {desc}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Strategic Evolution Section (Unboxed) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-2)' }}>
          <Compass size={16} style={{ color: 'var(--text)' }} />
          <h3 className="title-sm" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Strategic Evolution</h3>
        </div>
        
        <p className="body-sm text-muted" id="brand-detail-evolution" style={{ lineHeight: '1.6', margin: 0 }}>
          {evolution}
        </p>
      </div>
    </div>
  );
};
