import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, Rss } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/shared/SectionHeader';
import { useBlog } from '@/context/BlogContext';
import SEO from '@/components/shared/SEO';

export default function BlogPage() {
  const { posts } = useBlog();
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="pt-32 pb-24 min-h-[80vh]">
      <SEO 
        title="Insights & Engineering Blog | Controva LLC"
        description="Read the latest technical guides, architecture deep-dives, and performance marketing strategies from the Controva engineering team."
        url="https://www.controvallc.com/blog"
      />
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader 
            label="INSIGHTS & ENGINEERING" 
            headline="The Controva Blog" 
          />
          <a 
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: 'var(--accent-subtle)', 
              color: 'var(--accent-1)',
              border: '1px solid var(--accent-border)'
            }}
          >
            <Rss size={16} />
            Subscribe to RSS
          </a>
        </div>
        
        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 mb-16"
        >
          <Link 
            to={`/blog/${featuredPost.slug}`}
            className="group block rounded-[24px] overflow-hidden card-hover"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-[300px] lg:h-[480px] overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 lg:p-14 flex flex-col justify-center">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 w-fit"
                  style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)' }}
                >
                  {featuredPost.category}
                </span>
                <h2 
                  className="text-3xl lg:text-4xl font-bold mb-4 font-display leading-tight transition-all duration-500 group-hover:text-[#22D3EE] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]" 
                  style={{ color: 'var(--text-primary)' }}
                >
                  {featuredPost.title}
                </h2>
                <p className="text-base lg:text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center flex-wrap gap-x-6 gap-y-3 text-sm font-medium mt-auto" style={{ color: 'var(--text-muted)' }}>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-current opacity-40"></span>
                    {featuredPost.readTime}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
            >
              <Link 
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-[20px] overflow-hidden card-hover"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div className="h-[240px] overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-md"
                      style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: 'var(--accent-1)' }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
                  </div>
                  
                  <h3 
                    className="text-xl font-bold mb-3 font-display leading-tight transition-all duration-500 group-hover:text-[#22D3EE] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]" 
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {post.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: 'var(--text-secondary)' }}>
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center font-semibold text-sm transition-colors duration-200" style={{ color: 'var(--accent-1)' }}>
                    <span className="relative inline-block">
                      Read Article
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full" style={{ backgroundColor: 'var(--accent-1)' }}></span>
                    </span>
                    <ArrowRight size={16} className="ml-2 transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
