import React, { createContext, useContext, useState, useEffect } from 'react';
import { Campaign, Brand } from '../types';
import { CAMPAIGNS as STATIC_CAMPAIGNS, BRANDS as STATIC_BRANDS } from '../data';
import { sanityClient } from '../sanityClient';

interface AdVaultDataContextType {
  campaigns: Record<string, Campaign>;
  brands: Record<string, Brand>;
  loading: boolean;
  error: string | null;
}

const AdVaultDataContext = createContext<AdVaultDataContextType | undefined>(undefined);

// Helper to convert Sanity Portable Text block arrays to plain text strings
export function blocksToText(blocks: any): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return '';
  
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map((child: any) => child.text).join('');
    })
    .filter(Boolean)
    .join('\n\n');
}

export const AdVaultDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Record<string, Campaign>>(STATIC_CAMPAIGNS);
  const [brands, setBrands] = useState<Record<string, Brand>>(STATIC_BRANDS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCMSData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch brands from Sanity
        const sanityBrands = await sanityClient.fetch(`
          *[_type == "brand"] {
            _id,
            name,
            "slug": slug.current,
            logo,
            "industry": industry->title,
            description,
            founded,
            headquarters,
            website,
            featuredImage
          }
        `);

        // Fetch campaigns from Sanity
        const sanityCampaigns = await sanityClient.fetch(`
          *[_type == "campaign"] {
            _id,
            title,
            "slug": slug.current,
            brand-> {
              _id,
              name,
              "slug": slug.current,
              "industry": industry->title
            },
            campaignType,
            launchYear,
            campaignStartDate,
            campaignEndDate,
            country,
            status,
            campaignSummary,
            campaignBackground,
            campaignPurpose,
            businessProblem,
            marketSituation,
            marketingObjective,
            successCriteria,
            targetAudience,
            customerPersona,
            demographics,
            geographicCoverage,
            consumerInsights,
            marketingStrategy,
            positioning,
            keyMessaging,
            consumerPsychology[]-> {
              title,
              description
            },
            callToAction,
            executionProcess,
            creativeApproach,
            communicationChannels,
            timeline,
            mediaMix,
            businessResults,
            resultMetrics,
            roi,
            keyPerformanceIndicators,
            awards,
            successHighlights,
            keyLearnings,
            featuredImage,
            gallery,
            videos,
            documents[] {
              "url": asset->url,
              "filename": asset->originalFilename,
              "size": asset->size
            },
            sources[]-> {
              title,
              url,
              "fileUrl": file.asset->url,
              "fileName": file.asset->originalFilename,
              sourceName,
              sourceType,
              author,
              publisher,
              publishedDate,
              accessedDate,
              notes
            },
            relatedCampaigns[]-> {
              "slug": slug.current
            },
            tags
          }
        `);

        if (!sanityBrands || sanityBrands.length === 0 || !sanityCampaigns || sanityCampaigns.length === 0) {
          console.log('Sanity CMS returned empty dataset. Falling back to static data.');
          setLoading(false);
          return;
        }

        // Map Brands
        const mappedBrands: Record<string, Brand> = {};
        sanityBrands.forEach((b: any) => {
          const brandKey = b.slug;
          
          // Reconstruct the campaigns list from campaign documents that reference this brand
          const brandCampaigns = sanityCampaigns
            .filter((c: any) => c.brand && c.brand.slug === brandKey)
            .map((c: any) => ({
              year: String(c.launchYear || 2025),
              title: c.title,
              desc: blocksToText(c.campaignSummary).substring(0, 100) + '...',
              channel: c.mediaMix?.[0]?.channel || 'Integrated',
              id: c.slug
            }));

          mappedBrands[brandKey] = {
            id: brandKey,
            name: b.name,
            industry: b.industry || 'FMCG',
            mark: b.name.charAt(0).toUpperCase(),
            founded: String(b.founded || ''),
            description: b.description || '',
            campaigns: brandCampaigns,
            evolution: b.description || '', // Default to description as evolution fallback
            // Support Sanity assets in custom fields
            logo: b.logo,
            featuredImage: b.featuredImage
          } as any;
        });

        // Map Campaigns
        const mappedCampaigns: Record<string, Campaign> = {};
        sanityCampaigns.forEach((c: any) => {
          const campaignKey = c.slug;
          const brandName = c.brand?.name || 'Unknown Brand';
          const industryName = c.brand?.industry || 'FMCG';
          const primaryChannel = c.mediaMix?.[0]?.channel || 'Integrated';
          const typeLabel = c.campaignType ? c.campaignType.replace('-', ' ') : 'Integrated';

          // Format details
          const channelList = c.mediaMix?.map((m: any) => ({
            name: m.channel,
            role: m.description || '',
            share: `${m.percentage}%`
          })) || [];

          const metricList = c.resultMetrics?.map((m: any) => ({
            label: m.metric,
            value: m.value,
            note: m.description || ''
          })) || [];

          const timelineList = c.timeline?.map((t: any) => ({
            year: String(new Date(t.date).getFullYear() || c.launchYear || 2025),
            title: t.title,
            desc: t.description
          })) || [];

          const learningList = c.keyLearnings 
            ? c.keyLearnings.map((block: any) => {
                if (typeof block === 'string') return block;
                if (block.children) {
                  return block.children.map((child: any) => child.text).join('');
                }
                return '';
              }).filter(Boolean)
            : [];
          const practiceList = c.keyPerformanceIndicators || [];

          // Translate to existing frontend interface
          mappedCampaigns[campaignKey] = {
            id: campaignKey,
            brand: brandName,
            brandSlug: c.brand?.slug || c.brand?.name?.toLowerCase().replace(/[^a-z0-9]/g, '') || '',
            industry: industryName.toLowerCase(),
            channel: primaryChannel.toLowerCase(),
            objective: c.campaignType === 'brand-awareness' ? 'awareness' : 'sales',
            tag: `${primaryChannel} · ${c.launchYear || 'N/A'} — ${c.status === 'active' ? 'Ongoing' : 'Completed'}`,
            title: c.title,
            desc: c.seoDescription || blocksToText(c.campaignSummary).substring(0, 150) + '...',
            meta: c.tags || [industryName, primaryChannel, typeLabel],
            year: String(c.launchYear || 2025),
            duration: c.campaignEndDate 
              ? `${new Date(c.campaignEndDate).getFullYear() - c.launchYear} Years`
              : 'Ongoing',
            subtitle: c.seoTitle || blocksToText(c.campaignBackground || c.campaignPurpose).substring(0, 180),
            metrics: metricList,
            
            // Legacy plaintext fields for rendering fallbacks & read time calculation
            overview: blocksToText(c.campaignSummary),
            objectiveContent: {
              goals: blocksToText(c.campaignPurpose).trim() || blocksToText(c.marketingObjective).trim(),
              problem: blocksToText(c.businessProblem).trim(),
              audience: blocksToText(c.targetAudience).trim()
            },
            strategy: {
              approach: blocksToText(c.marketingStrategy),
              messaging: blocksToText(c.keyMessaging),
              concept: blocksToText(c.positioning),
              psychology: c.consumerPsychology?.map((p: any) => `${p.title}: ${p.description}`).join(' ') || ''
            },
            execution: {
              details: blocksToText(c.executionProcess),
              phases: timelineList.map((t: any) => `${t.year} - ${t.title}: ${t.desc}`),
              budget: c.mediaMix?.map((m: any) => `${m.channel}: ${m.percentage}%`).join(', ') || ''
            },
            media: {
              channels: channelList,
              assets: blocksToText(c.creativeApproach),
              distribution: blocksToText(c.geographicCoverage)
            },
            results: {
              metrics: metricList,
              reach: blocksToText(c.businessResults),
              sales: blocksToText(c.successHighlights),
              roi: c.roi || ''
            },
            takeaways: {
              learnings: learningList,
              practices: practiceList,
              recommendations: blocksToText(c.keyLearnings)
            },
            references: c.sources?.map((s: any) => ({
              title: s.title || '',
              url: s.url || '',
              fileUrl: s.fileUrl || '',
              fileName: s.fileName || '',
              sourceName: s.sourceName || '',
              sourceType: s.sourceType || '',
              author: s.author || '',
              publisher: s.publisher || '',
              publishedDate: s.publishedDate || '',
              accessedDate: s.accessedDate || '',
              notes: s.notes || null
            })) || [],
            related: c.relatedCampaigns?.map((rc: any) => rc.slug) || [],

            // Store raw Sanity structures for Portable Text rendering and rich layout support
            featuredImage: c.featuredImage,
            gallery: c.gallery,
            videos: c.videos,
            documents: c.documents || [],

            // Raw Portable Text arrays
            campaignSummaryRaw: c.campaignSummary,
            campaignBackgroundRaw: c.campaignBackground,
            campaignPurposeRaw: c.campaignPurpose,
            businessProblemRaw: c.businessProblem,
            marketingObjectiveRaw: c.marketingObjective,
            targetAudienceRaw: c.targetAudience,
            marketingStrategyRaw: c.marketingStrategy,
            positioningRaw: c.positioning,
            keyMessagingRaw: c.keyMessaging,
            executionProcessRaw: c.executionProcess,
            creativeApproachRaw: c.creativeApproach,
            businessResultsRaw: c.businessResults,
            successHighlightsRaw: c.successHighlights,
            keyLearningsRaw: c.keyLearnings
          } as any;
        });

        setBrands(mappedBrands);
        setCampaigns(mappedCampaigns);
        setLoading(false);
      } catch (err: any) {
        console.error('Failed to query Sanity Studio CMS data:', err);
        setError('Could not connect to the CMS. Using offline fallback data.');
        setLoading(false);
      }
    }

    loadCMSData();
  }, []);

  return (
    <AdVaultDataContext.Provider value={{ campaigns, brands, loading, error }}>
      {children}
    </AdVaultDataContext.Provider>
  );
};

export const useAdVaultData = (): AdVaultDataContextType => {
  const context = useContext(AdVaultDataContext);
  if (context === undefined) {
    throw new Error('useAdVaultData must be used within an AdVaultDataProvider');
  }
  return context;
};
