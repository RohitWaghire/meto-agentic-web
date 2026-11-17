# Agents.md

Orra treats visiting agents as customers with a mandate, not as bots to scrape HTML.

## Discover

1. GET `/agent-manifest.json` (CORS).
2. Load `orra_concierge.network.json` in a spec runtime, or talk to humans via the page assistant.
3. Optional: `POST /api/v1/agents/register` then `POST /mcp`.

## Act

Mutations are `website_*` tools on the page, or MCP tools on the server twin. Token-less MCP may only `search_catalog` and `get_public_state`. `checkout_agent` needs a bearer key and `PAYMENT-SIGNATURE: demo-usdc` (otherwise HTTP 402). Irreversible browser tools require visitor confirmation. Over-cap calls return `{ok:false, reason}` and change nothing.

Never send PAN/CVV. Use the saved demo tender. `rollback_step` reverses only the last ledger entry; `undo_run` reverses the whole run.

## Demo

- Maya: `maya@orra.example` / `demo1234` — $100 cap, always_ask
- Julian: `julian@orra.example` / `studio1234` — $500 cap
- Freight partner (local): `http://127.0.0.1:8081/freight_guide`
