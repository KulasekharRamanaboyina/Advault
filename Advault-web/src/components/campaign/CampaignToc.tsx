import React from 'react';

interface TocItem {
  id: string;
  num: string;
  label: string;
}

interface CampaignTocProps {
  tocItems: TocItem[];
  activeSection: string;
  onTocClick: (sectionId: string, e: React.MouseEvent) => void;
}

export const CampaignToc: React.FC<CampaignTocProps> = ({
  tocItems,
  activeSection,
  onTocClick,
}) => {
  return (
    <aside className="article-toc" aria-label="Table of Contents">
      <div className="article-toc__title">Table of Contents</div>
      <nav className="article-toc__list" id="article-toc-nav">
        {tocItems.map(item => (
          <a 
            key={item.id}
            href={`#${item.id}`} 
            className={`article-toc__link ${activeSection === item.id ? 'article-toc__link--active' : ''}`}
            onClick={(e) => onTocClick(item.id, e)}
            data-scroll={item.id}
          >
            {item.num}. {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
};
