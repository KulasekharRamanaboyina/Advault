import React, { useState, useEffect } from 'react';
import { useAdbicepsData } from '../../context/AdbicepsDataContext';
import { BlogPost } from '../../types';
import { ContentRenderer } from '../common/ContentRenderer';
import { getImageUrl } from '../../sanityClient';

export const BlogsView: React.FC<{ activePostSlug?: string }> = ({ activePostSlug }) => {
  const { posts: BLOG_POSTS } = useAdbicepsData();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeId, setActiveId] = useState<string>('');

  const categories = ['All', 'Tactile Marketing', 'Out of Home', 'Economics'];

  // Sync route slug parameter with active reading view selection
  useEffect(() => {
    if (activePostSlug && BLOG_POSTS.length > 0) {
      const matched = BLOG_POSTS.find(p => p.id === activePostSlug);
      if (matched) {
        setSelectedPost(matched);
        return;
      }
    }
    setSelectedPost(null);
  }, [activePostSlug, BLOG_POSTS]);

  // Dynamically extract headings from Portable Text block content array
  const headings = selectedPost?.content && Array.isArray(selectedPost.content)
    ? selectedPost.content
        .filter((block: any) => block._type === 'block' && /^h[1-6]$/.test(block.style || ''))
        .map((block: any) => {
          const text = block.children?.map((c: any) => c.text).join('') || '';
          const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
          return { text, id, style: block.style };
        })
    : [];

  // Track scrolling height to calculate reading progress bar percentage
  useEffect(() => {
    if (!selectedPost) {
      setScrollPercent(0);
      return;
    }
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPost]);

  // Intersection Observer to highlight active heading section in Table of Contents
  useEffect(() => {
    if (!selectedPost || headings.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedPost, headings]);

  const filteredPosts = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  const handleSelectPost = (post: BlogPost) => {
    window.history.pushState({}, '', `/blogs/${post.id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleBack = () => {
    window.history.pushState({}, '', '/blogs');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <main className="container" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-12)' }}>
      {/* Dynamic Scroll Progress Bar */}
      {selectedPost && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: `${scrollPercent}%`,
          height: '3px',
          background: 'linear-gradient(90deg, var(--border) 0%, #a78bfa 100%)',
          zIndex: 1000,
          transition: 'width 0.15s ease-out'
        }} />
      )}

      {!selectedPost && (
        <div className="legal-header" style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
          <h1 className="legal-title" style={{ fontSize: '36px', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text-bright)' }}>
            Adbiceps Journal
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginTop: 'var(--space-2)' }}>
            Deep-dives into offline marketing strategies, print economics, and consumer psychology.
          </p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 'var(--space-8)', alignItems: 'start' }}>
        {/* Left Column: Post List or Active Post */}
        <div>
          {selectedPost ? (
            <article style={{ position: 'relative' }}>
              
              {selectedPost.thumbnail && (
                <div style={{ width: '100%', height: '360px', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: 'var(--space-5)', border: '1px solid var(--border-subtle)' }}>
                  <img 
                    src={getImageUrl(selectedPost.thumbnail)} 
                    alt={selectedPost.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
              )}

              <h2 style={{ fontSize: '32px', color: 'var(--text-bright)', marginBottom: 'var(--space-2)', letterSpacing: '-0.03em', fontWeight: 600, lineHeight: 1.25 }}>
                {selectedPost.title}
              </h2>

              {/* Verified Editorial Metadata Block */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                margin: 'var(--space-4) 0 var(--space-6) 0',
                borderTop: '1px solid var(--border-subtle)',
                borderBottom: '1px solid var(--border-subtle)',
                padding: 'var(--space-3) 0'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--surface-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--border)'
                }}>
                  AB
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-bright)' }}>
                    Adbiceps Editorial Board
                    <span style={{ fontSize: '12px', color: 'var(--border)' }} title="Verified Publisher">✓</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Published {selectedPost.date} &bull; {selectedPost.readTime}
                  </div>
                </div>
                <span style={{
                  background: 'rgba(167, 139, 250, 0.1)',
                  color: '#a78bfa',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '4px 10px',
                  borderRadius: '12px'
                }}>
                  {selectedPost.category}
                </span>
              </div>

              <div style={{ color: 'var(--text)', lineHeight: 1.75, fontSize: '15px' }} className="blog-content">
                <ContentRenderer value={selectedPost.content} />
              </div>
            </article>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {filteredPosts.map(post => {
                const thumbUrl = post.thumbnail ? getImageUrl(post.thumbnail) : '';
                return (
                  <div 
                    key={post.id}
                    onClick={() => handleSelectPost(post)}
                    className="blog-card"
                  >
                    {thumbUrl && (
                      <div className="blog-card__thumb">
                        <img src={thumbUrl} alt={post.title} />
                      </div>
                    )}
                    <div className="blog-card__content">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: 'var(--space-1)' }}>
                          <span className="mono" style={{ textTransform: 'uppercase', fontWeight: 600 }}>{post.category}</span>
                          <span>&bull;</span>
                          <span>{post.date}</span>
                        </div>
                        <h3 style={{ fontSize: '18px', color: 'var(--text-bright)', margin: '4px 0 8px 0', fontWeight: 600 }}>
                          {post.title}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
                          {post.excerpt}
                        </p>
                      </div>
                      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{post.readTime}</span>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--border)' }}>Read Article &rarr;</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredPosts.length === 0 && (
                <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--text-muted)' }}>
                  No articles found in this category.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Sticky Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', position: 'sticky', top: '100px' }}>
          {selectedPost ? (
            <>
              {/* Dynamic Highlights Table of Contents */}
              {headings.length > 0 && (
                <div style={{ padding: '0 var(--space-2)' }}>
                  <h4 style={{ margin: '0 0 var(--space-3) 0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-bright)' }}>
                    Table of Contents
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '12px' }}>
                    {headings.map(h => {
                      const isActive = activeId === h.id;
                      return (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          style={{
                            fontSize: '13px',
                            color: isActive ? 'var(--border)' : 'var(--text-muted)',
                            fontWeight: isActive ? 600 : 400,
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                            lineHeight: 1.4,
                            position: 'relative'
                          }}
                        >
                          {isActive && (
                            <span style={{
                              position: 'absolute',
                              left: '-13.5px',
                              top: '6px',
                              width: '3px',
                              height: '10px',
                              background: 'var(--border)',
                              borderRadius: '2px'
                            }} />
                          )}
                          {h.text}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Journal Categories filter menu */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius)', padding: 'var(--space-4)' }}>
                <h4 style={{ margin: '0 0 var(--space-3) 0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-bright)' }}>
                  Journal Categories
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        handleBack();
                      }}
                      style={{
                        background: activeCategory === cat ? 'var(--border)' : 'transparent',
                        color: activeCategory === cat ? '#ffffff' : 'var(--text-muted)',
                        border: 'none',
                        textAlign: 'left',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: activeCategory === cat ? 600 : 500,
                        transition: 'all 0.2s'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Editorial Press dossier text */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius)', padding: 'var(--space-4)' }}>
                <h4 style={{ margin: '0 0 var(--space-2) 0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-bright)' }}>
                  Adbiceps Press
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  The Adbiceps Editorial Board publishes peer-reviewed research quarterly. Our team inspects print logistics, out-of-home placement strategies, and offline campaign expenditures to verify marketing intelligence.
                </p>
              </div>
            </>
          )}
        </aside>
      </div>
    </main>
  );
};
