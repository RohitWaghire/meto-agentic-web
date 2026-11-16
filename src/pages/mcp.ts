import type { APIRoute } from "astro";
import { handleMcp } from "../lib/mcp";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ jsonrpc: "2.0", error: { code: -32700, message: "Parse error" } }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const outcome = handleMcp(
    body,
    request.headers.get("authorization"),
    request.headers.get("payment-signature"),
  );
  return new Response(JSON.stringify(outcome.json), {
    status: outcome.status,
    headers: { "Content-Type": "application/json" },
  });
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ ok: true, protocol: "mcp", tools: ["search_catalog", "checkout_agent", "list_runs"] }), {
    headers: { "Content-Type": "application/json" },
  });
