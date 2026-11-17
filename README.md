# meto — Open Agentic Web Challenge

A dummy lighting shop plus meto Studio. An agent network runs **in the browser** from published JSON. The visitor brings their own LLM key. Every irreversible step names how to undo it. Human buttons and `website_*` tools call the same `App.page`.

- Repo: [github.com/RohitWaghire/meto-agentic-web](https://github.com/RohitWaghire/meto-agentic-web)
- Stage One (static): [rohitwaghire.github.io/meto-agentic-web](https://rohitwaghire.github.io/meto-agentic-web/)
- Judge demo (local Node + freight): `npm run freight` then `npm run dev` — shop `http://localhost:4321`, partner `http://127.0.0.1:8081`

Hackathon: [Open Agentic Web Challenge](https://cognizant-agenticweb.devpost.com/)  
Spec: [MVP Profile 0.2](https://github.com/cognizant-ai-labs/agentic-web/blob/main/docs/worldwide_agentic_web_mvp_spec.md)

GitHub Pages is the Stage One mirror (manifest, network JSON, runtime, assistant). MCP, register, and a true second origin need the Node host plus the freight static host in [`render.yaml`](render.yaml). Until those public HTTPS URLs exist, `allowed_peers` keeps `http://127.0.0.1:8081` so local `npm run freight` still works. Pages `username.github.io/meto` vs `username.github.io/freight` would be the **same origin**.

## Stage One files

- [`site/agent-manifest.json`](site/agent-manifest.json)
- [`site/meto_concierge.network.json`](site/meto_concierge.network.json) (built from the HOCON)
- [`site/runtime/`](site/runtime/) — vendored agentify-website runtime, unchanged
- Assistant + BYOK settings on [`site/index.html`](site/index.html)#assistant

## Run

Node 22+.

```bash
npm install
npm run agent:build
npm test
```

Two terminals for the freight partner:

```bash
npm run freight          # http://127.0.0.1:8081
npm run dev              # http://localhost:4321
```

Static-only (no MCP):

```bash
npm run serve:static     # http://127.0.0.1:8080
```

Paste an [Otari](https://otari.ai) key (or another OpenAI-compatible CORS-open router) under **AI model settings**. Default model: `alibaba/qwen3.8-flash`.

## Product surfaces

| Surface | What it is |
|---|---|
| Floor | Catalog, dummy-card checkout, seed chips into Ask meto, run timeline |
| Shop / product / cart | Filters, SVG marks, reviews, JSON-LD, line qty |
| Account | Order history, saved tender last4, link to permissions |
| Permissions | Mode, spend cap, allowed tools, freeze snapshot |
| Studio / pricing | Starter / Pro / Atelier, usage, invoices, key prefix, dummy webhook (no POST) |
| Docs | Spec walkthrough plus what the site cannot do |
| Freight | Second origin. Dummy windows only. No meto `website_*` tools |

## Demo accounts

| Person | Email | Password | Cap |
|---|---|---|---|
| Maya | maya@meto.example | demo1234 | $100, always_ask |
| Julian | julian@meto.example | studio1234 | $500 |
| Ada | ada@meto.example | admin1234 | admin |

Ask: “Add the Arc Sconce and place a pickup order for Test Visitor.” Confirm the dialog. Then **Undo last step** or **Undo run**.

Maya cannot buy the sconce: the cap refuses before a dialog. Card digits stay in the human form; the page persists `{brand, last4, tender:"demo"}`. Agents use that saved demo tender — never PAN/CVV in tool schemas.

## MCP

Token-less callers may only read. Spend tools need a bearer from register. `checkout_agent` returns HTTP 402 until `PAYMENT-SIGNATURE: demo-usdc`.

```bash
curl -X POST http://localhost:4321/api/v1/agents/register -H "content-type: application/json" -d "{\"agent_name\":\"procurement-bot-v2\"}"
curl -X POST http://localhost:4321/mcp -H "content-type: application/json" -d "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/list\"}"
```

## Judges

- [Spec checklist](docs/spec-checklist.md)
- [Permissioned site-actions pattern](docs/permissioned-actions.md)
- [Devpost draft](docs/DEVPOST.md)
- Screenshots in `docs/screenshots/`
- Two-minute narration: [docs/VIDEO.md](docs/VIDEO.md)

## Two public origins

[`render.yaml`](render.yaml) describes a Docker web service for the Astro Node app (shop + `/mcp`) and a static service for [`sites/meto-freight/`](sites/meto-freight/).

```bash
docker build -t meto .
docker run -p 4321:4321 -e HOST=0.0.0.0 meto
```

After a freight HTTPS URL exists, **add** it to `site/agent-manifest.json` `allowed_peers` and `site/links.json`, and keep `http://127.0.0.1:8081` for local `npm run freight`. Then `npm run agent:build`.

## License

MIT for meto. The browser runtime is Apache 2.0 (nsdeploy / Cognizant AI Lab).
