import type { LeadData } from '@/types/chatbot';

// ============================================================
// WHATSAPP INTEGRATION
// Dual provider: CallMeBot (free) + WhatsApp Business API (official)
// ============================================================

// CallMeBot Configuration
const CALLMEBOT_PHONE = import.meta.env.VITE_WHATSAPP_CALLMEBOT_PHONE || '';
const CALLMEBOT_APIKEY = import.meta.env.VITE_WHATSAPP_CALLMEBOT_APIKEY || '';

// WhatsApp Business API Configuration
const WHATSAPP_BUSINESS_PHONE_ID = import.meta.env.VITE_WHATSAPP_BUSINESS_PHONE_ID || '';
const WHATSAPP_BUSINESS_ACCESS_TOKEN = import.meta.env.VITE_WHATSAPP_BUSINESS_ACCESS_TOKEN || '';

export type WhatsAppProvider = 'callmebot' | 'whatsapp_business' | 'none';

// Get active provider
export function getActiveProvider(): WhatsAppProvider {
  if (WHATSAPP_BUSINESS_PHONE_ID && WHATSAPP_BUSINESS_ACCESS_TOKEN) {
    return 'whatsapp_business';
  }
  if (CALLMEBOT_PHONE && CALLMEBOT_APIKEY) {
    return 'callmebot';
  }
  return 'none';
}

// Format lead notification message
export function formatLeadMessage(leadData: LeadData, conversationSummary: string): string {
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const score = calculateLeadScore(leadData);

  return `🚨 NEW LEAD - Controva AI Chatbot

👤 Name: ${leadData.name}
📧 Email: ${leadData.email}
📱 Phone: ${leadData.phone || 'Not provided'}
💼 Interest: ${leadData.interest || 'Not specified'}
⭐ Lead Score: ${score}/10
📅 Captured: ${timestamp}

💬 Conversation Summary:
${conversationSummary}

🔗 Respond ASAP - 78% of customers buy from the first responder!`;
}

// Calculate lead score
function calculateLeadScore(leadData: LeadData): number {
  let score = 0;
  if (leadData.name) score += 2;
  if (leadData.email) score += 3;
  if (leadData.phone) score += 2;
  if (leadData.interest) score += 2;
  if (leadData.budget) score += 1;
  return score;
}

// Generate conversation summary from messages
export function generateConversationSummary(messages: { text: string; sender: string }[]): string {
  const userMessages = messages.filter((m) => m.sender === 'user');
  if (userMessages.length === 0) return 'No conversation history';

  const summary = userMessages
    .map((m) => `- ${m.text}`)
    .join('\n');

  return summary.length > 500 ? summary.slice(0, 500) + '...' : summary;
}

// Send WhatsApp notification via CallMeBot
async function sendViaCallMeBot(message: string): Promise<boolean> {
  if (!CALLMEBOT_PHONE || !CALLMEBOT_APIKEY) {
    console.warn('CallMeBot not configured');
    return false;
  }

  try {
    const url = new URL('https://api.callmebot.com/whatsapp.php');
    url.searchParams.set('phone', CALLMEBOT_PHONE.replace(/\+/g, ''));
    url.searchParams.set('apikey', CALLMEBOT_APIKEY);
    url.searchParams.set('text', message);

    const response = await fetch(url.toString(), {
      method: 'GET',
      // CallMeBot uses GET with query params
    });

    if (response.ok) {
      console.log('WhatsApp notification sent via CallMeBot');
      return true;
    } else {
      console.error('CallMeBot failed:', response.status, await response.text());
      return false;
    }
  } catch (error) {
    console.error('CallMeBot error:', error);
    return false;
  }
}

// Send WhatsApp notification via Business API
async function sendViaBusinessAPI(phoneNumber: string, message: string): Promise<boolean> {
  if (!WHATSAPP_BUSINESS_PHONE_ID || !WHATSAPP_BUSINESS_ACCESS_TOKEN) {
    console.warn('WhatsApp Business API not configured');
    return false;
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${WHATSAPP_BUSINESS_PHONE_ID}/messages`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${WHATSAPP_BUSINESS_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phoneNumber,
        type: 'text',
        text: { body: message },
      }),
    });

    if (response.ok) {
      console.log('WhatsApp notification sent via Business API');
      return true;
    } else {
      const errorData = await response.json();
      console.error('WhatsApp Business API failed:', errorData);
      return false;
    }
  } catch (error) {
    console.error('WhatsApp Business API error:', error);
    return false;
  }
}

// Main send function - tries primary provider, falls back to secondary
export async function sendWhatsAppNotification(
  leadData: LeadData,
  messages: { text: string; sender: string }[]
): Promise<{ success: boolean; provider: WhatsAppProvider; error?: string }> {
  const provider = getActiveProvider();

  if (provider === 'none') {
    console.warn('No WhatsApp provider configured');
    return { success: false, provider: 'none', error: 'No WhatsApp provider configured' };
  }

  const summary = generateConversationSummary(messages);
  const message = formatLeadMessage(leadData, summary);

  let success = false;

  if (provider === 'whatsapp_business') {
    success = await sendViaBusinessAPI(leadData.phone || CALLMEBOT_PHONE, message);
    if (!success) {
      // Fallback to CallMeBot
      console.log('Trying CallMeBot fallback...');
      success = await sendViaCallMeBot(message);
      if (success) {
        return { success: true, provider: 'callmebot' };
      }
    }
  } else {
    success = await sendViaCallMeBot(message);
  }

  if (success) {
    return { success: true, provider };
  } else {
    return { success: false, provider, error: 'Failed to send WhatsApp notification' };
  }
}

// Test WhatsApp configuration
export async function testWhatsAppConfig(provider: WhatsAppProvider): Promise<{ success: boolean; message: string }> {
  if (provider === 'callmebot') {
    if (!CALLMEBOT_PHONE || !CALLMEBOT_APIKEY) {
      return { success: false, message: 'CallMeBot phone or API key not configured' };
    }
    const testMsg = '🤖 Controva AI Chatbot test message. Your WhatsApp integration is working!';
    const success = await sendViaCallMeBot(testMsg);
    return {
      success,
      message: success ? 'Test message sent successfully!' : 'Failed to send test message. Check your CallMeBot configuration.',
    };
  }

  if (provider === 'whatsapp_business') {
    if (!WHATSAPP_BUSINESS_PHONE_ID || !WHATSAPP_BUSINESS_ACCESS_TOKEN) {
      return { success: false, message: 'WhatsApp Business API credentials not configured' };
    }
    return { success: true, message: 'WhatsApp Business API is configured. Test via Meta dashboard.' };
  }

  return { success: false, message: 'No WhatsApp provider selected' };
}
