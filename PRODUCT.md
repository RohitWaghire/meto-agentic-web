# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Astro 5 with the Node adapter for the MCP facade and dummy APIs; the visitor-facing storefront is a static HTML/CSS/JS site in `site/` so it matches the Open Agentic Web agentify-website layout (stable module URLs, no hashed bundles).

## Users

- A shopper who wants an on-page agent to finish a lighting or home-objects purchase without giving the model card numbers.
- A Studio subscriber who wants an agent to start a plan or mint an API key inside a spend cap they set.
- An external agent (MCP / peer site) acting for that person under a one-time policy.
- Hackathon judges verifying Open Agentic Web spec files in a browser.

## Product Purpose

meto is a dummy contemporary lighting shop plus meto Studio (a dummy lighting-control SaaS). Its job is to let a visitor-owned browser agent complete a real site task end-to-end inside explicit permission constraints, with every step, approval, and rollback path visible.

Success: a judge can paste a BYOK key, set a cap, ask the assistant to buy the Arc Sconce, see the confirmation name the rollback, approve, watch the cart and order update, then undo the run.

## Positioning

The agent is not a chat bolted onto a menu. The same `App.page` functions drive the human UI and the `website_*` tools. Policy lives in those functions, not in the model. Irreversible work always shows a compensating action before it runs.

## Capabilities

- Browse a dummy catalog, cart, checkout, orders, Studio plans and API keys.
- Configure spend caps and allowed tools once.
- Run a Neuro SAN agent network in the browser (official agentify-website runtime, BYOK / Otari).
- Confirm irreversible actions; undo a run via compensating receipts.
- Register an external agent tenant; settle dummy ACP/x402-shaped payments on the server MCP facade.
- Load a second-origin freight partner network after consent.

## Constraints

- No real Stripe, crypto, email, or publisher-paid LLM.
- Card PANs never appear in tool schemas.
- Vendored `runtime/` is not modified.
- Dummy catalog, users, and tenders only. Seeded accounts are illustrative.

## Terminology

- **Constraint / mandate:** the visitor's one-time policy (tools, cap, ask mode).
- **Receipt:** the structured result of a site action, including a compensating rollback.
- **Run:** the ledger of mutating steps that Undo walk in reverse.
- **Site action:** a local `website_*` tool registered with the browser runtime.

## Voice

Precise, physical, unhurried. Name the object and the limit. No hype, no “AI-powered.”
