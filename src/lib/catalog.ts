export const CATALOG = [
  { id: "arc-sconce", name: "Arc Sconce", category: "lighting", priceCents: 17200, price: "$172.00", stock: 8 },
  { id: "mill-pendant", name: "Mill Pendant", category: "lighting", priceCents: 24000, price: "$240.00", stock: 5 },
  { id: "grove-floor", name: "Grove Floor Lamp", category: "lighting", priceCents: 41000, price: "$410.00", stock: 3 },
  { id: "linen-throw", name: "Linen Throw", category: "textiles", priceCents: 8600, price: "$86.00", stock: 12 },
  { id: "kiln-bowl", name: "Kiln Bowl", category: "objects", priceCents: 5400, price: "$54.00", stock: 9 },
  { id: "north-rug", name: "North Rug", category: "textiles", priceCents: 32000, price: "$320.00", stock: 4 },
] as const;

export type Tenant = {
  tenantId: string;
  agentName: string;
  apiKey: string;
  createdAt: string;
};

const tenants = new Map<string, Tenant>();

export function registerAgent(agentName: string, agentType: string, callbackUrl: string) {
  const tenantId = `tnt_${tenants.size + 1}`;
  const apiKey = `orra_live_${Math.random().toString(36).slice(2, 14)}`;
  const tenant: Tenant = {
    tenantId,
    agentName: agentName || "unnamed-agent",
    apiKey,
    createdAt: new Date().toISOString(),
  };
  tenants.set(apiKey, tenant);
  return {
    tenant_id: tenantId,
    api_key: apiKey,
    tier: "free",
    quotas: { requests: 10000, payments: 100 },
    agent_type: agentType || "mcp",
    callback_url: callbackUrl || null,
  };
}

export function tenantFromAuth(header: string | null) {
  if (!header) {
    return null;
  }
  const token = header.replace(/^Bearer\s+/i, "");
  return tenants.get(token) || (token === "orra_live_demo"
    ? { tenantId: "tnt_demo", agentName: "procurement-bot-v2", apiKey: token, createdAt: "2026-11-16" }
    : null);
}

export function searchCatalog(query: string) {
  const q = query.toLowerCase();
  return CATALOG.filter((item) =>
    item.name.toLowerCase().includes(q) || item.category.includes(q) || item.id.includes(q)
  );
}
