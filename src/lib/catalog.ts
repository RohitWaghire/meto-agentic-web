export const CATALOG = [
  {
    id: "arc-sconce",
    name: "Arc Sconce",
    category: "lighting",
    priceCents: 17200,
    price: "$172.00",
    stock: 8,
    materials: "brass, mouth-blown glass",
    dimensions: "12 in × 6 in × 8 in",
  },
  {
    id: "mill-pendant",
    name: "Mill Pendant",
    category: "lighting",
    priceCents: 24000,
    price: "$240.00",
    stock: 5,
    materials: "oxidized copper, linen cord",
    dimensions: "16 in × 16 in × 14 in",
  },
  {
    id: "grove-floor",
    name: "Grove Floor Lamp",
    category: "lighting",
    priceCents: 41000,
    price: "$410.00",
    stock: 3,
    materials: "oak, brass, linen",
    dimensions: "18 in × 18 in × 62 in",
  },
  {
    id: "linen-throw",
    name: "Linen Throw",
    category: "textiles",
    priceCents: 8600,
    price: "$86.00",
    stock: 12,
    materials: "stone linen",
    dimensions: "50 in × 70 in",
  },
  {
    id: "kiln-bowl",
    name: "Kiln Bowl",
    category: "objects",
    priceCents: 5400,
    price: "$54.00",
    stock: 9,
    materials: "stoneware, copper glaze",
    dimensions: "6 in × 6 in × 3 in",
  },
  {
    id: "north-rug",
    name: "North Rug",
    category: "textiles",
    priceCents: 32000,
    price: "$320.00",
    stock: 4,
    materials: "wool",
    dimensions: "60 in × 96 in",
  },
] as const;

export const PLANS = [
  { id: "starter", name: "Starter", priceCents: 2900, price: "$29.00 / month", sceneCap: 12 },
  { id: "pro", name: "Pro", priceCents: 7900, price: "$79.00 / month", sceneCap: 80 },
  { id: "atelier", name: "Atelier", priceCents: 19000, price: "$190.00 / month", sceneCap: 400 },
] as const;

export const CANNOT_DO = [
  "live shipping quotes from a carrier",
  "real card charges or bank transfers",
  "coupon codes",
  "gift wrap",
  "order tracking after the demo refund",
  "call a live webhook",
  "issue a production API secret that talks to the internet",
  "change another visitor's cart",
  "bypass the spend cap or the allowed-tools list",
  "store a PAN or CVV on the page or in a tool argument",
];

export const MCP_SPEND_CAP_CENTS = 15000;

export type Tenant = {
  tenantId: string;
  agentName: string;
  apiKey: string;
  createdAt: string;
};

export type TwinOrder = {
  id: string;
  tenantId: string;
  productId: string;
  quantity: number;
  total: string;
  totalCents: number;
  tender: { brand: string; last4: string; tender: "demo" };
  createdAt: string;
};

export type TwinSubscription = {
  tenantId: string;
  planId: string;
  planName: string;
  price: string;
  totalCents: number;
  createdAt: string;
};

const tenants = new Map<string, Tenant>();
const orders: TwinOrder[] = [];
const subscriptions = new Map<string, TwinSubscription>();

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
    spend_cap: `$${(MCP_SPEND_CAP_CENTS / 100).toFixed(2)}`,
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
    item.name.toLowerCase().includes(q)
    || item.category.includes(q)
    || item.id.includes(q)
    || item.materials.toLowerCase().includes(q)
  );
}

export function publicCatalog() {
  return CATALOG.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    price: item.price,
    priceCents: item.priceCents,
    stock: item.stock,
    materials: item.materials,
    dimensions: item.dimensions,
  }));
}

export function placeTwinOrder(tenant: Tenant, productId: string, quantity: number): TwinOrder {
  const product = CATALOG.find((item) => item.id === productId);
  if (!product) {
    throw new Error("Unknown productId");
  }
  const qty = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
  const totalCents = product.priceCents * qty;
  const order: TwinOrder = {
    id: `mcp_${orders.length + 1}`,
    tenantId: tenant.tenantId,
    productId: product.id,
    quantity: qty,
    total: `$${(totalCents / 100).toFixed(2)}`,
    totalCents,
    tender: { brand: "Demo", last4: "4242", tender: "demo" },
    createdAt: new Date().toISOString(),
  };
  orders.unshift(order);
  return order;
}

export function placeTwinSubscription(tenant: Tenant, planId: string): TwinSubscription | { ok: false; reason: string } {
  const plan = PLANS.find((item) => item.id === planId);
  if (!plan) {
    return { ok: false, reason: "Unknown planId. Use starter, pro, or atelier." };
  }
  if (plan.priceCents > MCP_SPEND_CAP_CENTS) {
    return {
      ok: false,
      reason: `This ${plan.price} plan is over the dummy MCP spend cap of $${(MCP_SPEND_CAP_CENTS / 100).toFixed(2)}.`,
    };
  }
  const record: TwinSubscription = {
    tenantId: tenant.tenantId,
    planId: plan.id,
    planName: plan.name,
    price: plan.price,
    totalCents: plan.priceCents,
    createdAt: new Date().toISOString(),
  };
  subscriptions.set(tenant.tenantId, record);
  return record;
}

export function twinOrdersFor(tenantId: string) {
  return orders.filter((order) => order.tenantId === tenantId);
}

export function twinSubscriptionFor(tenantId: string) {
  return subscriptions.get(tenantId) || null;
}
