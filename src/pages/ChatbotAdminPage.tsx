  const defaultSettings = {
    botName: 'Controva AI Assistant',
    tone: 'professional',
  };import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  MessageSquare,
  Users,
  Settings,
  BookOpen,
  Phone,
  CheckCircle,
  Search,
  ChevronRight,
  BarChart3,
  Mail,
  Star,
  AlertCircle,
  Brain,
} from 'lucide-react';
import type { LeadRecord, KnowledgeEntry } from '@/types/chatbot';
import { getAllLeads, updateLeadStatus } from '@/lib/chatbot-leads';
import { getAllKnowledge } from '@/data/chatbot-knowledge';
import { testWhatsAppConfig } from '@/lib/whatsapp';
import { AI_PROVIDERS, isProviderAvailable, type AIProvider } from '@/lib/ai-providers';
import SEO from '@/components/shared/SEO';

// ============================================================
// CHATBOT ADMIN PANEL
// Password-protected admin for managing chatbot
// ============================================================

type AdminTab = 'dashboard' | 'leads' | 'knowledge' | 'conversations' | 'settings';

const TABS = [
  { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: BarChart3 },
  { id: 'leads' as AdminTab, label: 'Leads', icon: Users },
  { id: 'knowledge' as AdminTab, label: 'Knowledge Base', icon: BookOpen },
  { id: 'settings' as AdminTab, label: 'Settings', icon: Settings },
];

const ADMIN_PASSWORD = 'controva2026';
const SESSION_KEY = 'chatbot_admin_auth';

export default function ChatbotAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [knowledge, setKnowledge] = useState<KnowledgeEntry[]>([]);
  const [_isLoading, _setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(() => {
    const saved = localStorage.getItem('controva_ai_provider') as AIProvider | null;
    return saved || 'fallback';
  });

  // Load data
  useEffect(() => {
    if (!isAuthenticated) return;
    loadData();
  }, [isAuthenticated]);

  const loadData = async () => {
    _setIsLoading(true);
    const [leadsData, knowledgeData] = await Promise.all([
      getAllLeads(),
      Promise.resolve(getAllKnowledge()),
    ]);
    setLeads(leadsData);
    setKnowledge(knowledgeData);
    _setIsLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleStatusChange = async (leadId: string, status: LeadRecord['status']) => {
    const success = await updateLeadStatus(leadId, status);
    if (success) {
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status } : l))
      );
    }
  };

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      searchQuery === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.interest?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === 'new').length,
    convertedLeads: leads.filter((l) => l.status === 'converted').length,
    avgLeadScore: leads.length > 0 ? Math.round(leads.reduce((a, l) => a + l.leadScore, 0) / leads.length) : 0,
  };

  // Status badge colors
  const statusColors: Record<string, { bg: string; text: string }> = {
    new: { bg: '#DBEAFE', text: '#1E40AF' },
    contacted: { bg: '#FEF3C7', text: '#92400E' },
    qualified: { bg: '#D1FAE5', text: '#065F46' },
    converted: { bg: '#DCFCE7', text: '#15803D' },
    lost: { bg: '#FEE2E2', text: '#991B1B' },
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <SEO title="AI Chatbot Admin | Controva LLC" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-2xl"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'var(--accent-gradient)' }}
            >
              <Bot size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
              AI Chatbot Admin
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              Enter password to access the chatbot management panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: `1px solid ${error ? '#EF4444' : 'var(--border-subtle)'}`,
                  color: 'var(--text-primary)',
                }}
                autoFocus
              />
              {error && (
                <p className="text-xs mt-1.5 text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'var(--accent-gradient)' }}
            >
              Access Admin Panel
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO title="AI Chatbot Admin | Controva LLC" />

      {/* Header */}
      <div
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-gradient)' }}
          >
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display" style={{ color: 'var(--text-primary)' }}>
              AI Chatbot Admin
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Manage your chatbot, leads, and knowledge base
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem(SESSION_KEY);
            setIsAuthenticated(false);
          }}
          className="text-sm px-4 py-2 rounded-lg transition-colors"
          style={{ color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}
        >
          Log Out
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className="w-64 min-h-screen sticky top-0 hidden md:block"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border-subtle)',
          }}
        >
          <nav className="p-4 space-y-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: isActive ? 'var(--accent-subtle)' : 'transparent',
                    color: isActive ? 'var(--accent-1)' : 'var(--text-secondary)',
                  }}
                >
                  <Icon size={18} />
                  {tab.label}
                  {tab.id === 'leads' && stats.newLeads > 0 && (
                    <span
                      className="ml-auto text-xs px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: 'var(--accent-1)' }}
                    >
                      {stats.newLeads}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Tab Selector */}
        <div className="md:hidden w-full p-4">
          <div className="flex gap-2 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
                  style={{
                    backgroundColor: isActive ? 'var(--accent-subtle)' : 'var(--bg-tertiary)',
                    color: isActive ? 'var(--accent-1)' : 'var(--text-secondary)',
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                Dashboard Overview
              </h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'var(--accent-1)' },
                  { label: 'New Leads', value: stats.newLeads, icon: MessageSquare, color: '#10B981' },
                  { label: 'Converted', value: stats.convertedLeads, icon: CheckCircle, color: '#059669' },
                  { label: 'Avg Lead Score', value: `${stats.avgLeadScore}/10`, icon: Star, color: '#F59E0B' },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className="p-5 rounded-xl"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Icon size={20} style={{ color: stat.color }} />
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          All time
                        </span>
                      </div>
                      <p className="text-2xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                        {stat.value}
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Lead Pipeline */}
              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <h3 className="text-lg font-semibold font-display mb-4" style={{ color: 'var(--text-primary)' }}>
                  Lead Pipeline
                </h3>
                <div className="flex items-center gap-2">
                  {['new', 'contacted', 'qualified', 'converted', 'lost'].map((status, i, arr) => {
                    const count = leads.filter((l) => l.status === status).length;
                    const colors = statusColors[status] || { bg: '#F3F4F6', text: '#374151' };
                    return (
                      <div key={status} className="flex-1 flex items-center">
                        <div className="flex-1 text-center">
                          <div
                            className="py-3 rounded-lg mb-2"
                            style={{ backgroundColor: colors.bg }}
                          >
                            <p className="text-lg font-bold" style={{ color: colors.text }}>
                              {count}
                            </p>
                          </div>
                          <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>
                            {status}
                          </p>
                        </div>
                        {i < arr.length - 1 && (
                          <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Leads */}
              {leads.length > 0 && (
                <div
                  className="p-6 rounded-xl"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <h3 className="text-lg font-semibold font-display mb-4" style={{ color: 'var(--text-primary)' }}>
                    Recent Leads
                  </h3>
                  <div className="space-y-3">
                    {leads.slice(0, 5).map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between p-3 rounded-lg"
                        style={{ backgroundColor: 'var(--bg-primary)' }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                            style={{
                              backgroundColor: statusColors[lead.status]?.bg || '#F3F4F6',
                              color: statusColors[lead.status]?.text || '#374151',
                            }}
                          >
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                              {lead.name}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                              {lead.email} • {lead.interest || 'No interest specified'}
                            </p>
                          </div>
                        </div>
                        <span
                          className="text-xs px-2 py-1 rounded-full capitalize"
                          style={{
                            backgroundColor: statusColors[lead.status]?.bg || '#F3F4F6',
                            color: statusColors[lead.status]?.text || '#374151',
                          }}
                        >
                          {lead.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* LEADS TAB */}
          {activeTab === 'leads' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                  Lead Management
                </h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      placeholder="Search leads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 rounded-xl text-sm outline-none"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
              </div>

              {filteredLeads.length === 0 ? (
                <div
                  className="p-12 text-center rounded-xl"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <Users size={40} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                  <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                    No leads yet
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                    Leads captured by the chatbot will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold"
                            style={{
                              backgroundColor: statusColors[lead.status]?.bg || '#F3F4F6',
                              color: statusColors[lead.status]?.text || '#374151',
                            }}
                          >
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                              {lead.name}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                <Mail size={11} />
                                {lead.email}
                              </span>
                              {lead.phone && (
                                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                  <Phone size={11} />
                                  {lead.phone}
                                </span>
                              )}
                              <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                                <Star size={11} />
                                Score: {lead.leadScore}/10
                              </span>
                            </div>
                            {lead.interest && (
                              <p className="text-xs mt-1" style={{ color: 'var(--accent-1)' }}>
                                Interest: {lead.interest}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadRecord['status'])}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium outline-none cursor-pointer"
                            style={{
                              backgroundColor: statusColors[lead.status]?.bg || '#F3F4F6',
                              color: statusColors[lead.status]?.text || '#374151',
                              border: 'none',
                            }}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                          </select>
                          <span
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: lead.whatsappNotified ? '#D1FAE5' : '#FEE2E2',
                              color: lead.whatsappNotified ? '#065F46' : '#991B1B',
                            }}
                          >
                            {lead.whatsappNotified ? 'WhatsApp ✓' : 'No WhatsApp'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* KNOWLEDGE BASE TAB */}
          {activeTab === 'knowledge' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                  Knowledge Base
                </h2>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {knowledge.length} entries
                </span>
              </div>

              <div className="grid gap-3">
                {knowledge.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium"
                            style={{
                              backgroundColor: 'var(--accent-subtle)',
                              color: 'var(--accent-1)',
                            }}
                          >
                            {entry.category}
                          </span>
                        </div>
                        <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                          {entry.title}
                        </h3>
                        <p className="text-sm line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                          {entry.content}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {entry.keywords.map((kw, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: 'var(--bg-tertiary)',
                                color: 'var(--text-muted)',
                              }}
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-2xl"
            >
              <h2 className="text-xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                Chatbot Settings
              </h2>

              {/* WhatsApp Configuration */}
              <div
                className="p-6 rounded-xl space-y-4"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Phone size={20} style={{ color: 'var(--accent-1)' }} />
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    WhatsApp Configuration
                  </h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                      CallMeBot Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="+1234567890"
                      defaultValue={import.meta.env.VITE_WHATSAPP_CALLMEBOT_PHONE || ''}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                      }}
                      readOnly
                    />
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      Set via VITE_WHATSAPP_CALLMEBOT_PHONE environment variable
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                      CallMeBot API Key
                    </label>
                    <input
                      type="password"
                      placeholder="Your CallMeBot API Key"
                      defaultValue={import.meta.env.VITE_WHATSAPP_CALLMEBOT_APIKEY ? '••••••••' : ''}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                      }}
                      readOnly
                    />
                  </div>

                  <button
                    onClick={async () => {
                      const result = await testWhatsAppConfig('callmebot');
                      alert(result.message);
                    }}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
                    style={{ background: 'var(--accent-gradient)' }}
                  >
                    Test WhatsApp Connection
                  </button>
                </div>
              </div>

              {/* OpenAI Configuration */}
              <div
                className="p-6 rounded-xl space-y-4"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Bot size={20} style={{ color: 'var(--accent-1)' }} />
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    OpenAI Configuration
                  </h3>
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                    API Key
                  </label>
                  <input
                    type="password"
                    placeholder="sk-..."
                    defaultValue={import.meta.env.VITE_OPENAI_API_KEY ? '••••••••' : ''}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                    readOnly
                  />
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    Set via VITE_OPENAI_API_KEY environment variable. Model: gpt-4o-mini
                  </p>
                </div>
              </div>

              {/* AI Provider Selection */}
              <div
                className="p-6 rounded-xl space-y-4"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Brain size={20} style={{ color: 'var(--accent-1)' }} />
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    AI Provider
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {AI_PROVIDERS.map((provider) => {
                    const isAvailable = isProviderAvailable(provider.id);
                    const isSelected = selectedProvider === provider.id;
                    return (
                      <button
                        key={provider.id}
                        onClick={() => {
                          if (isAvailable) {
                            setSelectedProvider(provider.id);
                            localStorage.setItem('controva_ai_provider', provider.id);
                          }
                        }}
                        disabled={!isAvailable}
                        className="p-4 rounded-xl text-left transition-all border-2"
                        style={{
                          backgroundColor: isSelected ? 'var(--accent-subtle)' : 'var(--bg-primary)',
                          borderColor: isSelected ? 'var(--accent-1)' : 'var(--border-subtle)',
                          opacity: isAvailable ? 1 : 0.5,
                          cursor: isAvailable ? 'pointer' : 'not-allowed',
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {provider.name}
                          </span>
                          {isSelected && (
                            <span
                              className="text-[10px] px-1.5 py-0.5 rounded-full text-white"
                              style={{ backgroundColor: 'var(--accent-1)' }}
                            >
                              Active
                            </span>
                          )}
                          {!isAvailable && (
                            <span
                              className="text-[10px] px-1.5 py-0.5 rounded-full"
                              style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}
                            >
                              No API Key
                            </span>
                          )}
                        </div>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {provider.description}
                        </p>
                        <p className="text-[10px] mt-1.5" style={{ color: 'var(--text-muted)' }}>
                          Model: {provider.model}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {selectedProvider === 'fallback' && (
                  <div
                    className="p-3 rounded-lg text-sm flex items-center gap-2"
                    style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                  >
                    <AlertCircle size={16} />
                    No AI provider is configured. The chatbot will use the fallback (rule-based) engine only. Add at least one API key to enable AI responses.
                  </div>
                )}
              </div>

              {/* Bot Personality */}
              <div
                className="p-6 rounded-xl space-y-4"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Settings size={20} style={{ color: 'var(--accent-1)' }} />
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Bot Personality
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                      Bot Name
                    </label>
                    <input
                      type="text"
                      defaultValue={defaultSettings.botName}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                      }}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                      Tone
                    </label>
                    <input
                      type="text"
                      defaultValue={defaultSettings.tone}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                      style={{
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                      }}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
