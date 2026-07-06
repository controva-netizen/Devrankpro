import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Eye, LogOut, Clock, X, Check, AlertTriangle } from 'lucide-react';
import { useBlog } from '@/context/BlogContext';
import { useTheme } from '@/context/ThemeContext';
import type { BlogPost } from '@/data/blog';

/* ── Password Gate ───────────────────────────────────────── */
const ADMIN_PASSWORD = 'controva2026';

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const { isDark } = useTheme();
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'var(--accent-gradient)' }}
          >
            <span className="text-white font-bold text-sm">CL</span>
          </div>
          <h1 className="text-2xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
            Blog Admin
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Enter your admin password to continue
          </p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Admin password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: `1px solid ${error ? '#ef4444' : 'var(--border-subtle)'}`,
              color: 'var(--text-primary)',
              fontFamily: "'Inter', sans-serif",
            }}
            autoFocus
          />
          {error && (
            <p className="text-xs flex items-center gap-1.5" style={{ color: '#ef4444' }}>
              <AlertTriangle size={13} /> Incorrect password. Try again.
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--accent-gradient)', fontFamily: "'Inter', sans-serif" }}
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ── Post Form (Create / Edit) ───────────────────────────── */
const CATEGORIES = ['Engineering & E-Commerce', 'AI & Automation', 'Growth & Strategy', 'Design & Brand', 'Case Study'];

const emptyForm = {
  title: '',
  excerpt: '',
  category: CATEGORIES[0],
  author: 'Engineering Team',
  date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
  readTime: '5 min read',
  slug: '',
  image: '',
};

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function PostForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: BlogPost;
  onSave: (data: Omit<BlogPost, 'id'>) => void;
  onCancel: () => void;
}) {
  const { isDark } = useTheme();
  const [form, setForm] = useState<Omit<BlogPost, 'id'>>(initial ?? emptyForm);

  const set = (k: keyof typeof form, v: string) => {
    setForm((prev) => {
      const next = { ...prev, [k]: v };
      if (k === 'title' && !initial) next.slug = slugify(v);
      return next;
    });
  };

  const inputStyle = {
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-active)',
    color: 'var(--text-primary)',
    fontFamily: "'Inter', sans-serif",
    borderRadius: 10,
    padding: '10px 14px',
    width: '100%',
    fontSize: 13,
    outline: 'none',
  };

  const labelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-muted)',
    fontFamily: "'Inter', sans-serif",
    marginBottom: 6,
    display: 'block',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.07em',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <motion.div
        initial={{ scale: 0.96, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 20 }}
        className="w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <h2 className="text-base font-semibold font-display" style={{ color: 'var(--text-primary)' }}>
            {initial ? 'Edit Post' : 'New Blog Post'}
          </h2>
          <button onClick={onCancel} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Title */}
          <div>
            <label style={labelStyle}>Title *</label>
            <input
              style={inputStyle}
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. Why Headless Shopify Outperforms Monolithic Stores"
            />
          </div>

          {/* Slug */}
          <div>
            <label style={labelStyle}>URL Slug *</label>
            <input
              style={inputStyle}
              value={form.slug}
              onChange={(e) => set('slug', e.target.value)}
              placeholder="auto-generated-from-title"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label style={labelStyle}>Excerpt (SEO description) *</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              placeholder="Write a compelling 1–2 sentence summary. This shows on Google search results."
            />
          </div>

          {/* Two col */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Category *</label>
              <select
                style={inputStyle}
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Author</label>
              <input
                style={inputStyle}
                value={form.author}
                onChange={(e) => set('author', e.target.value)}
                placeholder="Engineering Team"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Publish Date</label>
              <input
                style={inputStyle}
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                placeholder="Jul 06, 2026"
              />
            </div>
            <div>
              <label style={labelStyle}>Read Time</label>
              <input
                style={inputStyle}
                value={form.readTime}
                onChange={(e) => set('readTime', e.target.value)}
                placeholder="5 min read"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label style={labelStyle}>Cover Image URL</label>
            <input
              style={inputStyle}
              value={form.image}
              onChange={(e) => set('image', e.target.value)}
              placeholder="https://images.unsplash.com/... or /images/post-cover.jpg"
            />
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="mt-3 w-full h-[160px] object-cover rounded-xl"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4 border-t"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-xl text-sm font-medium transition-colors"
            style={{
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-tertiary)',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!form.title || !form.slug || !form.excerpt) return;
              onSave(form);
            }}
            disabled={!form.title || !form.slug || !form.excerpt}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40"
            style={{ background: 'var(--accent-gradient)', fontFamily: "'Inter', sans-serif" }}
          >
            <Check size={15} />
            {initial ? 'Save Changes' : 'Publish Post'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Delete Confirm ──────────────────────────────────────── */
function DeleteConfirm({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        className="w-full max-w-sm rounded-2xl p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FEF2F2' }}>
          <Trash2 size={18} color="#EF4444" />
        </div>
        <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>Delete Post?</h3>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif" }}>
          "<strong>{title}</strong>" will be permanently deleted. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: '#EF4444', fontFamily: "'Inter', sans-serif" }}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Admin Page ─────────────────────────────────────── */
export default function BlogAdminPage() {
  const { posts, addPost, updatePost, deletePost } = useBlog();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [authed, setAuthed] = useState(() => sessionStorage.getItem('blog_admin') === '1');
  const [modal, setModal] = useState<'create' | { type: 'edit'; post: BlogPost } | { type: 'delete'; post: BlogPost } | null>(null);

  const handleLogin = () => {
    sessionStorage.setItem('blog_admin', '1');
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('blog_admin');
    setAuthed(false);
    navigate('/blog');
  };

  if (!authed) return <LoginGate onLogin={handleLogin} />;

  return (
    <div className="min-h-screen pt-28 pb-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-[1100px] mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--accent-1)', fontFamily: "'Inter', sans-serif" }}>
              Blog Management
            </p>
            <h1 className="text-4xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
              Admin Panel
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/blog"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Eye size={15} />
              View Blog
            </Link>
            <button
              onClick={() => setModal('create')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'var(--accent-gradient)', fontFamily: "'Inter', sans-serif" }}
            >
              <Plus size={15} />
              New Post
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
              style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}
              title="Logout"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Posts', value: posts.length },
            { label: 'Categories', value: [...new Set(posts.map((p) => p.category))].length },
            { label: 'Avg Read Time', value: posts.length ? Math.round(posts.reduce((a, p) => a + parseInt(p.readTime), 0) / posts.length) + ' min' : '—' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-5"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              <p className="text-3xl font-bold font-display mb-1" style={{ color: 'var(--text-primary)' }}>
                {s.value}
              </p>
              <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Posts Table ── */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
          {/* Table Header */}
          <div
            className="grid grid-cols-[1fr_160px_120px_110px] gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-widest"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              color: 'var(--text-muted)',
              fontFamily: "'Inter', sans-serif",
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <span>Title</span>
            <span>Category</span>
            <span>Date</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Rows */}
          {posts.length === 0 ? (
            <div className="px-6 py-16 text-center" style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}>
              No posts yet. Click "New Post" to get started.
            </div>
          ) : (
            posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-[1fr_160px_120px_110px] gap-4 px-6 py-4 items-center group"
                style={{
                  borderBottom: i < posts.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  backgroundColor: 'var(--bg-secondary)',
                  transition: 'background-color 200ms',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = isDark
                    ? 'rgba(255,255,255,0.02)'
                    : 'rgba(0,0,0,0.015)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = 'var(--bg-secondary)';
                }}
              >
                {/* Title + excerpt */}
                <div>
                  <p className="text-sm font-semibold mb-0.5 truncate" style={{ color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                    {post.title}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}>
                    /{post.slug}
                  </p>
                </div>

                {/* Category badge */}
                <span
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold w-fit truncate"
                  style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent-1)', fontFamily: "'Inter', sans-serif" }}
                >
                  {post.category}
                </span>

                {/* Date + read time */}
                <div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif" }}>
                    {post.date}
                  </p>
                  <p className="text-[11px] flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif" }}>
                    <Clock size={11} /> {post.readTime}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setModal({ type: 'edit', post })}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)' }}
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setModal({ type: 'delete', post })}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ color: '#EF4444', backgroundColor: '#FEF2F2' }}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {modal === 'create' && (
          <PostForm
            onSave={(data) => { addPost(data); setModal(null); }}
            onCancel={() => setModal(null)}
          />
        )}
        {modal !== null && typeof modal === 'object' && modal.type === 'edit' && (
          <PostForm
            initial={modal.post}
            onSave={(data) => { updatePost(modal.post.id, data); setModal(null); }}
            onCancel={() => setModal(null)}
          />
        )}
        {modal !== null && typeof modal === 'object' && modal.type === 'delete' && (
          <DeleteConfirm
            title={modal.post.title}
            onConfirm={() => { deletePost(modal.post.id); setModal(null); }}
            onCancel={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
