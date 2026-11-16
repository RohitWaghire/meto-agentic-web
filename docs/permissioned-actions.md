# Permissioned site actions

A pattern other agentic websites can copy.

1. One page object owns catalog, cart, policy, and receipts. Buttons and `website_*` tools call the same methods.
2. Refuse with `{ok:false, reason}` before any mutation. Throws become `unknown` and must not be retried.
3. Mark spend, subscribe, mint-key, and undo as `irreversible`. The dialog lists items, total, and the compensating action.
4. Store a ledger of `{tool, args, rollback}`. Undo walks it in reverse.
5. Put spend caps in the page object, not in the model instructions.

Orra implements this in `site/app.js` and `site/site-actions.js`.
