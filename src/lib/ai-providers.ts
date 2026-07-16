// ============================================================
// AI PROVIDER CONFIGURATION
// Support for multiple LLM APIs: OpenAI, Claude, DeepSeek, Gemini, Llama
// ============================================================

export type AIProvider = 'openai' | 'claude' | 'deepseek' | 'gemini' | 'llama' | 'fallback';

export interface ProviderConfig {
  id: AIProvider;
  name: string;
  model: string;
  apiUrl: string;
  apiKeyEnv: string;
  description: string;
  maxTokens: number;
  temperature: number;
}

export const AI_PROVIDERS: ProviderConfig[] = [
  {
    id: 'openai',
    name: 'OpenAI GPT-4o Mini',
    model: 'gpt-4o-mini',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    apiKeyEnv: 'VITE_OPENAI_API_KEY',
    description: 'Fast, affordable, great for business chatbots',
    maxTokens: 500,
    temperature: 0.3,
  },
  {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    model: 'claude-3-5-sonnet-20241022',
    apiUrl: 'https://api.anthropic.com/v1/messages',
    apiKeyEnv: 'VITE_CLAUDE_API_KEY',
    description: 'Excellent reasoning, long context, very natural',
    maxTokens: 500,
    temperature: 0.3,
  },
  {
    id: 'deepseek',
    name: 'DeepSeek Coder V2',
    model: 'deepseek-coder',
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    apiKeyEnv: 'VITE_DEEPSEEK_API_KEY',
    description: 'Great for technical/code questions, very capable',
    maxTokens: 500,
    temperature: 0.3,
  },
  {
    id: 'gemini',
    name: 'Gemini 3.1 Flash Lite',
    model: 'gemini-3.1-flash-lite',
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    apiKeyEnv: 'VITE_GEMINI_API_KEY',
    description: 'Fast, multimodal, good for general queries',
    maxTokens: 500,
    temperature: 0.3,
  },
  {
    id: 'llama',
    name: 'Llama 4 Maverick',
    model: 'llama-4-maverick-instruct',
    apiUrl: 'https://api.together.xyz/v1/chat/completions',
    apiKeyEnv: 'VITE_LLAMA_API_KEY',
    description: 'Open-source, powerful, great for customization',
    maxTokens: 500,
    temperature: 0.3,
  },
];

// Get active provider from env
export function getActiveProvider(): AIProvider {
  // Check in priority order
  if (import.meta.env.VITE_CLAUDE_API_KEY) return 'claude';
  if (import.meta.env.VITE_DEEPSEEK_API_KEY) return 'deepseek';
  if (import.meta.env.VITE_GEMINI_API_KEY) return 'gemini';
  if (import.meta.env.VITE_LLAMA_API_KEY) return 'llama';
  if (import.meta.env.VITE_OPENAI_API_KEY) return 'openai';
  return 'fallback';
}

// Get preferred AI provider (from localStorage or auto-detect)
export function getPreferredProvider(): AIProvider {
  const saved = localStorage.getItem('controva_ai_provider') as AIProvider | null;
  if (saved && isProviderAvailable(saved)) return saved;
  
  const active = getActiveProvider();
  if (active !== 'fallback') return active;
  
  return 'fallback';
}

// Get provider config
export function getProviderConfig(provider: AIProvider): ProviderConfig | undefined {
  return AI_PROVIDERS.find((p) => p.id === provider);
}

// Get API key for provider
export function getProviderApiKey(provider: AIProvider): string {
  switch (provider) {
    case 'openai':
      return import.meta.env.VITE_OPENAI_API_KEY || '';
    case 'claude':
      return import.meta.env.VITE_CLAUDE_API_KEY || '';
    case 'deepseek':
      return import.meta.env.VITE_DEEPSEEK_API_KEY || '';
    case 'gemini':
      return import.meta.env.VITE_GEMINI_API_KEY || '';
    case 'llama':
      return import.meta.env.VITE_LLAMA_API_KEY || '';
    default:
      return '';
  }
}

// Check if provider is available
export function isProviderAvailable(provider: AIProvider): boolean {
  return getProviderApiKey(provider).length > 10;
}

// Get all available providers
export function getAvailableProviders(): AIProvider[] {
  return AI_PROVIDERS.filter((p) => isProviderAvailable(p.id)).map((p) => p.id);
}

// Build request body for each provider
export function buildRequestBody(
  provider: AIProvider,
  systemPrompt: string,
  messages: { role: string; content: string }[]
): { url: string; headers: Record<string, string>; body: unknown } | null {
  const config = getProviderConfig(provider);
  if (!config) return null;

  const apiKey = getProviderApiKey(provider);
  if (!apiKey) return null;

  switch (provider) {
    case 'openai':
    case 'deepseek':
      return {
        url: config.apiUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: {
          model: config.model,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          temperature: config.temperature,
          max_tokens: config.maxTokens,
          top_p: 0.9,
        },
      };

    case 'claude': {
      // Claude uses a different message format
      const claudeMessages = messages.map((m) => ({
        role: m.role === 'system' ? 'assistant' : m.role,
        content: m.content,
      }));
      return {
        url: config.apiUrl,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: {
          model: config.model,
          max_tokens: config.maxTokens,
          temperature: config.temperature,
          system: systemPrompt,
          messages: claudeMessages,
        },
      };
    }

    case 'gemini': {
      // Gemini uses a different URL structure
      const geminiUrl = `${config.apiUrl}/${config.model}:generateContent?key=${apiKey}`;
      const geminiContents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));
      return {
        url: geminiUrl,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          contents: geminiContents,
          generationConfig: {
            temperature: config.temperature,
            maxOutputTokens: config.maxTokens,
            topP: 0.9,
          },
        },
      };
    }

    case 'llama':
      return {
        url: config.apiUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: {
          model: config.model,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          temperature: config.temperature,
          max_tokens: config.maxTokens,
          top_p: 0.9,
        },
      };

    default:
      return null;
  }
}

// Parse response from each provider
export function parseResponse(provider: AIProvider, data: unknown): string | null {
  if (!data) return null;

  try {
    switch (provider) {
      case 'openai':
      case 'deepseek':
      case 'llama': {
        const openaiData = data as { choices?: { message?: { content?: string } }[] };
        return openaiData.choices?.[0]?.message?.content || null;
      }

      case 'claude': {
        const claudeData = data as { content?: { text?: string }[] };
        return claudeData.content?.[0]?.text || null;
      }

      case 'gemini': {
        const geminiData = data as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
        return geminiData.candidates?.[0]?.content?.parts?.[0]?.text || null;
      }

      default:
        return null;
    }
  } catch {
    return null;
  }
}

// Main call function that works with any provider
export async function callAIProvider(
  provider: AIProvider,
  systemPrompt: string,
  messages: { role: string; content: string }[]
): Promise<string | null> {
  if (provider === 'fallback') return null;

  const request = buildRequestBody(provider, systemPrompt, messages);
  if (!request) return null;

  try {
    const response = await fetch(request.url, {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify(request.body),
    });

    if (!response.ok) {
      console.error(`${provider} API error:`, response.status, await response.text());
      return null;
    }

    const data = await response.json();
    return parseResponse(provider, data);
  } catch (error) {
    console.error(`${provider} API call failed:`, error);
    return null;
  }
}
