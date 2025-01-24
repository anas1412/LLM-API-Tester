"use client";
import { useState } from "react";

const MBTI_TYPES = [
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

const LLM_PROVIDERS = [
  { id: "gemini", name: "Google Gemini" },
  { id: "openai", name: "OpenAI" },
  { id: "deepseek", name: "DeepSeek" },
];

export default function Home() {
  const [mbti, setMbti] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [mbtiSuggestions, setMbtiSuggestions] = useState([]);
  const [horoscopeSuggestions, setHoroscopeSuggestions] = useState([]);
  const [zodiac, setZodiac] = useState("");
  const [loading, setLoading] = useState({ mbti: false, horoscope: false });
  const [provider, setProvider] = useState("gemini"); // Default provider
  const [error, setError] = useState({ mbti: null, horoscope: null });

  const handleMbtiSubmit = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, mbti: true }));
    setError((prev) => ({ ...prev, mbti: null }));

    try {
      const response = await fetch("/api/suggestions/mbti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mbti, provider }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch MBTI suggestions"
        );
      }

      const data = await response.json();
      setMbtiSuggestions(data.suggestions);
    } catch (error) {
      setError((prev) => ({ ...prev, mbti: error.message }));
    } finally {
      setLoading((prev) => ({ ...prev, mbti: false }));
    }
  };

  const handleHoroscopeSubmit = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, horoscope: true }));
    setError((prev) => ({ ...prev, horoscope: null }));

    try {
      const response = await fetch("/api/suggestions/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthDate, provider }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch horoscope suggestions"
        );
      }

      const data = await response.json();
      setHoroscopeSuggestions(data.suggestions);
      setZodiac(data.zodiac);
    } catch (error) {
      setError((prev) => ({ ...prev, horoscope: error.message }));
    } finally {
      setLoading((prev) => ({ ...prev, horoscope: false }));
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-foreground">
          LLM API Tester
        </h1>
        <p className="text-center text-gray-600">
          🎁 Personalized Gift Suggestor
        </p>

        {/* Provider Selector */}
        <section className="bg-white p-6 rounded-lg shadow-card">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Choose AI Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              {LLM_PROVIDERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* MBTI Section */}
        <section className="bg-white p-6 rounded-lg shadow-card">
          <form onSubmit={handleMbtiSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                MBTI-based Suggestions
              </label>
              <select
                value={mbti}
                onChange={(e) => setMbti(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select MBTI Type</option>
                {MBTI_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading.mbti}
              className="w-full bg-primary text-white p-2 rounded-lg hover:bg-primary-hover disabled:opacity-50"
            >
              {loading.mbti ? "Generating..." : "Get MBTI Suggestions"}
            </button>
          </form>

          {error.mbti && (
            <div className="mt-4 text-red-500 text-sm">Error: {error.mbti}</div>
          )}

          {mbtiSuggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">MBTI Gift Ideas</h3>
              <ul className="space-y-3">
                {mbtiSuggestions.map((suggestion, i) => (
                  <li key={i} className="p-3 bg-gray-50 rounded-lg">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Horoscope Section */}
        <section className="bg-white p-6 rounded-lg shadow-card">
          <form onSubmit={handleHoroscopeSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Horoscope-based Suggestions
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading.horoscope}
              className="w-full bg-accent text-white p-2 rounded-lg hover:bg-accent-hover disabled:opacity-50"
            >
              {loading.horoscope
                ? "Generating..."
                : "Get Horoscope Suggestions"}
            </button>
          </form>

          {error.horoscope && (
            <div className="mt-4 text-red-500 text-sm">
              Error: {error.horoscope}
            </div>
          )}

          {horoscopeSuggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">
                {zodiac} Zodiac Gift Ideas
              </h3>
              <ul className="space-y-3">
                {horoscopeSuggestions.map((suggestion, i) => (
                  <li key={i} className="p-3 bg-gray-50 rounded-lg">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
