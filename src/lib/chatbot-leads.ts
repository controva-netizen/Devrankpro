import { supabase } from '@/lib/supabase';
import type { LeadData, LeadRecord } from '@/types/chatbot';
import { sendWhatsAppNotification } from '@/lib/whatsapp';

// ============================================================
// LEAD MANAGEMENT
// Store leads in Supabase + send WhatsApp notifications
// ============================================================

// Store lead in Supabase
export async function storeLead(
  leadData: LeadData,
  conversationId: string
): Promise<{ success: boolean; lead?: LeadRecord; error?: string }> {
  try {
    const leadScore = calculateLeadScore(leadData);

    const { data, error } = await supabase
      .from('chatbot_leads')
      .insert([
        {
          conversation_id: conversationId,
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone || null,
          interest: leadData.interest || null,
          budget: leadData.budget || null,
          timeline: leadData.timeline || null,
          notes: leadData.notes || null,
          lead_score: leadScore,
          status: 'new',
          whatsapp_notified: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error storing lead:', error);
      // Don't fail the user experience if Supabase is down
      return { success: false, error: error.message };
    }

    const lead: LeadRecord = {
      id: data.id,
      conversationId: data.conversation_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      interest: data.interest,
      budget: data.budget,
      timeline: data.timeline,
      notes: data.notes,
      leadScore: data.lead_score,
      status: data.status,
      whatsappNotified: data.whatsapp_notified,
      createdAt: data.created_at,
    };

    return { success: true, lead };
  } catch (err) {
    console.error('Exception storing lead:', err);
    return { success: false, error: 'Failed to store lead' };
  }
}

// Send WhatsApp notification for lead
export async function notifyLeadViaWhatsApp(
  leadData: LeadData,
  conversationId: string,
  messages: { text: string; sender: string }[]
): Promise<{ success: boolean; provider?: string; error?: string }> {
  const result = await sendWhatsAppNotification(leadData, messages);

  if (result.success && result.provider !== 'none') {
    // Update lead record to mark as notified
    try {
      await supabase
        .from('chatbot_leads')
        .update({ whatsapp_notified: true })
        .eq('conversation_id', conversationId);
    } catch (e) {
      console.error('Error updating lead notification status:', e);
    }
  }

  return result;
}

// Get all leads
export async function getAllLeads(): Promise<LeadRecord[]> {
  try {
    const { data, error } = await supabase
      .from('chatbot_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      return [];
    }

    return (data || []).map((row) => ({
      id: row.id,
      conversationId: row.conversation_id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      interest: row.interest,
      budget: row.budget,
      timeline: row.timeline,
      notes: row.notes,
      leadScore: row.lead_score,
      status: row.status,
      whatsappNotified: row.whatsapp_notified,
      createdAt: row.created_at,
    }));
  } catch (err) {
    console.error('Exception fetching leads:', err);
    return [];
  }
}

// Update lead status
export async function updateLeadStatus(
  leadId: string,
  status: LeadRecord['status']
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('chatbot_leads')
      .update({ status })
      .eq('id', leadId);

    if (error) {
      console.error('Error updating lead status:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Exception updating lead status:', err);
    return false;
  }
}

// Calculate lead score
function calculateLeadScore(leadData: LeadData): number {
  let score = 0;
  if (leadData.name && leadData.name.length >= 2) score += 2;
  if (leadData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadData.email)) score += 3;
  if (leadData.phone && leadData.phone.length >= 7) score += 2;
  if (leadData.interest && leadData.interest.length >= 2) score += 2;
  if (leadData.budget) score += 1;
  return score;
}
