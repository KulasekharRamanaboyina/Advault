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
  sectionNumbers: Record<string, string>;
}

export const CampaignEditorialSections: React.FC<CampaignEditorialSectionsProps> = ({
  campaign,
  onSaveCampaign,
  onShareCampaign,
  savedCampaigns,
  sectionNumbers,
}) => {
  const { campaigns: CAMPAIGNS } = useAdVaultData();

  // Helper validation flags to ensure empty fields are not rendered
  const hasBackground = !!((campaign as any).campaignBackgroundRaw || campaign.subtitle);
  const hasStrategicPurpose = !!((campaign as any).campaignPurposeRaw || campaign.objectiveContent?.goals);
  const hasOverviewMetrics = !!(campaign.metrics && campaign.metrics.length > 0);

  // Section 2: Campaign Objective
  const hasGoals = !!((campaign as any).campaignPurposeRaw || campaign.objectiveContent?.goals);
  const hasProblem = !!((campaign as any).businessProblemRaw || campaign.objectiveContent?.problem);
  const hasAudience = !!((campaign as any).targetAudienceRaw || campaign.objectiveContent?.audience);
  const objectiveColumnsCount = [hasGoals, hasProblem, hasAudience].filter(Boolean).length;
  const objectiveGridClass = objectiveColumnsCount === 3 
    ? 'grid--3' 
    : objectiveColumnsCount === 2 
      ? 'grid--2' 
      : '';

  // Section 3: Strategy
  const hasApproach = !!((campaign as any).marketingStrategyRaw || campaign.strategy?.approach);
  const hasConcept = !!((campaign as any).positioningRaw || campaign.strategy?.concept);
  const hasSlogan = !!campaign.strategy?.messaging;
  const strategyColumnsCount = [hasApproach, hasConcept, hasSlogan].filter(Boolean).length;
  const strategyGridClass = strategyColumnsCount === 3
    ? 'grid--3'
    : strategyColumnsCount === 2
      ? 'grid--2'
      : '';

  // Section 5: Execution
  const hasExecutionDetails = !!((campaign as any).executionProcessRaw || campaign.execution?.details);
  const hasPhases = !!(campaign.execution?.phases && campaign.execution.phases.length > 0);
  const hasBudget = !!campaign.execution?.budget;
  const hasLeftExecution = hasExecutionDetails || hasPhases;
  const hasRightExecution = hasBudget;

  // Section 6: Media Mix
  const hasChannels = !!(campaign.media?.channels && campaign.media.channels.length > 0);
  const hasAssets = !!((campaign as any).creativeApproachRaw || campaign.media?.assets);
  const hasDistribution = !!((campaign as any).geographicCoverageRaw || campaign.media?.distribution);
  const hasLeftMedia = hasChannels;
  const hasRightMedia = hasAssets || hasDistribution;

  // Section 7: Results
  const hasResultsMetrics = !!(campaign.results?.metrics && campaign.results.metrics.length > 0);
  const hasReach = !!((campaign as any).businessResultsRaw || campaign.results?.reach);
  const hasSales = !!((campaign as any).successHighlightsRaw || campaign.results?.sales);
  const hasRoi = !!campaign.results?.roi;
  const resultsColumnsCount = [hasReach, hasSales, hasRoi].filter(Boolean).length;
  const resultsGridClass = resultsColumnsCount === 3
    ? 'grid--3'
    : resultsColumnsCount === 2
      ? 'grid--2'
      : '';

  // Section 8: Playbook
  const hasLearnings = !!(campaign.takeaways?.learnings && campaign.takeaways.learnings.length > 0);
  const hasPractices = !!(campaign.takeaways?.practices && campaign.takeaways.practices.length > 0);
  const hasRecommendations = !!((campaign as any).keyLearningsRaw || campaign.takeaways?.recommendations);
  const playbookColumnsCount = [hasLearnings, hasPractices, hasRecommendations].filter(Boolean).length;
  const playbookGridClass = playbookColumnsCount === 3
    ? 'grid--3'
    : playbookColumnsCount === 2
      ? 'grid--2'
      : '';

  // Section 9: References
  const hasReferences = !!(campaign.references && campaign.references.length > 0);

  // Related Campaigns
  const relatedCampaigns = campaign.related
    ?.map(id => CAMPAIGNS[id])
    .filter(Boolean) || [];

  return (
    <>
      {/* 1. Overview */}
      <section className="article-section" id="overview">
        <span className="article-section__num">Section {sectionNumbers['overview']}</span>
        <h2 className="article-section__title">Overview</h2>
        
        {((campaign as any).campaignSummaryRaw || campaign.overview) && (
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 style={{ marginTop: 0, marginBottom: 'var(--space-2)', fontSize: '18px', color: 'var(--text-bright)' }}>Executive Summary</h3>
            <ContentRenderer value={(campaign as any).campaignSummaryRaw || campaign.overview} />
          </div>
        )}

        {hasBackground && (
          <div style={{ marginBottom: 'var(--space-6)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
            <h3 style={{ marginTop: 0, marginBottom: 'var(--space-2)', fontSize: '18px', color: 'var(--text-bright)' }}>Campaign Background</h3>
            <ContentRenderer value={(campaign as any).campaignBackgroundRaw || campaign.subtitle} />
          </div>
        )}

        {hasStrategicPurpose && (
          <div style={{ marginBottom: 'var(--space-6)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
            <h3 style={{ marginTop: 0, marginBottom: 'var(--space-2)', fontSize: '18px', color: 'var(--text-bright)' }}>Strategic Purpose</h3>
            <ContentRenderer value={(campaign as any).campaignPurposeRaw || campaign.objectiveContent?.goals} />
          </div>
        )}

        {hasOverviewMetrics && (
          <div className="metrics-grid" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-5)' }}>
            {campaign.metrics.map((m, index) => (
              <div className="metrics-item" key={`${m.label}-${index}`}>
                <span className="metrics-item__label">{m.label}</span>
                <span className="metrics-item__value">{m.value}</span>
                <span className="metrics-item__note">{m.note}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. Objective */}
      {objectiveColumnsCount > 0 && (
        <section className="article-section" id="objective">
          <span className="article-section__num">Section {sectionNumbers['objective']}</span>
          <h2 className="article-section__title">Campaign Objective</h2>
          
          <div className={objectiveGridClass ? `grid ${objectiveGridClass}` : ''} style={{ marginTop: 'var(--space-4)' }}>
            {hasGoals && (
              <div>
                <h4 style={{ marginTop: 0 }}>Strategic Goals</h4>
                <ContentRenderer value={(campaign as any).campaignPurposeRaw || campaign.objectiveContent.goals} />
              </div>
            )}
            {hasProblem && (
              <div>
                <h4 style={{ marginTop: 0 }}>Business Problem</h4>
                <ContentRenderer value={(campaign as any).businessProblemRaw || campaign.objectiveContent.problem} />
              </div>
            )}
            {hasAudience && (
              <div>
                <h4 style={{ marginTop: 0 }}>Target Audience & Persona Profile</h4>
                <ContentRenderer value={(campaign as any).targetAudienceRaw || campaign.objectiveContent.audience} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. Strategy */}
      {strategyColumnsCount > 0 && (
        <section className="article-section" id="strategy">
          <span className="article-section__num">Section {sectionNumbers['strategy']}</span>
          <h2 className="article-section__title">Marketing Strategy</h2>
          
          <div className={strategyGridClass ? `grid ${strategyGridClass}` : ''} style={{ marginTop: 'var(--space-4)' }}>
            {hasApproach && (
              <div>
                <h4 style={{ marginTop: 0 }}>Strategic Approach</h4>
                <ContentRenderer value={(campaign as any).marketingStrategyRaw || campaign.strategy.approach} />
              </div>
            )}
            {hasConcept && (
              <div>
                <h4 style={{ marginTop: 0 }}>Core Concept</h4>
                <ContentRenderer value={(campaign as any).positioningRaw || campaign.strategy.concept} />
              </div>
            )}
            {hasSlogan && (
              <div>
                <h4 style={{ marginTop: 0 }}>Core Copywriting & Slogan</h4>
                <p>The campaign centered on the powerful, quiet slogan: <strong>"{campaign.strategy.messaging}"</strong>.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. Psychology */}
      {campaign.strategy?.psychology && (
        <section className="article-section" id="psychology">
          <span className="article-section__num">Section {sectionNumbers['psychology']}</span>
          <h2 className="article-section__title">Consumer Psychology</h2>
          <p>{campaign.strategy.psychology}</p>
          
          <div className="quote-block">
            <p className="quote-block__text">"Great advertising is disarming. It speaks directly to human aspiration, bypassing structural buying patterns by forging an authentic emotional contract."</p>
            <span className="quote-block__author">AdVault Editorial Board</span>
          </div>
        </section>
      )}

      {/* 5. Execution */}
      {(hasLeftExecution || hasRightExecution) && (
        <section className="article-section" id="execution">
          <span className="article-section__num">Section {sectionNumbers['execution']}</span>
          <h2 className="article-section__title">Process & Financial Assets</h2>
          
          <div className={hasLeftExecution && hasRightExecution ? "grid grid--2" : ""} style={{ marginTop: 'var(--space-4)' }}>
            {hasLeftExecution && (
              <div>
                <ContentRenderer value={(campaign as any).executionProcessRaw || campaign.execution.details} />
                {hasPhases && (
                  <>
                    <h4 style={{ marginTop: hasExecutionDetails ? 'var(--space-4)' : 0 }}>Fulfillment Steps</h4>
                    <ol style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-5)' }}>
                      {campaign.execution.phases.map((p, index) => (
                        <li style={{ marginBottom: 'var(--space-2)' }} key={index}>{p}</li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            )}
            {hasRightExecution && (
              <div>
                <h4 style={{ marginTop: 0 }}>Budget & Operational Economics</h4>
                <p>{campaign.execution.budget}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6. Media Mix */}
      {(hasLeftMedia || hasRightMedia) && (
        <section className="article-section" id="media-mix">
          <span className="article-section__num">Section {sectionNumbers['media-mix']}</span>
          <h2 className="article-section__title">Media Mix & Distribution</h2>
          
          <div className={hasLeftMedia && hasRightMedia ? "grid grid--2" : ""} style={{ marginTop: 'var(--space-4)', alignItems: 'stretch' }}>
            {hasLeftMedia && (
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
            )}
            {hasRightMedia && (
              <div>
                {hasAssets && (
                  <>
                    <h4 style={{ marginTop: 0 }}>Creative Assets</h4>
                    <ContentRenderer 
                      value={(campaign as any).creativeApproachRaw || campaign.media.assets} 
                      style={{ marginBottom: hasDistribution ? 'var(--space-4)' : 0 }} 
                    />
                  </>
                )}
                {hasDistribution && (
                  <>
                    <h4 style={{ marginTop: hasAssets ? 'var(--space-4)' : 0 }}>Physical Distribution Strategy</h4>
                    <ContentRenderer value={(campaign as any).geographicCoverageRaw || campaign.media.distribution} />
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. Results */}
      {(hasResultsMetrics || resultsColumnsCount > 0) && (
        <section className="article-section" id="results">
          <span className="article-section__num">Section {sectionNumbers['results']}</span>
          <h2 className="article-section__title">Vetted Business Results</h2>
          
          {hasResultsMetrics && (
            <div className="metrics-grid" style={{ marginBottom: 'var(--space-6)' }}>
              {campaign.results.metrics.map((m, index) => (
                <div className="metrics-item" key={`${m.label}-${index}`}>
                  <span className="metrics-item__label">{m.label}</span>
                  <span className="metrics-item__value">{m.value}</span>
                  <span className="metrics-item__note">{m.note}</span>
                </div>
              ))}
            </div>
          )}

          {resultsColumnsCount > 0 && (
            <div className={resultsGridClass ? `grid ${resultsGridClass}` : ''}>
              {hasReach && (
                <div>
                  <h4 style={{ marginTop: 0 }}>Reach & Impressions</h4>
                  <ContentRenderer value={(campaign as any).businessResultsRaw || campaign.results.reach} />
                </div>
              )}
              {hasSales && (
                <div>
                  <h4 style={{ marginTop: 0 }}>Direct Sales Lift & Volume</h4>
                  <ContentRenderer value={(campaign as any).successHighlightsRaw || campaign.results.sales} />
                </div>
              )}
              {hasRoi && (
                <div>
                  <h4 style={{ marginTop: 0 }}>Calculated ROI</h4>
                  <p>{campaign.results.roi}</p>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* 8. Playbook */}
      {playbookColumnsCount > 0 && (
        <section className="article-section" id="playbook">
          <span className="article-section__num">Section {sectionNumbers['playbook']}</span>
          <h2 className="article-section__title">Marketing Playbook</h2>
          
          <div className={playbookGridClass ? `grid ${playbookGridClass}` : ''} style={{ marginTop: 'var(--space-4)' }}>
            {hasLearnings && (
              <div>
                <h4 style={{ marginTop: 0 }}>Strategic Learnings</h4>
                <ul style={{ paddingLeft: 'var(--space-4)', margin: 0 }}>
                  {campaign.takeaways.learnings.map((l, index) => (
                    <li style={{ marginBottom: 'var(--space-2)' }} key={index}>{l}</li>
                  ))}
                </ul>
              </div>
            )}
            {hasPractices && (
              <div>
                <h4 style={{ marginTop: 0 }}>Best Operational Practices</h4>
                <ul style={{ paddingLeft: 'var(--space-4)', margin: 0 }}>
                  {campaign.takeaways.practices.map((p, index) => (
                    <li style={{ marginBottom: 'var(--space-2)' }} key={index}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
            {hasRecommendations && (
              <div>
                <h4 style={{ marginTop: 0 }}>Editorial Recommendations</h4>
                <ContentRenderer value={(campaign as any).keyLearningsRaw || campaign.takeaways.recommendations} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* 9. References */}
      {hasReferences && (
        <section className="article-section" id="references">
          <span className="article-section__num">Section {sectionNumbers['references']}</span>
          <h2 className="article-section__title">Case References & Literature</h2>
          <div className="references-list">
            <ol>
              {campaign.references.map((ref, index) => {
                if (typeof ref === 'string') {
                  return (
                    <li style={{ marginBottom: 'var(--space-2)' }} key={index}>
                      {ref}
                    </li>
                  );
                }

                // Construct proper Harvard/APA-style citation parts dynamically
                const citationParts: string[] = [];
                if (ref.author) {
                  citationParts.push(ref.author);
                }
                
                if (ref.publishedDate) {
                  const year = ref.publishedDate.split('-')[0];
                  citationParts.push(`(${year})`);
                } else {
                  citationParts.push(`(n.d.)`);
                }
                
                citationParts.push(`"${ref.title}"`);
                
                let sourceDetail = '';
                if (ref.sourceName && ref.publisher) {
                  sourceDetail = `${ref.sourceName}, ${ref.publisher}`;
                } else if (ref.sourceName) {
                  sourceDetail = ref.sourceName;
                } else if (ref.publisher) {
                  sourceDetail = ref.publisher;
                }
                
                if (sourceDetail) {
                  citationParts.push(sourceDetail);
                }
                
                if (ref.sourceType) {
                  const typeLabel = ref.sourceType.replace('-', ' ');
                  citationParts.push(`[${typeLabel}]`);
                }

                const citationText = citationParts.join('. ') + '.';

                return (
                  <li style={{ marginBottom: 'var(--space-3)' }} key={index}>
                    <div style={{ display: 'inline-block' }}>
                      <span style={{ color: 'var(--text)' }}>{citationText}</span>
                      {ref.fileUrl && (
                        <a 
                          href={ref.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ 
                            marginLeft: 'var(--space-2)', 
                            color: 'var(--text-link)', 
                            textDecoration: 'underline',
                            fontSize: '12px',
                            fontWeight: 600
                          }}
                        >
                          [View Full Document]
                        </a>
                      )}
                      {ref.url && (
                        <a 
                          href={ref.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ 
                            marginLeft: 'var(--space-2)', 
                            color: 'var(--text-link)', 
                            textDecoration: 'underline',
                            fontSize: '12px'
                          }}
                        >
                          [Access Link]
                        </a>
                      )}
                    </div>
                    {ref.notes && Array.isArray(ref.notes) && ref.notes.length > 0 && (
                      <details style={{ marginTop: 'var(--space-2)', fontSize: '13px' }}>
                        <summary style={{ cursor: 'pointer', outline: 'none', color: 'var(--text-link)', fontWeight: 500 }}>
                          View Case Study Notes & Excerpts
                        </summary>
                        <div style={{ 
                          marginTop: 'var(--space-2)', 
                          padding: 'var(--space-4)', 
                          backgroundColor: 'var(--surface)', 
                          borderLeft: '3px solid var(--border)',
                          borderRadius: '6px',
                          color: 'var(--text-muted)',
                          fontSize: '14px',
                          lineHeight: '1.6'
                        }}>
                          <ContentRenderer value={ref.notes} />
                        </div>
                      </details>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {/* Related Campaigns Section */}
      {relatedCampaigns.length > 0 && (
        <section className="article-section" style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-6)' }}>
          <span className="caption text-muted" style={{ marginBottom: 'var(--space-4)', display: 'block' }}>Related Research Files</span>
          <div className="grid grid--2">
            {relatedCampaigns.map(relCampaign => (
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
      )}
    </>
  );
};
