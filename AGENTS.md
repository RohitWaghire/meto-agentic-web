# AGENTS.md

This is the meto Open Agentic Web Challenge site.

## Layout

- `site/` — public storefront and spec files (`agent-manifest.json`, runtime, actions)
- `sites/meto-freight/` — second-origin partner (serve on 127.0.0.1:8081)
- `vendor/agentify-website/` — official skill; do not edit `runtime/`
- `src/` — Astro Node MCP facade and register API

## Commands

```
npm install
npm run agent:build
npm test
npm run freight   # terminal 1
npm run dev       # terminal 2, http://localhost:4321
```

Do not modify `site/runtime`. Change `site/meto_concierge.hocon` and rebuild. Do not put secrets in published JSON.
