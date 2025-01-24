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
  { id: "anthropic", name: "Anthropic Claude 3.5" },
];

export default function Home() {
  const [mbti, setMbti] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [mbtiSuggestions, setMbtiSuggestions] = useState([]);
  const [horoscopeSuggestions, setHoroscopeSuggestions] = useState([]);
  const [zodiac, setZodiac] = useState("");
  const [loading, setLoading] = useState({ mbti: false, horoscope: false });
  const [provider, setProvider] = useState("gemini");
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-rose-600 drop-shadow-lg">
            LLM API Tester
          </h1>
          <p className="text-xl text-rose-500 font-medium">
            🎁 Personalized Gift Suggestor
          </p>
        </header>

        <section className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-gentle border border-rose-100">
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-2 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-rose-400" />
              Choose Your AI Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full p-3 border-2 border-rose-200 rounded-xl bg-white focus:ring-2 focus:ring-rose-300 focus:border-rose-300 text-rose-700 transition-all appearance-none"
            >
              {LLM_PROVIDERS.map((p) => (
                <option key={p.id} value={p.id} className="text-rose-700">
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-gentle border border-rose-100">
          <form onSubmit={handleMbtiSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-rose-700 mb-2 flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-rose-400" />
                MBTI-based Suggestions
              </label>
              <select
                value={mbti}
                onChange={(e) => setMbti(e.target.value)}
                className="w-full p-3 border-2 border-rose-200 rounded-xl bg-white focus:ring-2 focus:ring-rose-300 text-rose-700 appearance-none"
                required
              >
                <option value="">Select MBTI Type</option>
                {MBTI_TYPES.map((type) => (
                  <option key={type} value={type} className="text-rose-700">
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading.mbti}
              className="w-full bg-gradient-to-r from-rose-400 to-pink-400 text-white p-3 rounded-xl font-medium shadow-lg hover:shadow-xl disabled:opacity-50 transition-all"
            >
              {loading.mbti ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  Generating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <MagicWandIcon className="w-5 h-5" />
                  Get MBTI Suggestions
                </span>
              )}
            </button>
          </form>

          {error.mbti && (
            <div className="mt-4 text-rose-600 text-sm flex items-center gap-2">
              <ExclamationIcon className="w-5 h-5" />
              {error.mbti}
            </div>
          )}

          {mbtiSuggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-rose-700">
                MBTI Gift Ideas
              </h3>
              <ul className="space-y-3">
                {mbtiSuggestions.map((suggestion, i) => (
                  <li
                    key={i}
                    className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-rose-700"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-gentle border border-rose-100">
          <form onSubmit={handleHoroscopeSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-rose-700 mb-2 flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-rose-400" />
                Horoscope-based Suggestions
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-3 border-2 border-rose-200 rounded-xl bg-white focus:ring-2 focus:ring-rose-300 text-rose-700"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading.horoscope}
              className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white p-3 rounded-xl font-medium shadow-lg hover:shadow-xl disabled:opacity-50 transition-all"
            >
              {loading.horoscope ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  Generating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <MoonIcon className="w-5 h-5" />
                  Get Horoscope Suggestions
                </span>
              )}
            </button>
          </form>

          {error.horoscope && (
            <div className="mt-4 text-rose-600 text-sm flex items-center gap-2">
              <ExclamationIcon className="w-5 h-5" />
              {error.horoscope}
            </div>
          )}

          {horoscopeSuggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-rose-700">
                {zodiac} Zodiac Gift Ideas
              </h3>
              <ul className="space-y-3">
                {horoscopeSuggestions.map((suggestion, i) => (
                  <li
                    key={i}
                    className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-rose-700"
                  >
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

const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
  </svg>
);

const MagicWandIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7.5 5.6L5 7l1.4-2.5L5 2l2.5 1.4L10 2 8.6 4.5 10 7 7.5 5.6zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14l-2.5 1.4zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5L22 2zM9 22l-3-5 3 5zm3-9l-5-3 5 3z" />
  </svg>
);

const ExclamationIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      fill="none"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);
