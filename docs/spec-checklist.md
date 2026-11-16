# Spec interoperability checklist (MVP Profile 0.2)

Local: `npm run freight` then `npm run dev`. Public files are in `site/`.

| Check | How |
|---|---|
| Two-or-more-agent HOCON + manifest on the origin | `site/orra_concierge.hocon` → `orra_concierge.network.json`; `site/agent-manifest.json` |
| Network runs in the visitor browser | Vendored `site/runtime/` from agentify-website, unchanged |
| Default Otari path | Manifest `llm_router.base_url` is `https://api.otari.ai/api/v1`, model `alibaba/qwen3.8-flash` |
| BYOK | Runtime **AI model settings** on the floor |
| Internal specialist + grounded read | `catalog_specialist` / `studio_specialist`; facts from `website_get_store_state` |
| Site write | `website_add_to_cart` / `website_set_cart` |
| Irreversible confirm with rollback sentence | `site.js` DIALOGS; details include Rollback |
| Cap below price | `{ok:false}` from `App.page`, no dialog (`npm test`) |
| Decline confirm | No charge (`npm test`) |
| Undo run | Compensating refund; timeline `rolled_back` |
| Peer from a second origin after consent | `allowed_peers` includes `http://127.0.0.1:8081`; `peer_policy.mode` is `closed` |
| Visitor key not sent to freight | Runtime BYOK; freight has no Orra `website_*` tools |
| Fail closed | Invalid network / denied origin surface in the execution log |
| CORS on public agent files | `src/middleware.ts` |
| Same-origin MCP facade | `POST /mcp`; `deployment.public_mcp_facade: true` |
| Manual shop with assistant disabled | Floor buttons share `App.page` |
| Shop still works if assistant fails to boot | Status copy on `#assistant-status` |

Run `npm test` (Node 22) for the skill’s scripted-model suite.
