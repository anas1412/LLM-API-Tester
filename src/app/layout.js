import "./globals.css";

export const metadata = {
  title: "LLM API Tester",
  description: "Find the perfect birthday gift based on MBTI!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
