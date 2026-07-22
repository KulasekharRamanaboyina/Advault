import React from 'react';
import { Campaign } from '../../types';
import { useAdVaultData } from '../../context/AdVaultDataContext';
import { CampaignCard } from '../common/CampaignCard';
import { ContentRenderer } from '../common/ContentRenderer';

interface CampaignEditorialSectionsProps {
  campaign: Campaign;
  onSaveCampaign: (id: string, e: React.MouseEvent) => void;
  onShareCampaign: (id: string, e: React.MouseEvent) => void;
  savedCampaigns: Set<string>;
}

export const CampaignEditorialSections: React.FC<CampaignEditorialSectionsProps> = ({
  campaign,
  onSaveCampaign,
  onShareCampaign,
  savedCampaigns,
}) => {
  const { campaigns: CAMPAIGNS } = useAdVaultData();

  return (
    <>
      {/* 1. Overview */}
      <section className="article-section" id="overview">
        <span className="article-section__num">Section 01</span>
        <h2 className="article-section__title">Overview</h2>
        
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ marginTop: 0, marginBottom: 'var(--space-2)', fontSize: '18px', color: 'var(--text-bright)' }}>Executive Summary</h3>
          <ContentRenderer value={(campaign as any).campaignSummaryRaw || campaign.overview} />
        </div>

        {((campaign as any).campaignBackgroundRaw || campaign.subtitle) && (
          <div style={{ marginBottom: 'var(--space-6)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
            <h3 style={{ marginTop: 0, marginBottom: 'var(--space-2)', fontSize: '18px', color: 'var(--text-bright)' }}>Campaign Background</h3>
            <ContentRenderer value={(campaign as any).campaignBackgroundRaw || campaign.subtitle} />
          </div>
        )}

        {((campaign as any).campaignPurposeRaw || campaign.objectiveContent?.goals) && (
          <div style={{ marginBottom: 'var(--space-6)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
            <h3 style={{ marginTop: 0, marginBottom: 'var(--space-2)', fontSize: '18px', color: 'var(--text-bright)' }}>Strategic Purpose</h3>
            <ContentRenderer value={(campaign as any).campaignPurposeRaw || campaign.objectiveContent?.goals} />
          </div>
        )}

        <div className="metrics-grid" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-5)' }}>
          {campaign.metrics.map((m, index) => (
            <div className="metrics-item" key={`${m.label}-${index}`}>
              <span className="metrics-item__label">{m.label}</span>
              <span className="metrics-item__value">{m.value}</span>
              <span className="metrics-item__note">{m.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Objective */}
      <section className="article-section" id="objective">
        <span className="article-section__num">Section 02</span>
        <h2 className="article-section__title">Campaign Objective</h2>
        
        <div className="grid grid--3" style={{ marginTop: 'var(--space-4)' }}>
          <div>
            <h4 style={{ marginTop: 0 }}>Strategic Goals</h4>
            <ContentRenderer value={(campaign as any).campaignPurposeRaw || campaign.objectiveContent.goals} />
          </div>
          <div>
            <h4 style={{ marginTop: 0 }}>Business Problem</h4>
            <ContentRenderer value={(campaign as any).businessProblemRaw || campaign.objectiveContent.problem} />
          </div>
          <div>
            <h4 style={{ marginTop: 0 }}>Target Audience & Persona Profile</h4>
            <ContentRenderer value={(campaign as any).targetAudienceRaw || campaign.objectiveContent.audience} />
          </div>
        </div>
      </section>

      {/* 3. Strategy */}
      <section className="article-section" id="strategy">
        <span className="article-section__num">Section 03</span>
        <h2 className="article-section__title">Marketing Strategy</h2>
        
        <div className="grid grid--3" style={{ marginTop: 'var(--space-4)' }}>
          <div>
            <h4 style={{ marginTop: 0 }}>Strategic Approach</h4>
            <ContentRenderer value={(campaign as any).marketingStrategyRaw || campaign.strategy.approach} />
          </div>
          <div>
            <h4 style={{ marginTop: 0 }}>Core Concept</h4>
            <ContentRenderer value={(campaign as any).positioningRaw || campaign.strategy.concept} />
          </div>
          <div>
            <h4 style={{ marginTop: 0 }}>Core Copywriting & Slogan</h4>
            <p>The campaign centered on the powerful, quiet slogan: <strong>"{campaign.strategy.messaging}"</strong>.</p>
          </div>
        </div>
      </section>

      {/* 4. Psychology */}
      <section className="article-section" id="psychology">
        <span className="article-section__num">Section 04</span>
        <h2 className="article-section__title">Consumer Psychology</h2>
        <p>{campaign.strategy.psychology}</p>
        
        <div className="quote-block">
          <p className="quote-block__text">"Great advertising is disarming. It speaks directly to human aspiration, bypassing structural buying patterns by forging an authentic emotional contract."</p>
          <span className="quote-block__author">AdVault Editorial Board</span>
        </div>
      </section>

      {/* 5. Execution */}
      <section className="article-section" id="execution">
        <span className="article-section__num">Section 05</span>
        <h2 className="article-section__title">Process & Financial Assets</h2>
        
        <div className="grid grid--2" style={{ marginTop: 'var(--space-4)' }}>
          <div>
            <ContentRenderer value={(campaign as any).executionProcessRaw || campaign.execution.details} />
            <h4 style={{ marginTop: 'var(--space-4)' }}>Fulfillment Steps</h4>
            <ol style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-5)' }}>
              {campaign.execution.phases.map((p, index) => (
                <li style={{ marginBottom: 'var(--space-2)' }} key={index}>{p}</li>
              ))}
            </ol>
          </div>
          <div>
            <h4 style={{ marginTop: 0 }}>Budget & Operational Economics</h4>
            <p>{campaign.execution.budget}</p>
          </div>
        </div>
      </section>

      {/* 6. Media Mix */}
      <section className="article-section" id="media-mix">
        <span className="article-section__num">Section 06</span>
        <h2 className="article-section__title">Media Mix & Distribution</h2>
        
        <div className="grid grid--2" style={{ marginTop: 'var(--space-4)', alignItems: 'stretch' }}>
          <div>
            <div className="table-container" style={{ margin: 0, height: '100%' }}>
              <table className="table" style={{ margin: 0 }}>
                <thead>
                  <tr>
                    <th>Marketing Channel</th>
                    <th>Primary Role</th>
                    <th>Budget</th>
                  </tr>
                </thead>
                <tbody>
                  {campaign.media.channels.map((ch, index) => (
                    <tr key={`${ch.name}-${index}`}>
                      <td><strong>{ch.name}</strong></td>
                      <td>{ch.role}</td>
                      <td className="mono">{ch.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 style={{ marginTop: 0 }}>Creative Assets</h4>
            <ContentRenderer 
              value={(campaign as any).creativeApproachRaw || campaign.media.assets} 
              style={{ marginBottom: 'var(--space-4)' }} 
            />

            <h4>Physical Distribution Strategy</h4>
            <ContentRenderer value={(campaign as any).geographicCoverageRaw || campaign.media.distribution} />
          </div>
        </div>
      </section>

      {/* 7. Results */}
      <section className="article-section" id="results">
        <span className="article-section__num">Section 07</span>
        <h2 className="article-section__title">Vetted Business Results</h2>
        
        <div className="metrics-grid" style={{ marginBottom: 'var(--space-6)' }}>
          {campaign.results.metrics.map((m, index) => (
            <div className="metrics-item" key={`${m.label}-${index}`}>
              <span className="metrics-item__label">{m.label}</span>
              <span className="metrics-item__value">{m.value}</span>
              <span className="metrics-item__note">{m.note}</span>
            </div>
          ))}
        </div>

        <div className="grid grid--3">
          <div>
            <h4 style={{ marginTop: 0 }}>Reach & Impressions</h4>
            <ContentRenderer value={(campaign as any).businessResultsRaw || campaign.results.reach} />
          </div>
          <div>
            <h4 style={{ marginTop: 0 }}>Direct Sales Lift & Volume</h4>
            <ContentRenderer value={(campaign as any).successHighlightsRaw || campaign.results.sales} />
          </div>
          <div>
            <h4 style={{ marginTop: 0 }}>Calculated ROI</h4>
            <p>{campaign.results.roi}</p>
          </div>
        </div>
      </section>

      {/* 8. Playbook */}
      <section className="article-section" id="playbook">
        <span className="article-section__num">Section 08</span>
        <h2 className="article-section__title">Marketing Playbook</h2>
        
        <div className="grid grid--3" style={{ marginTop: 'var(--space-4)' }}>
          <div>
            <h4 style={{ marginTop: 0 }}>Strategic Learnings</h4>
            <ul style={{ paddingLeft: 'var(--space-4)', margin: 0 }}>
              {campaign.takeaways.learnings.map((l, index) => (
                <li style={{ marginBottom: 'var(--space-2)' }} key={index}>{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ marginTop: 0 }}>Best Operational Practices</h4>
            <ul style={{ paddingLeft: 'var(--space-4)', margin: 0 }}>
              {campaign.takeaways.practices.map((p, index) => (
                <li style={{ marginBottom: 'var(--space-2)' }} key={index}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ marginTop: 0 }}>Editorial Recommendations</h4>
            <ContentRenderer value={(campaign as any).keyLearningsRaw || campaign.takeaways.recommendations} />
          </div>
        </div>
      </section>

      {/* 9. References */}
      <section className="article-section" id="references">
        <span className="article-section__num">Section 09</span>
        <h2 className="article-section__title">Case References & Literature</h2>
        <div className="references-list">
          <ol>
            {campaign.references.map((ref, index) => (
              <li style={{ marginBottom: 'var(--space-1)' }} key={index}>{ref}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related Campaigns Section */}
      <section className="article-section" style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-6)' }}>
        <span className="caption text-muted" style={{ marginBottom: 'var(--space-4)', display: 'block' }}>Related Research Files</span>
        <div className="grid grid--2">
          {campaign.related
            .map(id => CAMPAIGNS[id])
            .filter(Boolean)
            .map(relCampaign => (
              <CampaignCard 
                key={relCampaign.id} 
                campaign={relCampaign} 
                onSave={onSaveCampaign}
                onShare={onShareCampaign}
                isSaved={savedCampaigns.has(relCampaign.id)}
              />
            ))}
        </div>
      </section>
    </>
  );
};
