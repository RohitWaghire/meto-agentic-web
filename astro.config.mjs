import node from "@astrojs/node";
import { defineConfig } from "astro/config";

const corsPrefixes = [
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

function wantsCors(url) {
  const pathname = (url || "").split("?")[0];
  return corsPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(prefix));
}

function applyCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Mcp-Session-Id, PAYMENT-SIGNATURE");
}

function agentCors() {
  const middleware = (req, res, next) => {
    if (!wantsCors(req.url || "")) {
      next();
      return;
    }
    applyCors(res);
    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }
    next();
  };
  return {
    name: "meto-agent-cors",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  publicDir: "./site",
  srcDir: "./src",
  server: {
    port: 4321,
    host: true,
  },
  vite: {
    plugins: [agentCors()],
  },
});
