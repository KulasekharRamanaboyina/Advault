import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastNotification } from './components/layout/ToastNotification';
import { HomeView } from './components/home/HomeView';
import { DiscoverView } from './components/discover/DiscoverView';
import { BrandDetailView } from './components/brand/BrandDetailView';
import { CampaignDetailView } from './components/campaign/CampaignDetailView';
import { CompareView } from './components/compare/CompareView';
import { GuidelinesView } from './components/legal/GuidelinesView';
import { PrivacyView } from './components/legal/PrivacyView';
import { useAdVaultData } from './context/AdVaultDataContext';

export const App: React.FC = () => {
  const { campaigns: CAMPAIGNS, loading } = useAdVaultData();
  // Hash Routing State
  const [hash, setHash] = useState(window.location.hash || '#home');
  const [currentView, setCurrentView] = useState('home');
  const [parameter, setParameter] = useState('');

  // Global filters for library searching
  const [filters, setFilters] = useState({
    industry: 'all',
    channel: 'all',
    search: '',
  });

  // Saved campaigns Set (synced with localStorage)
  const [savedCampaigns, setSavedCampaigns] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('advault_saved_campaigns');
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch (e) {
        return new Set();
      }
    }
    return new Set();
  });

  // Comparison Slot state
  const [campaignAId, setCampaignAId] = useState('amul');
  const [campaignBId, setCampaignBId] = useState('shareacoke');

  // Toast State
  const [toast, setToast] = useState({ show: false, message: '' });

  // Update localStorage when savedCampaigns changes
  useEffect(() => {
    localStorage.setItem('advault_saved_campaigns', JSON.stringify(Array.from(savedCampaigns)));
  }, [savedCampaigns]);

  // Toast utility function
  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  // Auto-hide toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '' });
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Listen for hashchange events
  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || '#home');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Parse routing parameters
  useEffect(() => {
    let view = 'home';
    let param = '';

    if (hash.startsWith('#campaign/')) {
      view = 'campaign';
      param = hash.substring(10);
    } else if (hash.startsWith('#brand/')) {
      view = 'brand';
      param = hash.substring(7);
    } else if (hash === '#discover') {
      view = 'discover';
    } else if (hash === '#compare') {
      view = 'compare';
    } else if (hash === '#guidelines') {
      view = 'guidelines';
    } else if (hash === '#privacy') {
      view = 'privacy';
    }

    setCurrentView(view);
    setParameter(param);

    // Scroll to top on navigation so entrance animation looks clean
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [hash]);

  // Save campaign helper
  const handleSaveCampaign = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaved = new Set(savedCampaigns);
    if (newSaved.has(id)) {
      newSaved.delete(id);
      showToast(`Removed "${CAMPAIGNS[id]?.title || id}" from research workspace.`);
    } else {
      newSaved.add(id);
      showToast(`Saved "${CAMPAIGNS[id]?.title || id}" to research workspace.`);
    }
    setSavedCampaigns(newSaved);
  };

  // Copy reference link helper
  const handleShareCampaign = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}#campaign/${id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => showToast('Shareable article link copied to clipboard.'))
      .catch(() => showToast('Failed to copy link. Please copy the URL bar.'));
  };

  // Download campaign helper
  const handleDownloadCampaign = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`Initiating download for "${CAMPAIGNS[id]?.title || id}" research paper.`);
  };

  // Hero search trigger (navigates to discover with prepopulated query)
  const handleHeroSearchSubmit = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
    window.location.hash = '#discover';
  };

  // Keyboard shortcuts and global navigation handlers
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // 1. Focus Search Box (Cmd+K or Ctrl+K)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchBox = document.getElementById(
          currentView === 'home' ? 'hero-search-input' : 'discover-search-input'
        ) as HTMLInputElement;
        
        if (searchBox) {
          searchBox.focus();
          showToast('Search workspace active.');
        }
        return;
      }

      // 2. Escape Key: Blur active input or reset active view
      if (e.key === 'Escape') {
        const activeEl = document.activeElement as HTMLElement;
        if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'SELECT' || activeEl.tagName === 'TEXTAREA')) {
          activeEl.blur();
          
          if (activeEl.id === 'hero-search-input' || activeEl.id === 'discover-search-input') {
            setFilters(prev => ({ ...prev, search: '' }));
            showToast('Search query cleared.');
          }
          return;
        }

        // Contextual escapes
        if (currentView === 'campaign' || currentView === 'brand') {
          window.location.hash = '#discover';
          showToast('Returned to campaign library.');
        } else if (currentView === 'compare') {
          if (campaignAId !== 'amul' || campaignBId !== 'shareacoke') {
            setCampaignAId('amul');
            setCampaignBId('shareacoke');
            showToast('Comparison selectors reset to defaults.');
          } else {
            window.location.hash = '#home';
            showToast('Returned to Home.');
          }
        } else if (currentView === 'discover') {
          if (filters.industry !== 'all' || filters.channel !== 'all' || filters.search !== '') {
            setFilters({ industry: 'all', channel: 'all', search: '' });
            showToast('Discovery filters reset.');
          } else {
            window.location.hash = '#home';
            showToast('Returned to Home.');
          }
        } else if (currentView === 'home') {
          if (filters.search !== '') {
            setFilters(prev => ({ ...prev, search: '' }));
            showToast('Search filters cleared.');
          }
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [currentView, filters, campaignAId, campaignBId]);

  // Set page visibility on scroll fade-ins
  useEffect(() => {
    const handleFadeIns = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) {
          el.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleFadeIns);
    handleFadeIns(); // Trigger on first render

    return () => window.removeEventListener('scroll', handleFadeIns);
  }, [currentView, parameter]);

  // Render correct view component based on routing state
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView 
            onSearchSubmit={handleHeroSearchSubmit}
            onSaveCampaign={handleSaveCampaign}
            onShareCampaign={handleShareCampaign}
            savedCampaigns={savedCampaigns}
          />
        );
      case 'discover':
        return (
          <DiscoverView 
            filters={filters}
            setFilters={setFilters}
            onSaveCampaign={handleSaveCampaign}
            onShareCampaign={handleShareCampaign}
            savedCampaigns={savedCampaigns}
          />
        );
      case 'brand':
        return (
          <BrandDetailView 
            brandId={parameter}
            onSaveCampaign={handleSaveCampaign}
            onShareCampaign={handleShareCampaign}
            savedCampaigns={savedCampaigns}
          />
        );
      case 'campaign':
        return (
          <CampaignDetailView 
            campaignId={parameter}
            onSaveCampaign={handleSaveCampaign}
            onShareCampaign={handleShareCampaign}
            onDownloadCampaign={handleDownloadCampaign}
            savedCampaigns={savedCampaigns}
          />
        );
      case 'compare':
        return (
          <CompareView 
            campaignAId={campaignAId}
            campaignBId={campaignBId}
            setCampaignAId={setCampaignAId}
            setCampaignBId={setCampaignBId}
            onShowToast={showToast}
          />
        );
      case 'guidelines':
        return <GuidelinesView />;
      case 'privacy':
        return <PrivacyView />;
      default:
        return (
          <HomeView 
            onSearchSubmit={handleHeroSearchSubmit}
            onSaveCampaign={handleSaveCampaign}
            onShareCampaign={handleShareCampaign}
            savedCampaigns={savedCampaigns}
          />
        );
    }
  };

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B0B0F',
        color: '#FFFFFF',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.05)',
          borderTopColor: '#3b82f6',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <span style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
          Loading AdVault Dossiers...
        </span>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="main-content" style={{ minHeight: 'calc(100vh - 160px)' }}>
        {renderView()}
      </main>

      <Footer />
      <ToastNotification show={toast.show} message={toast.message} />
    </>
  );
};
