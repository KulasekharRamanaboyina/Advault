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

  const tocItems = [
    { id: 'overview', num: '01', label: 'Overview' },
    { id: 'objective', num: '02', label: 'Objective' },
    { id: 'strategy', num: '03', label: 'Strategy' },
    { id: 'psychology', num: '04', label: 'Psychology' },
    { id: 'execution', num: '05', label: 'Process & Cost' },
    { id: 'media-mix', num: '06', label: 'Media Mix' },
    { id: 'results', num: '07', label: 'Vetted Results' },
    { id: 'playbook', num: '08', label: 'Playbook' },
    { id: 'references', num: '09', label: 'References' }
  ];

  return (
    <section className="view view--active" data-view="campaign" id="view-campaign">
      <div className="container" id="campaign-detail-container">
        
        {/* Back Link */}
        <div style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-4)' }}>
          <a href="#discover" className="btn btn--sm btn--ghost" style={{ paddingLeft: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
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
            />
          </article>
        </div>

      </div>
    </section>
  );
};
