import OpenAI from "openai";

export function generateAnthropicResponse(apiKey, prompt, systemMessage) {
  const client = new OpenAI({
    baseURL: "https://api.anthropic.com/v1", // Anthropic API base URL
    apiKey: apiKey, // Anthropic API key
  });

  return client.chat.completions
    .create({
      model: "claude-3.5-sonnet", // Use "claude-3.5-sonnet" for Claude 3.5
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
    })
    .then((response) => {
      if (response.choices && response.choices.length > 0) {
        return response.choices[0].message.content;
      }
      throw new Error("No response from Anthropic");
    });
}
