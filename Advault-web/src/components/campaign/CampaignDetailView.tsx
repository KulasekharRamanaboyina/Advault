import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAdVaultData } from '../../context/AdVaultDataContext';
import { CampaignHeader } from './CampaignHeader';
import { CampaignToc } from './CampaignToc';
import { CampaignEditorialSections } from './CampaignEditorialSections';

interface CampaignDetailViewProps {
  campaignId: string;
  onSaveCampaign: (id: string, e: React.MouseEvent) => void;
  onShareCampaign: (id: string, e: React.MouseEvent) => void;
  onDownloadCampaign: (id: string, e: React.MouseEvent) => void;
  savedCampaigns: Set<string>;
}

export const CampaignDetailView: React.FC<CampaignDetailViewProps> = ({
  campaignId,
  onSaveCampaign,
  onShareCampaign,
  onDownloadCampaign,
  savedCampaigns,
}) => {
  const { campaigns: CAMPAIGNS } = useAdVaultData();
  const campaign = CAMPAIGNS[campaignId];
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (!campaign) {
      window.location.hash = '#discover';
    }
  }, [campaign]);

  useEffect(() => {
    if (!campaign) return;

    const sections = document.querySelectorAll('.article-section');
    const options = {
      root: null,
      rootMargin: '-10% 0px -75% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach(s => observer.observe(s));

    return () => {
      observer.disconnect();
    };
  }, [campaignId, campaign]);

  if (!campaign) {
    return null;
  }

  const calculateReadTime = (): number => {
    const text = [
      campaign.overview,
      campaign.objectiveContent.goals,
      campaign.objectiveContent.problem,
      campaign.objectiveContent.audience,
      campaign.strategy.approach,
      campaign.strategy.concept,
      campaign.strategy.messaging,
      campaign.strategy.psychology,
      campaign.execution.details,
      ...campaign.execution.phases,
      campaign.execution.budget,
      campaign.media.assets,
      campaign.media.distribution,
      campaign.results.reach,
      campaign.results.sales,
      campaign.results.roi,
      ...campaign.takeaways.learnings,
      ...campaign.takeaways.practices,
      campaign.takeaways.recommendations
    ].join(' ');

    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const readTime = calculateReadTime();

  const handleTocClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(sectionId);
    }
  };

  // Dynamically compute active TOC items and section numbers based on campaign data presence
  const activeSectionsList = [];
  
  // 1. Overview
  if ((campaign as any).campaignSummaryRaw || campaign.overview) {
    activeSectionsList.push({ id: 'overview', label: 'Overview' });
  }

  // 2. Objective
  const hasGoals = !!((campaign as any).campaignPurposeRaw || campaign.objectiveContent?.goals);
  const hasProblem = !!((campaign as any).businessProblemRaw || campaign.objectiveContent?.problem);
  const hasAudience = !!((campaign as any).targetAudienceRaw || campaign.objectiveContent?.audience);
  if (hasGoals || hasProblem || hasAudience) {
    activeSectionsList.push({ id: 'objective', label: 'Objective' });
  }

  // 3. Strategy
  const hasApproach = !!((campaign as any).marketingStrategyRaw || campaign.strategy?.approach);
  const hasConcept = !!((campaign as any).positioningRaw || campaign.strategy?.concept);
  const hasSlogan = !!campaign.strategy?.messaging;
  if (hasApproach || hasConcept || hasSlogan) {
    activeSectionsList.push({ id: 'strategy', label: 'Strategy' });
  }

  // 4. Psychology
  if (campaign.strategy?.psychology) {
    activeSectionsList.push({ id: 'psychology', label: 'Psychology' });
  }

  // 5. Execution
  const hasExecutionDetails = !!((campaign as any).executionProcessRaw || campaign.execution?.details);
  const hasPhases = !!(campaign.execution?.phases && campaign.execution.phases.length > 0);
  const hasBudget = !!campaign.execution?.budget;
  if (hasExecutionDetails || hasPhases || hasBudget) {
    activeSectionsList.push({ id: 'execution', label: 'Process & Cost' });
  }

  // 6. Media Mix
  const hasChannels = !!(campaign.media?.channels && campaign.media.channels.length > 0);
  const hasAssets = !!((campaign as any).creativeApproachRaw || campaign.media?.assets);
  const hasDistribution = !!((campaign as any).geographicCoverageRaw || campaign.media?.distribution);
  if (hasChannels || hasAssets || hasDistribution) {
    activeSectionsList.push({ id: 'media-mix', label: 'Media Mix' });
  }

  // 7. Results
  const hasResultsMetrics = !!(campaign.results?.metrics && campaign.results.metrics.length > 0);
  const hasReach = !!((campaign as any).businessResultsRaw || campaign.results?.reach);
  const hasSales = !!((campaign as any).successHighlightsRaw || campaign.results?.sales);
  const hasRoi = !!campaign.results?.roi;
  if (hasResultsMetrics || hasReach || hasSales || hasRoi) {
    activeSectionsList.push({ id: 'results', label: 'Vetted Results' });
  }

  // 8. Playbook
  const hasLearnings = !!(campaign.takeaways?.learnings && campaign.takeaways.learnings.length > 0);
  const hasPractices = !!(campaign.takeaways?.practices && campaign.takeaways.practices.length > 0);
  const hasRecommendations = !!((campaign as any).keyLearningsRaw || campaign.takeaways?.recommendations);
  if (hasLearnings || hasPractices || hasRecommendations) {
    activeSectionsList.push({ id: 'playbook', label: 'Playbook' });
  }

  // 9. References
  if (campaign.references && campaign.references.length > 0) {
    activeSectionsList.push({ id: 'references', label: 'References' });
  }

  const tocItems = activeSectionsList.map((item, index) => ({
    id: item.id,
    num: String(index + 1).padStart(2, '0'),
    label: item.label
  }));

  const sectionNumbers: Record<string, string> = {};
  tocItems.forEach(item => {
    sectionNumbers[item.id] = item.num;
  });

  return (
    <section className="view view--active" data-view="campaign" id="view-campaign">
      <div className="container" id="campaign-detail-container">
        
        {/* Back Link */}
        <div style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-4)' }}>
          <a href="/discover" className="btn btn--sm btn--ghost" style={{ paddingLeft: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={14} />
            <span>Back to Discover</span>
          </a>
        </div>

        <div className="article-grid">
          <CampaignToc 
            tocItems={tocItems}
            activeSection={activeSection}
            onTocClick={handleTocClick}
          />

          <article className="article-body">
            <CampaignHeader 
              campaign={campaign}
              readTime={readTime}
              onSaveCampaign={onSaveCampaign}
              onShareCampaign={onShareCampaign}
              onDownloadCampaign={onDownloadCampaign}
              savedCampaigns={savedCampaigns}
            />

            <CampaignEditorialSections 
              campaign={campaign}
              onSaveCampaign={onSaveCampaign}
              onShareCampaign={onShareCampaign}
              savedCampaigns={savedCampaigns}
              sectionNumbers={sectionNumbers}
            />
          </article>
        </div>

      </div>
    </section>
  );
};
