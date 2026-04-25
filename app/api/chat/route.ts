import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { NextRequest } from "next/server";
import { TANMAY_CONTEXT } from "@/lib/agent-context";

const groqClient = createGroq({ apiKey: process.env.GROQ_API_KEY });

// In-memory rate limit: max 20 messages per IP per hour
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 3_600_000 });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return new Response("Rate limit exceeded. Try again later.", {
      status: 429,
    });
  }

  const { messages } = await req.json();

  const result = await streamText({
    model: groqClient("llama-3.3-70b-versatile"),
    system: TANMAY_CONTEXT,
    messages,
    temperature: 0.6,
    maxTokens: 500,
  });

  return result.toDataStreamResponse();
}
