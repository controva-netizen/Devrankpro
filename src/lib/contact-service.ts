export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
  source: string;
  botcheck?: string;
}

export interface ContactResult {
  success: boolean;
  message: string;
}

const BUDGET_MAP: Record<string, string> = {
  lt5k: '< $5,000',
  '5k-10k': '$5,000 - $10,000',
  '10k-25k': '$10,000 - $25,000',
  gt25k: '$25,000+',
};

export async function sendContactInquiry(data: ContactFormData): Promise<ContactResult> {
  // 1. Silent drop for bot submissions
  if (data.botcheck && data.botcheck.trim() !== '') {
    return { success: true, message: 'Message sent successfully.' };
  }

  const budgetLabel = BUDGET_MAP[data.budget] || data.budget || 'Not specified';
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  // 2. Try Web3Forms if API key is provided in .env
  if (web3Key && web3Key.trim() !== '') {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3Key,
          name: data.name,
          email: data.email,
          company: data.company || 'Not specified',
          budget: budgetLabel,
          message: data.message,
          source: data.source || 'Website',
          from_name: 'Controva LLC Website',
          subject: `🚨 New Lead: ${data.name} (${data.company || 'Individual'})`,
        }),
      });

      const resData = await res.json();
      if (res.ok && (resData.success === true || resData.success === 'true')) {
        return {
          success: true,
          message: 'Thank you! Your message has been sent. We will get back to you within 4 business hours.',
        };
      }
    } catch (e) {
      console.warn('Web3Forms delivery failed, trying fallback provider...', e);
    }
  }

  // 3. Try Hostinger Apache native PHP mailer (/api/contact.php)
  try {
    const phpRes = await fetch('/api/contact.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        company: data.company,
        budget: data.budget,
        message: data.message,
        source: data.source,
      }),
    });

    if (phpRes.ok) {
      const phpData = await phpRes.json().catch(() => null);
      if (phpData && phpData.success) {
        return {
          success: true,
          message: phpData.message || 'Thank you! Your message has been sent. We will respond within 4 business hours.',
        };
      }
    }
  } catch (e) {
    console.warn('Local PHP endpoint not reachable, trying FormSubmit fallback...', e);
  }

  // 4. Try FormSubmit AJAX delivery to support@controvallc.com
  try {
    const fsRes = await fetch('https://formsubmit.co/ajax/support@controvallc.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        Name: data.name,
        Email: data.email,
        Company: data.company || 'Not specified',
        Budget: budgetLabel,
        Message: data.message,
        'Heard From': data.source || 'Website',
        _subject: `🚨 New Lead: ${data.name} - Controva Website`,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const fsData = await fsRes.json().catch(() => null);
    if (fsRes.ok && fsData && (fsData.success === true || fsData.success === 'true')) {
      return {
        success: true,
        message: 'Thank you! Your message has been sent. We will respond within 4 business hours.',
      };
    }

    // If FormSubmit requires 1-time activation
    if (fsData && fsData.message && fsData.message.includes('Activation')) {
      return {
        success: true,
        message: 'Thank you! Your inquiry was recorded. (Note: Check support@controvallc.com to confirm form activation).',
      };
    }
  } catch (e) {
    console.error('All automated email endpoints failed:', e);
  }

  return {
    success: false,
    message: 'Unable to send message right now. Please email us directly at support@controvallc.com.',
  };
}
