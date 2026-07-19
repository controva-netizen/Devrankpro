import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useBlog } from '@/context/BlogContext';
import BlogDiscussionSection from '@/components/sections/blog/BlogDiscussionSection';
import SEO from '@/components/shared/SEO';

export default function BlogSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const { posts, loading } = useBlog();
  
  if (loading) {
    return <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">Loading article...</div>;
  }

  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.controvallc.com/blog/${post.slug}`
    },
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [post.image] : [],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://www.controvallc.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Controva LLC',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.controvallc.com/favicon.svg'
      }
    },
    keywords: post.category
  };

  return (
    <article className="pt-32 pb-24 min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO 
        title={`${post.title} | Controva Blog`}
        description={post.excerpt}
        image={post.image || undefined}
        type="article"
        url={`https://www.controvallc.com/blog/${post.slug}`}
        schema={articleSchema}
      />
      {/* ── Hero Header ── */}
      <div className="max-w-[1280px] mx-auto px-6 mb-12">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:opacity-80"
          style={{ color: 'var(--accent-1)' }}
        >
          <ArrowLeft size={16} /> Back to Insights
        </Link>
        
        <div className="mb-6">
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)' }}
          >
            {post.category}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.1] tracking-tight mb-8" style={{ color: 'var(--text-primary)' }}>
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          <div className="flex items-center gap-2">
            <User size={16} />
            {post.author}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            {post.date}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-current opacity-40"></span>
            {post.readTime}
          </div>
        </div>
      </div>

      {/* ── Featured Image ── */}
      {post.image && (
        <div className="max-w-[1280px] mx-auto px-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-[400px] md:h-[500px] rounded-[24px] overflow-hidden"
            style={{ border: '1px solid var(--border-subtle)' }}
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* ── Main Content & Sidebar ── */}
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Markdown */}
          <div className="w-full lg:w-[70%]">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              style={{ color: 'var(--text-secondary)' }}
            >
              {post.content ? (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 font-display" style={{ color: 'var(--text-primary)' }} {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 font-display" style={{ color: 'var(--text-primary)' }} {...props} />,
                    p: ({node, ...props}) => <p className="mb-6 leading-relaxed" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold" style={{ color: 'var(--text-primary)' }} {...props} />,
                    a: ({node, ...props}) => <a className="underline hover:no-underline" style={{ color: 'var(--accent-1)' }} {...props} />
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              ) : (
                <p className="italic opacity-60">Content coming soon...</p>
              )}
            </div>
            
            {/* ── Discussion Section ── */}
            <div className="mt-20 border-t pt-12" style={{ borderColor: 'var(--border-subtle)' }}>
              <BlogDiscussionSection />
            </div>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="w-full lg:w-[30%]">
            <div className="sticky top-32 space-y-8">
              {/* Author Card */}
              <div 
                className="p-8 rounded-[24px]"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl" style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)' }}>
                    C
                  </div>
                  <div>
                    <h4 className="font-bold font-display text-lg" style={{ color: 'var(--text-primary)' }}>Controva LLC</h4>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Engineering Team</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  We build digital empires that scale. Specializing in high-performance web architecture, AI automation, and headless commerce.
                </p>
                <Link 
                  to="/contact" 
                  className="block w-full py-3 px-4 rounded-xl text-center text-sm font-bold transition-transform hover:scale-105"
                  style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                >
                  Work with us
                </Link>
              </div>

              {/* Share Card */}
              <div 
                className="p-8 rounded-[24px]"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              >
                <h4 className="font-bold font-display text-lg mb-4" style={{ color: 'var(--text-primary)' }}>Share this article</h4>
                <div className="flex items-center gap-3">
                  <button className="flex-1 py-2 rounded-lg font-medium text-sm transition-colors hover:opacity-80" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>Twitter</button>
                  <button className="flex-1 py-2 rounded-lg font-medium text-sm transition-colors hover:opacity-80" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}>LinkedIn</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
