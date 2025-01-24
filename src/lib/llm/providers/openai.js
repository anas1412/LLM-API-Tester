import OpenAI from "openai";

export function generateOpenAIResponse(apiKey, prompt, systemMessage) {
  const client = new OpenAI({
    apiKey: apiKey, // OpenAI API key
  });

  return client.chat.completions
    .create({
      model: "gpt-3.5-turbo", // or "gpt-4"
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
    })
    .then((response) => {
      if (response.choices && response.choices.length > 0) {
        return response.choices[0].message.content;
      }
      throw new Error("No response from OpenAI");
    });
}
