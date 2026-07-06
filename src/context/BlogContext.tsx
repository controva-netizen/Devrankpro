import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { blogPosts as seedPosts, type BlogPost } from '@/data/blog';

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: string, post: Omit<BlogPost, 'id'>) => void;
  deletePost: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | null>(null);

const STORAGE_KEY = 'controva_blog_posts';

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as BlogPost[];
        return parsed.map((p) => {
          const seed = seedPosts.find((s) => s.id === p.id);
          // If the cached post is missing content but the seed has it, merge it in.
          if (seed && !p.content && seed.content) {
            return { ...p, content: seed.content };
          }
          return p;
        });
      }
      return seedPosts;
    } catch {
      return seedPosts;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (id: string, updated: Omit<BlogPost, 'id'>) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...updated, id } : p))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error('useBlog must be used inside BlogProvider');
  return ctx;
}
