# Orra — Open Agentic Web Challenge

A dummy lighting shop plus Orra Studio. An agent network runs **in the browser** from published JSON. The visitor brings their own LLM key. Every irreversible step names how to undo it.

Hackathon: [Open Agentic Web Challenge](https://cognizant-agenticweb.devpost.com/)  
Spec: [MVP Profile 0.2](https://github.com/cognizant-ai-labs/agentic-web/blob/main/docs/worldwide_agentic_web_mvp_spec.md)

## Stage One files

- [`site/agent-manifest.json`](site/agent-manifest.json)
- [`site/orra_concierge.network.json`](site/orra_concierge.network.json) (built from the HOCON)
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

## Demo accounts

| Person | Email | Password | Cap |
|---|---|---|---|
| Maya | maya@orra.example | demo1234 | $100, always_ask |
| Julian | julian@orra.example | studio1234 | $500 |
| Ada | ada@orra.example | admin1234 | admin |

Ask: “Add the Arc Sconce and place a pickup order for Test Visitor.” Confirm the dialog. Then **Undo run**.

Maya cannot buy the sconce: the cap refuses before a dialog.

## MCP

```bash
curl -X POST http://localhost:4321/api/v1/agents/register -H "content-type: application/json" -d "{\"agent_name\":\"procurement-bot-v2\"}"
curl -X POST http://localhost:4321/mcp -H "content-type: application/json" -d "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/list\"}"
```

`checkout_agent` returns HTTP 402 until `PAYMENT-SIGNATURE: demo-usdc`.

## Judges

- [Spec checklist](docs/spec-checklist.md)
- [Permissioned site-actions pattern](docs/permissioned-actions.md)
- [Devpost draft](docs/DEVPOST.md)
- Screenshots in `docs/screenshots/`
- Two-minute narration: [docs/VIDEO.md](docs/VIDEO.md)

## Public host

Stage One files live in `site/` (manifest, network JSON, runtime, assistant). GitHub Pages deploys that folder from `main`. The MCP facade and agent register API need the Node host:

```bash
docker build -t orra .
docker run -p 4321:4321 orra
```

Set `HOST=0.0.0.0`. After a public URL exists, replace `http://127.0.0.1:8081` in `site/agent-manifest.json` `allowed_peers` and `site/links.json` with the freight origin.

## License

MIT for Orra. The browser runtime is Apache 2.0 (nsdeploy / Cognizant AI Lab).

## Video

See [docs/VIDEO.md](docs/VIDEO.md) for the two-minute narration script.
