import Groq from "groq-sdk";
import { NextRequest } from "next/server";
import { TANMAY_CONTEXT } from "@/lib/agent-context";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// In-memory rate limit: 20 requests per IP per hour
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

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return new Response("Rate limit exceeded. Try again later.", { status: 429 });
  }

  if (!process.env.GROQ_API_KEY) {
    console.error("[api/chat] GROQ_API_KEY is not set");
    return new Response(
      "The AI assistant isn't configured yet — email shindetanmay282@gmail.com in the meantime.",
      { status: 503 }
    );
  }

  const { messages }: { messages: ChatMessage[] } = await req.json();

  let completion;
  try {
    completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: TANMAY_CONTEXT }, ...messages],
      stream: true,
      temperature: 0.6,
      max_tokens: 500,
    });
  } catch (err) {
    console.error("[api/chat] Groq request failed:", err);
    return new Response(
      "The AI assistant is temporarily unavailable. Please try again shortly.",
      { status: 502 }
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        console.error("[api/chat] Stream interrupted:", err);
        controller.enqueue(encoder.encode("\n\n(Response cut off — please try again.)"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
