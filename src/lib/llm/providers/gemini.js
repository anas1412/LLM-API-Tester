import OpenAI from "openai";

export function generateGeminiResponse(apiKey, prompt, systemMessage) {
  const client = new OpenAI({
    apiKey,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });

  return client.chat.completions
    .create({
      model: "gemini-2.0-flash-exp",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
    })
    .then((response) => response.choices[0].message.content);
}
