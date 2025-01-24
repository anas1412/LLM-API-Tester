import { NextResponse } from "next/server";
import { getLLMProvider } from "@/lib/llm";

// Helper function to get zodiac sign from birth date
const getZodiacSign = (month, day) => {
  const dates = [
    [20, "Capricorn", "Aquarius"],
    [19, "Aquarius", "Pisces"],
    [20, "Pisces", "Aries"],
    [20, "Aries", "Taurus"],
    [21, "Taurus", "Gemini"],
    [21, "Gemini", "Cancer"],
    [22, "Cancer", "Leo"],
    [23, "Leo", "Virgo"],
    [23, "Virgo", "Libra"],
    [23, "Libra", "Scorpio"],
    [22, "Scorpio", "Sagittarius"],
    [22, "Sagittarius", "Capricorn"],
  ];

  const [m, d] = [parseInt(month), parseInt(day)];
  return dates[m][d <= dates[m][0] ? 1 : 2];
};

// Birth date validation function
const validateBirthDate = (birthDate) => {
  const [year, month, day] = birthDate.split("-");
  if (!year || !month || !day) {
    return { valid: false, error: "Invalid date format. Use YYYY-MM-DD." };
  }

  const date = new Date(birthDate);
  if (isNaN(date.getTime())) {
    return { valid: false, error: "Invalid date" };
  }

  const zodiac = getZodiacSign(month - 1, day);
  if (!zodiac) {
    return { valid: false, error: "Unable to determine zodiac sign" };
  }

  return { valid: true, zodiac };
};

export async function POST(request) {
  const { birthDate, provider = "gemini" } = await request.json();

  // Validate input
  if (!birthDate) {
    return NextResponse.json(
      { message: "Birth date is required" },
      { status: 400 }
    );
  }

  const validation = validateBirthDate(birthDate);
  if (!validation.valid) {
    return NextResponse.json({ message: validation.error }, { status: 400 });
  }

  try {
    const zodiac = validation.zodiac;

    // Get LLM provider
    const llm = getLLMProvider(
      provider,
      process.env[`${provider.toUpperCase()}_API_KEY`]
    );

    // Generate prompt
    const systemMessage = `Provide exactly 3 birthday gift suggestions for zodiac signs. Format:
    1. Suggestion 1
    2. Suggestion 2
    3. Suggestion 3`;
    const prompt = `Suggest gifts for ${zodiac} zodiac sign.`;

    // Get response
    const rawResponse = await llm.generate(prompt, systemMessage);
    const suggestions = rawResponse
      .split("\n")
      .filter((line) => /^\d+\./.test(line.trim()))
      .slice(0, 3)
      .map((line) => line.replace(/^\d+\.\s*/, "").trim());

    return NextResponse.json({ suggestions, zodiac });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to generate suggestions" },
      { status: 500 }
    );
  }
}
