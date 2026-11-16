# Agents.md

Orra treats visiting agents as customers with a mandate, not as bots to scrape HTML.

## Discover

1. GET `/agent-manifest.json` (CORS).
2. Load `orra_concierge.network.json` in a spec runtime, or talk to humans via the page assistant.
3. Optional: `POST /api/v1/agents/register` then `POST /mcp`.

## Act

Mutations are `website_*` tools on the page, or MCP tools with the same names on the server. Irreversible tools require visitor confirmation in the browser runtime. Over-cap calls return `{ok:false, reason}` and change nothing.

Never send PAN/CVV. Use the saved demo tender.

## Demo

- Maya: `maya@orra.example` / `demo1234` — $100 cap, always_ask
- Julian: `julian@orra.example` / `studio1234` — $500 cap
- Freight partner: `http://127.0.0.1:8081/freight_guide`
