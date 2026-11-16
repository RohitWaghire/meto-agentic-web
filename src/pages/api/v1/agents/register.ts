import type { APIRoute } from "astro";
import { registerAgent } from "../../../../lib/catalog";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string> = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const created = registerAgent(body.agent_name, body.agent_type, body.callback_url);
  return new Response(JSON.stringify(created), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};
