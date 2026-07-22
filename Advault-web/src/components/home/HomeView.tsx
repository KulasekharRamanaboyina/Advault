import React from 'react';
import { HomeHero } from './HomeHero';
import { HomeBrandGrid } from './HomeBrandGrid';
import { HomeCta } from './HomeCta';

interface HomeViewProps {
  onSearchSubmit: (query: string) => void;
  onSaveCampaign: (id: string, e: React.MouseEvent) => void;
  onShareCampaign: (id: string, e: React.MouseEvent) => void;
  savedCampaigns: Set<string>;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSearchSubmit }) => {
  return (
    <section className="view view--active" data-view="home" id="view-home">
      <HomeHero onSearchSubmit={onSearchSubmit} />
      <HomeBrandGrid />
      <HomeCta />
    </section>
  );
};
