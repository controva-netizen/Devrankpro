import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { blogPosts as seedPosts, type BlogPost } from '@/data/blog';
import { supabase } from '@/lib/supabase';

interface BlogContextType {
  posts: BlogPost[];
  loading: boolean;
  addPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updatePost: (id: string, post: Omit<BlogPost, 'id'>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

const BlogContext = createContext<BlogContextType | null>(null);

export function BlogProvider({ children }: { children: ReactNode }) {
  // Seed posts are available synchronously so the very first render (including
  // build-time prerendering, where effects never run) already has real content
  // instead of a "Loading..." placeholder. Supabase posts are merged in later.
  const [posts, setPosts] = useState<BlogPost[]>(() =>
    [...seedPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  );
  // Only wait on the network when the visitor lands directly on a post that is
  // not in the seed data (i.e. a Supabase-only post); otherwise render at once.
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined' || !supabase) return false;
    const m = window.location.pathname.match(/^\/blog\/([^/]+)/);
    return !!m && !seedPosts.some((p) => p.slug === m[1]);
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    if (!supabase) {
      setPosts(seedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*');

    if (error) {
      console.error('Error fetching posts:', error);
      // Fallback to seed posts if Supabase fails (e.g. table not created yet)
      setPosts(seedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } else {
      if (data && data.length > 0) {
        // Merge Supabase posts with the seed posts
        const allPosts = [...(data as BlogPost[]), ...seedPosts];
        // Sort by date manually since date is a string (e.g., 'Jul 02, 2026')
        const sorted = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(sorted);
      } else {
        // If table is empty, fallback to seedPosts for initial display
        setPosts(seedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      }
    }
    setLoading(false);
  };

  const addPost = async (post: Omit<BlogPost, 'id'>) => {
    if (!supabase) {
      alert('Blog storage is not configured (missing Supabase environment variables).');
      return;
    }
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();

    if (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post. Please ensure you created the Supabase table.');
      return;
    }
    if (data) {
      setPosts((prev) => {
        const next = [data as BlogPost, ...prev];
        return next.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
    }
  };

  const updatePost = async (id: string, updated: Omit<BlogPost, 'id'>) => {
    // Basic check for seed post IDs (1, 2, 3...) which aren't valid UUIDs
    if (id.length < 10) {
      alert('Cannot update a hardcoded seed post. Please create a new post.');
      return;
    }
    if (!supabase) {
      alert('Blog storage is not configured (missing Supabase environment variables).');
      return;
    }

    const { error } = await supabase
      .from('blog_posts')
      .update(updated)
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post.');
      return;
    }
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deletePost = async (id: string) => {
    if (id.length < 10) {
      alert('Cannot delete a hardcoded seed post. Please remove it from src/data/blog.ts manually.');
      return;
    }
    if (!supabase) {
      alert('Blog storage is not configured (missing Supabase environment variables).');
      return;
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post.');
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <BlogContext.Provider value={{ posts, loading, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error('useBlog must be used inside BlogProvider');
  return ctx;
}
