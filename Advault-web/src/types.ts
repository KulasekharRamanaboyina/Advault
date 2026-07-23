/**
 * AdVault Shared Types & Interfaces
 */

export interface MetricItem {
  label: string;
  value: string;
  note: string;
}

export interface ChannelItem {
  name: string;
  role: string;
  share: string;
}

export interface CampaignObjectiveContent {
  goals: string;
  audience: string;
  problem: string;
}

export interface CampaignStrategyContent {
  approach: string;
  messaging: string;
  concept: string;
  psychology: string;
}

export interface CampaignExecutionContent {
  details: string;
  phases: string[];
  budget: string;
}

export interface CampaignMediaContent {
  channels: ChannelItem[];
  assets: string;
  distribution: string;
}

export interface CampaignResultsContent {
  metrics: MetricItem[];
  reach: string;
  sales: string;
  roi: string;
}

export interface CampaignTakeawaysContent {
  learnings: string[];
  practices: string[];
  recommendations: string;
}

export interface Campaign {
  id: string;
  brand: string;
  industry: string;
  channel: string;
  objective: string;
  tag: string;
  title: string;
  desc: string;
  meta: string[];
  year: string;
  duration: string;
  subtitle: string;
  metrics: MetricItem[];
  overview: string;
  objectiveContent: CampaignObjectiveContent;
  strategy: CampaignStrategyContent;
  execution: CampaignExecutionContent;
  media: CampaignMediaContent;
  results: CampaignResultsContent;
  takeaways: CampaignTakeawaysContent;
  references: (string | {
    title: string;
    url?: string;
    fileUrl?: string;
    fileName?: string;
    sourceName?: string;
    sourceType?: string;
    author?: string;
    publisher?: string;
    publishedDate?: string;
    accessedDate?: string;
    notes?: any;
  })[];
  related: string[];

  // Optional CMS integrations
  brandSlug?: string;
  featuredImage?: any;
  gallery?: any[];
  videos?: string[];
  documents?: { url: string; filename: string; size?: number }[];
  campaignSummaryRaw?: any;
  campaignBackgroundRaw?: any;
  campaignPurposeRaw?: any;
  businessProblemRaw?: any;
  marketingObjectiveRaw?: any;
  targetAudienceRaw?: any;
  marketingStrategyRaw?: any;
  positioningRaw?: any;
  keyMessagingRaw?: any;
  executionProcessRaw?: any;
  creativeApproachRaw?: any;
  businessResultsRaw?: any;
  successHighlightsRaw?: any;
  keyLearningsRaw?: any;
}

export interface BrandCampaignTimelineItem {
  year: string;
  title: string;
  desc: string;
  channel: string;
  id?: string; // Optional link to fully documented campaign
}

export interface Brand {
  id: string;
  name: string;
  industry: string;
  mark: string;
  founded: string;
  description: string;
  campaigns: BrandCampaignTimelineItem[];
  evolution: string;

  // Optional CMS integrations
  logo?: any;
  featuredImage?: any;
}
