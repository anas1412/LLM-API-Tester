import OpenAI from "openai";

export function generateDeepSeekResponse(apiKey, prompt, systemMessage) {
  const client = new OpenAI({
    baseURL: "https://api.deepseek.com", // DeepSeek API base URL
    apiKey: apiKey, // DeepSeek API key
  });

  return client.chat.completions
    .create({
      model: "deepseek-chat", // Use "deepseek-chat" for DeepSeek-V3
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
    })
    .then((response) => {
      if (response.choices && response.choices.length > 0) {
        return response.choices[0].message.content;
      }
      throw new Error("No response from DeepSeek");
    });
}
