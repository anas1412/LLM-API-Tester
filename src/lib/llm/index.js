const providers = {
  gemini: (apiKey) => ({
    generate: async (prompt, systemMessage) => {
      const { generateGeminiResponse } = await import("./providers/gemini");
      return generateGeminiResponse(apiKey, prompt, systemMessage);
    },
  }),
  deepseek: (apiKey) => ({
    generate: async (prompt, systemMessage) => {
      const { generateDeepSeekResponse } = await import("./providers/deepseek");
      return generateDeepSeekResponse(apiKey, prompt, systemMessage);
    },
  }),
  openai: (apiKey) => ({
    generate: async (prompt, systemMessage) => {
      const { generateOpenAIResponse } = await import("./providers/openai");
      return generateOpenAIResponse(apiKey, prompt, systemMessage);
    },
  }),
  anthropic: (apiKey) => ({
    generate: async (prompt, systemMessage) => {
      const { generateAnthropicResponse } = await import(
        "./providers/anthropic"
      );
      return generateAnthropicResponse(apiKey, prompt, systemMessage);
    },
  }),
};

export function getLLMProvider(providerName, apiKey) {
  const provider = providers[providerName.toLowerCase()];
  if (!provider) throw new Error(`Unsupported provider: ${providerName}`);
  return provider(apiKey);
}
