See the same note in the repository at docs/permissioned-actions.md.

A page object owns policy and receipts. Buttons and website_* tools call the same methods. Irreversible tools name their compensating action before they run. Human checkout, subscribe, mint, and undo reuse those dialogs. Undo walks the ledger in reverse; rollback_step reverses only the last entry.
