import { NextResponse } from "next/server";
import { getLLMProvider } from "@/lib/llm";

// MBTI validation function
const validateMBTI = (mbti) => {
  const validTypes = [
    "ISTJ",
    "ISFJ",
    "INFJ",
    "INTJ",
    "ISTP",
    "ISFP",
    "INFP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFP",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "ENFJ",
    "ENTJ",
  ];

  if (!validTypes.includes(mbti.toUpperCase())) {
    return { valid: false, error: "Invalid MBTI type" };
  }
  return { valid: true };
};

export async function POST(request) {
  const { mbti, provider = "gemini" } = await request.json();

  // Validate input
  if (!mbti) {
    return NextResponse.json(
      { message: "MBTI type is required" },
      { status: 400 }
    );
  }

  const validation = validateMBTI(mbti);
  if (!validation.valid) {
    return NextResponse.json({ message: validation.error }, { status: 400 });
  }

  try {
    // Get LLM provider
    const llm = getLLMProvider(
      provider,
      process.env[`${provider.toUpperCase()}_API_KEY`]
    );

    // Generate prompt
    const systemMessage = `Provide exactly 3 birthday gift suggestions for MBTI type. Format: 
    1. Suggestion 1
    2. Suggestion 2
    3. Suggestion 3`;
    const prompt = `Suggest gifts for ${mbti} personality type.`;

    // Get response
    const rawResponse = await llm.generate(prompt, systemMessage);
    const suggestions = rawResponse
      .split("\n")
      .filter((line) => /^\d+\./.test(line.trim()))
      .slice(0, 3)
      .map((line) => line.replace(/^\d+\.\s*/, "").trim());

    return NextResponse.json({ suggestions });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to generate suggestions" },
      { status: 500 }
    );
  }
}
