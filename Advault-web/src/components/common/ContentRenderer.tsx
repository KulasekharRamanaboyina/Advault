import React from 'react';
import { PortableText } from '@portabletext/react';

interface ContentRendererProps {
  value: any;
  className?: string;
  style?: React.CSSProperties;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ 
  value, 
  className, 
  style = {} 
}) => {
  if (!value) return null;

  // Render Portable Text if the value is a structured Sanity block array
  if (Array.isArray(value)) {
    return (
      <div className={className} style={{ ...style, lineHeight: 1.6 }}>
        <PortableText 
          value={value}
          components={{
            block: {
              normal: ({ children }) => <p style={{ marginBottom: 'var(--space-3)' }}>{children}</p>,
              h1: ({ children, value }) => {
                const text = value.children?.map((c: any) => c.text).join('') || '';
                const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                return <h1 id={id} style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>{children}</h1>;
              },
              h2: ({ children, value }) => {
                const text = value.children?.map((c: any) => c.text).join('') || '';
                const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                return <h2 id={id} style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>{children}</h2>;
              },
              h3: ({ children, value }) => {
                const text = value.children?.map((c: any) => c.text).join('') || '';
                const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                return <h3 id={id} style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>{children}</h3>;
              },
              h4: ({ children, value }) => {
                const text = value.children?.map((c: any) => c.text).join('') || '';
                const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                return <h4 id={id} style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-1)' }}>{children}</h4>;
              },
              blockquote: ({ children }) => (
                <blockquote style={{ 
                  borderLeft: '4px solid var(--border-subtle)', 
                  paddingLeft: 'var(--space-4)', 
                  color: 'var(--text-muted)', 
                  margin: 'var(--space-4) 0',
                  fontStyle: 'italic' 
                }}>
                  {children}
                </blockquote>
              ),
            },
            list: {
              bullet: ({ children }) => <ul style={{ paddingLeft: 'var(--space-5)', marginBottom: 'var(--space-3)', listStyleType: 'disc' }}>{children}</ul>,
              number: ({ children }) => <ol style={{ paddingLeft: 'var(--space-5)', marginBottom: 'var(--space-3)', listStyleType: 'decimal' }}>{children}</ol>,
            },
            listItem: {
              bullet: ({ children }) => <li style={{ marginBottom: 'var(--space-1)' }}>{children}</li>,
              number: ({ children }) => <li style={{ marginBottom: 'var(--space-1)' }}>{children}</li>,
            },
            marks: {
              strong: ({ children }) => <strong>{children}</strong>,
              em: ({ children }) => <em>{children}</em>,
              code: ({ children }) => <code className="mono" style={{ backgroundColor: 'var(--surface-subtle)', padding: '2px 4px', borderRadius: '4px' }}>{children}</code>,
              link: ({ value, children }) => {
                const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
                return (
                  <a 
                    href={value?.href} 
                    target={target} 
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    style={{ textDecoration: 'underline', color: 'var(--text-link)' }}
                  >
                    {children}
                  </a>
                );
              },
            },
          }}
        />
      </div>
    );
  }

  // Fallback to simple paragraph tag for plain string data
  return <p className={className} style={style}>{value}</p>;
};
