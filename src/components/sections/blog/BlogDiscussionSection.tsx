import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Github, Send, LogOut, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  user_name: string;
  user_avatar: string;
  content: string;
  created_at: string;
}

export default function BlogDiscussionSection() {
  const { slug } = useParams<{ slug: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!slug) return;
    
    const fetchComments = async () => {
      setIsLoadingComments(true);
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_slug', slug)
        .eq('status', 'approved')
        .order('created_at', { ascending: true });
        
      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data || []);
      }
      setIsLoadingComments(false);
    };

    fetchComments();
  }, [slug]);

  const handleSignIn = async (provider: 'github' | 'google' | 'linkedin_oidc') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + window.location.pathname
      }
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !slug) return;

    setIsSubmitting(true);
    
    const commentData = {
      post_slug: slug,
      user_id: user.id,
      user_name: user.user_metadata.full_name || user.email?.split('@')[0] || 'Anonymous Engineer',
      user_avatar: user.user_metadata.avatar_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
      content: newComment.trim(),
      status: 'approved'
    };

    const { data, error } = await supabase
      .from('comments')
      .insert([commentData])
      .select()
      .single();

    if (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Make sure you executed the SQL schema in Supabase!');
    } else if (data) {
      setComments([...comments, data]);
      setNewComment('');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="w-full mb-12">
      <div className="flex items-center gap-3 mb-8 pb-4">
        <h3 className="text-xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>Discussion</h3>
        <span 
          className="flex items-center justify-center px-2 h-6 rounded-full text-xs font-semibold"
          style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
        >
          {comments.length}
        </span>
      </div>

      {/* Auth & Input Section */}
      {!user ? (
        <div 
          className="rounded-[20px] p-8 md:p-12 text-center mb-10"
          style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-subtle)' 
          }}
        >
          <h4 className="text-lg md:text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Join the conversation</h4>
          <p className="text-sm mb-2 max-w-[500px] mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Sign in with your preferred account to comment, reply, and keep the discussion useful for other engineers.
          </p>
          <p className="text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
            Takes a few seconds. No separate password required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => handleSignIn('github')}
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
            >
              <Github size={18} />
              Continue with GitHub
            </button>
            
            <button 
              onClick={() => handleSignIn('google')}
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#1E293B', color: '#ffffff', border: '1px solid #334155' }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.806L1.248 17.4C3.208 21.348 7.275 24 12.001 24c2.695 0 5.235-.853 7.33-2.435l-3.29-3.552Z"/>
                <path fill="#4A90E2" d="M19.33 21.565c2.327-2.136 3.842-5.32 3.842-9.293 0-.814-.112-1.579-.276-2.272H12v4.542h6.417c-.302 1.635-1.314 2.873-2.617 3.738l3.53 3.285Z"/>
                <path fill="#FBBC05" d="M4.81 14.383A7.146 7.146 0 0 1 4.385 12c0-.825.148-1.62.425-2.35L.785 6.535A11.96 11.96 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.026-3.115Z"/>
              </svg>
              Continue with Google
            </button>
            
          </div>
        </div>
      ) : (
        <div className="mb-10">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <img 
              src={user.user_metadata.avatar_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} 
              alt={user.user_metadata.full_name} 
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div className="flex-1">
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add to the discussion..."
                  className="w-full min-h-[100px] rounded-xl p-4 text-sm resize-y outline-none transition-colors"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-subtle)' 
                  }}
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-3">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Posting as <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{user.user_metadata.full_name || user.email}</span>
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    className="flex items-center justify-center p-2 rounded-lg bg-[#22D3EE] text-black disabled:opacity-50 disabled:cursor-not-allowed transition-transform hover:scale-105 active:scale-95"
                  >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>
              </div>
              <button 
                type="button" 
                onClick={handleSignOut}
                className="flex items-center gap-2 mt-3 text-xs font-medium hover:underline"
                style={{ color: 'var(--text-muted)' }}
              >
                <LogOut size={12} /> Sign out
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {isLoadingComments ? (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin" style={{ color: 'var(--accent-1)' }} />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <img 
                src={comment.user_avatar} 
                alt={comment.user_name} 
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <div 
                  className="rounded-2xl p-4 inline-block w-full sm:w-auto min-w-[200px]"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {comment.user_name}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div 
            className="rounded-[20px] p-6 text-center"
            style={{ 
              border: '1px dashed var(--border-subtle)',
              backgroundColor: 'rgba(255,255,255,0.02)'
            }}
          >
            <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              No comments yet. Be the first to start the conversation!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
