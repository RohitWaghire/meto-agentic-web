import { defineMiddleware } from "astro:middleware";

const corsPaths = [
  "/agent-manifest.json",
  "/meto_concierge.network.json",
  "/links.json",
  "/agent-mcp.json",
  "/llms.txt",
  "/agents.md",
  "/openapi.json",
  "/schema.jsonl",
  "/mcp",
  "/api/",
  "/.well-known/",
  "/bridge/",
];

function wantsCors(pathname: string) {
  return corsPaths.some((prefix) => pathname === prefix || pathname.startsWith(prefix));
}

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.request.method === "OPTIONS" && wantsCors(context.url.pathname)) {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Mcp-Session-Id, PAYMENT-SIGNATURE",
      },
    });
  }
  const response = await next();
  if (wantsCors(context.url.pathname)) {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Mcp-Session-Id, PAYMENT-SIGNATURE");
  }
  return response;
});
